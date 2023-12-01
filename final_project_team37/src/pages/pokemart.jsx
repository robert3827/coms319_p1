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
import pokeData from '../data/pokemon.json'



const numPokemon = 10;
const shinyProb = 100;
const xBound = 1500;
const yBound = 750;

var collectionSize;

var pokemonList = []; //List of Pokemon Json Objects
var htmlCard = [];
var ownedPokemon = [];

let timerIds = [];


function getDataFromJson(i) {
  let pokemonName = pokemonList[i].name;
  let pokemonId = pokemonList[i].id;
  let pokemonImg = pokemonList[i].img;
  let pokemonType1 = pokemonList[i].type1;
  let pokemonType2 = null;
  if (pokemonList[i].type2 != null) {
    pokemonType2 = pokemonList[i].type2;

  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function Pokemart() {
  
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    console.log("PokemonList: " + pokemonList);
  }, [pokemonList]);

  var [pokemonList, setPokemonList] = useState([]);

  function makePokemonArray() {
    console.log("Make Pokemon Array");
    for (let i = 1; i <= numPokemon; i++) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0" + i)
        .then((res) => res.json())
        .then((json) => {
          console.log("JSON: " + json.name);
          // setPokemonList(
          //   [...pokemonList, json]
          // );
        });
    }
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
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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