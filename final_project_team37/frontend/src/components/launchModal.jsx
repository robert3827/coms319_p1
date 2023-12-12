import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PokemonShopInfoModal(props) {
  
  var pokemon = props.pokemon;

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
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
} export default PokemonShopInfoModal;



