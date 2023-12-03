import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import diglett from '../images/diglett.png';
import charmander from '../images/charmander.png';
import squirtle from '../images/squirtle.png';
import bulbasaur from '../images/bulbasaur.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Menubar from '../components/menubar';
import PokemonShopInfoModal from '../components/launchModal';
import pokeData from '../data/pokemon.json';
import grassType from '../typeIcons/grass.svg';
import poisonType from '../typeIcons/poison.svg';
import Spinner from 'react-bootstrap/Spinner';

import '../Types.css';



const numPokemon = 10;
const shinyProb = 100;
const xBound = 1500;
const yBound = 750;

var collectionSize;

var pokemonList = []; //List of Pokemon Json Objects
var htmlCard = [];
var ownedPokemon = [];

let timerIds = [];


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



function Pokemart() {

  /**
   * Modal Control
   * I'll probably need to change this to show a unique modal for each pokemon "card"
   */
  const [modalShow, setModalShow] = useState(false);
  var [pokemon, setPokemon] = useState([]);
  const [APILoaded, setAPILoaded] = useState(false);


  function getAllPokemon() {
    fetch("http://localhost:8081/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ")
        console.log(data);
        setPokemon(data);
        setAPILoaded(true);
      });
  }

  /**
   * When Pokemon Changes I want to render this.
   */
  useEffect(() => {
    console.log("In useEffect: Pokemon");
  }, [pokemon]);



  /**
   * On Every page reload
   */
  useEffect(() => {
    console.log("Page Reload:");
    getAllPokemon();
  }, []);

  const bob = () => {
        return (
          < Card style = {{ width: '18rem' }}>
              <Card.Img variant="top" src={pokemon[0].img} />
              <Card.Body>
                <Card.Title>#{pokemon[0].id}: {pokemon[0].name}</Card.Title>
                <Card.Text>
                  Type(s): {pokemon[0].type1}, {pokemon[0].type2 != null && pokemon[0].type2}
                  {/* <img src={grassType} alt="grass icon" className='icon grass'></img>
                  <img src={poisonType} alt="poison icon" className='icon poison'></img> */}
                  <br />

                </Card.Text>
                <Button variant="info" onClick={() => setModalShow(true)} className='mr-1'>
                  Learn More
                </Button>
                <Button variant="primary" className='ml-1'>Buy Pokemon</Button>
                <PokemonShopInfoModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Card.Body>
            </Card >
        ) 
  }
  




  return (
    <>
      <Menubar />
      <Container id='pokemartContainer'>

        <Form >
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col >
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>

        <hr color='white'></hr>
        {APILoaded && 
              <Card style = {{ width: '18rem' }}>
              <Card.Img variant="top" src={pokemon[0].img} />
              <Card.Body>
                <Card.Title>#{pokemon[0].id}: {pokemon[0].name}</Card.Title>
                <Card.Text>
                  Type(s): {pokemon[0].type1}, {pokemon[0].type2 != null && pokemon[0].type2}
                  {/* <img src={grassType} alt="grass icon" className='icon grass'></img>
                  <img src={poisonType} alt="poison icon" className='icon poison'></img> */}
                  <br />

                </Card.Text>
                <Button variant="info" onClick={() => setModalShow(true)} className='mr-1'>
                  Learn More
                </Button>
                <Button variant="primary" className='ml-1'>Buy Pokemon</Button>
                <PokemonShopInfoModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Card.Body>
            </Card >}
      
      
        
        
        


      </Container>
    </>

  );
} export default Pokemart;