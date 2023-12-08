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
import Menubar from '../components/menubar';
import PokemonShopInfoModal from '../components/launchModal';
import pokeData from '../data/pokemon.json';
import grassType from '../typeIcons/grass.svg';
import poisonType from '../typeIcons/poison.svg';
import Spinner from 'react-bootstrap/Spinner';


import '../Types.css';

// import { useFetch } from './useFetch'
const url = `http://localhost:8081/pokemon/`

function Pokemart() {

  const [modalShow, setModalShow] = useState(false);
  var [pokemon, setPokemon] = useState([]);
  const [APILoaded, setAPILoaded] = useState(false);
  var [pokemonCards, setPokemonCards] = useState([]);

  // const { data, error } = useFetch(url);

  console.log("got here!");
  // if (error) {
  //   console.log( "<p>There is an error.</p>" );
  // }
  // if (!data) {
  //    console.log("<p>Loading...</p>")
  // }
  // else { 
  //   console.log("<p>{data[0].title}</p>")
  // }


  /**
   * Modal Control
   * I'll probably need to change this to show a unique modal for each pokemon "card"
   */



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

  function generatePokemonCards()  {
    
   setPokemonCards( ...pokemonCards, 
        < Card style={{ width: '18rem' }}>
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
        <Container > 
            <Card style={{ width: '18rem' }}>
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
        </Container>
          }
          {APILoaded && pokemonCards}







      </Container>
    </>

  );
} export default Pokemart;