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

  function getManyPokemon() {
    for(let i=0;i<10;i++) {
      console.log("getManyPokemon " + i);
      // logMovies(i);
    }
  }

  //This one works. 
  async function logMovies(i) {
    console.log("Fetch Data "+ i);
    const response = await fetch("http://localhost:8081/pokemon/" + i);
    const movies = await response.json();
    console.log(movies);
  }
  logMovies().then(

  )

//   function importAll(r) {
//     let images = {};
//     r.keys().map(item => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('./images', false, '/\.png/'));

// <img src={images['0.png']} />
  
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   console.log("PokemonList: " + pokemonList);
  // }, [pokemonList]);

  // var [pokemonList, setPokemonList] = useState([]);

  //This one doesn't work
  function makePokemonArray() {
    console.log("Make Pokemon Array");
    for (let i = 1; i <= numPokemon; i++) {
      fetch("http://localhost:8081/pokemon/1" + i)
        .then((res) => res.json())
        .then((json) => {
          console.log("JSON: " + json.name);
          // setPokemonList(
          //   [...pokemonList, json]
          // );
        });
    }
  }
  // var bulbStats = {
  //   pokemonName: pokemonList[0].name,
  //   pokemonId: pokemonList[0].id,
  //   pokemonImg: pokemonList[0].img,
  //   pokemonType1: pokemonList[0].type1,
  //   pokemonType2: null,
  // }

  // if (pokemonList[0].type2 != null) {
  //   bulbStats.pokemonType2 = pokemonList[0].type2;
  // }


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
                <img src={poisonType} alt="poison icon"className='icon poison'></img>
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