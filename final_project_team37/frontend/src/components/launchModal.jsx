import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState} from 'react';


function PokemonShopInfoModal(props) {
  var pokemon = props.pokemon;
  // const ids = props.collectionIds;
  // var [inCollection, setInCollection] = useState(true);

  // for(let i=0;i<ids.length;i++){
  //   console.log("got into this for loop");
  //   if(ids[i] === pokemon.id){
  //     setInCollection(true);
  //   }
  // }




  if (!pokemon) { //You should never see this but anyways
    return (
      <Modal {...props} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Pokemon Information Unavailable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>No Pokemon details available.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } 

  return ( //TODO Make this nicer. Add Image etc.
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ID: {pokemon.id} {pokemon.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Would you like to sell this pokemon for {pokemon.cost/2} coins?</h4> */}
        <p>
          Would you like to sell {pokemon.name} for {pokemon.cost/2} coins?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.sellPokemon}>Confirm</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
} export default PokemonShopInfoModal;



