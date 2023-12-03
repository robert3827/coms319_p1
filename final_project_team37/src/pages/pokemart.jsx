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
  const [pokemon, setPokemon] = useState([]);

  function getAllProducts() {
    fetch("http://localhost:8081/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products: ");
        console.log(data);
        setPokemon(data);
      });
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

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={diglett} />
          <Card.Body>
            <Card.Title>Pokemon Name</Card.Title>
            <Card.Text>
              Type(s):
              <img src={grassType} alt="grass icon" className='icon grass'></img>
              <img src={poisonType} alt="poison icon" className='icon poison'></img>
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
        </Card>

      </Container>
    </>

  );
} export default Pokemart;