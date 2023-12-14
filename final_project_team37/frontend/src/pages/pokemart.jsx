import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import pokeCoin from '../images/pokeCoin.png';
import Form from 'react-bootstrap/Form';
import Menubar from '../components/menubar';
import PokemonShopInfoModal from '../components/launchModal';
// import pokeData from '../data/pokemon.json';
import grassType from '../typeIcons/grass.svg';
import poisonType from '../typeIcons/poison.svg';
import Spinner from 'react-bootstrap/Spinner';
import { retrieveUsername, retrieveCoins, changeUsername, changeCoins } from "../components/userInfo"
import '../stylesheets/Types.css';
import '../stylesheets/Cards.css'

const url = `http://localhost:8081/`

function Pokemart(props) {

  var [allPokemon, setAllPokemon] = useState([]); //Array holding all the pokemon to be generated
  const [modalShow, setModalShow] = useState(null);
  const [numCoins, setNumCoins] = useState(props.numCoins);
  var [collectionIds, setCollectionIds] = useState([]);
  

  function subtractCoins(coinsToSub) {
      setNumCoins(numCoins-coinsToSub);
      props.setNumCoins(numCoins-coinsToSub);
      // console.log("earnCoins: " + numCoins);
      console.log("number of coins that should now be in the db ",numCoins-coinsToSub);
      updateCoins(numCoins-coinsToSub);
  }

  function addCoins(coinsToAdd){
    setNumCoins(numCoins+coinsToAdd);
    props.setNumCoins(numCoins+coinsToAdd);
  }

  function updateCoins(coinsToUpdate){
    fetch(url+'updateCoins/' + props.userName, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"coins": coinsToUpdate})
    })

  }


  useEffect(() => { //Called on first render
    loadPokemart();
    getCollection();
}, []);


  function loadPokemart() {
    fetch(url + 'pokemon/')
      .then((response) => response.json())
      .then((data) => {
        setAllPokemon(data);
      });
  }


  function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function buyPokemon(pokemon) {

    //Maybe do something noticable here to let the user know to sign in.
    if (props.userName === null || props.userName === "") {
      console.log("not signed in");
      return;
    }
    //Maybe do something here to let the user know thwy dont have enough coins.
    if((numCoins-pokemon.cost)<0){
      console.log("insufficient number of coins");
      return;
    }
    //Get pokemon info here.

    fetch(url + 'addPokemon/' + props.userName, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(pokemon)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

    subtractCoins(pokemon.cost);
  }

  function removePokemon(pokemon){
    const id = pokemon.id;
    const coinsToAdd = pokemon.cost/2;
    console.log(coinsToAdd);
    fetch(url + 'removePokemon/' + props.userName, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"id":id, "coins": coinsToAdd})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

    setModalShow(null)
    addCoins(coinsToAdd);
  }

  function getCollection(){
    var ids =[];
    fetch(url+"users/"+props.userName)
        .then((response) => response.json())
        .then((data) => {
          for(let i=0;i<data.collection.length;i++){
            ids.concat(data.collection[i].id);
          }
        });

    setCollectionIds(ids);
  }

  function generatePokemonCards() {

    return (

      allPokemon.map((pokemon) => (
        <Col key={pokemon.id}>
          < Card style={{ width: '18rem' }}  className="h-100 card">
            {/* <Card.Header>Cost: {pokemon.cost}</Card.Header> */}
            <Card.Img variant="top" src={pokemon.img} style={{ height: '200px', objectFit: 'contain' }}/>
            <Card.Body>
              <div className='pokemonId'>#{pokemon.id}:</div>
              <Card.Title> {capitalize(pokemon.name)}</Card.Title>
              <Card.Text>
                <div className={pokemon.type1 + ' typeCommon'}>{capitalize(pokemon.type1)} </div> <div className={pokemon.type2 + ' typeCommon'}>{pokemon.type2 ? capitalize(pokemon.type2) : ''}</div>
                
                <br />

              </Card.Text>
              <Button variant="primary" onClick={() => {setModalShow(pokemon) }} className='mr-2'>
                Sell Pokemon
              </Button>
              <Button variant="info" className='ml-4' onClick={()=>buyPokemon(pokemon)}>Buy Pokemon</Button>
              
            </Card.Body>
            <Card.Footer><img src={pokeCoin} width="20" height="20"></img>{pokemon.cost}</Card.Footer>
          </Card >
        </Col>
      ))


    )
  }





  return (
    <>
      <Container id='pokemartContainer'>
        <Row className="g-4">
          {generatePokemonCards()}
        </Row>
      </Container>
      <PokemonShopInfoModal
            pokemon={modalShow} //Value for props.pokemon
            show={modalShow !== null} //argument passed in through onClickMethod for Modals
            onHide={() => setModalShow(null)} //When the modal sees null it will hide itself
            sellPokemon={()=> removePokemon(modalShow)} //lets modal have access to sell
            // collectionIds={collectionIds}
      />
    </>

  );
} export default Pokemart;