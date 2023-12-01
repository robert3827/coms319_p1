import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import diglett from '../images/diglett.png';
import charmander from '../images/charmander.png';
import squirtle from '../images/squirtle.png';
import bulbasaur from '../images/bulbasaur.png';
import Menubar from '../components/menubar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function MainPage() {

  function handleClick() {

  }

  return (
    <>
      <Menubar />
      <Carousel>
        <Carousel.Item>
          <img src={bulbasaur} alt="Bulbasaur Pokemon" height={400} width={400} />
          <Carousel.Caption>
            <h3>Purchase a Pokemon</h3>
            <p>Visit the Pokemart to buy a new Pokemon today!</p>
            <Button>Visit the Pokemart</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={charmander} alt="Charmander Pokemon" height={400} width={400} />
          <Carousel.Caption>
            <h3>View Your Collection</h3>
            <p>View the Pokemon you bought and watch them play!</p>
            <Button>View Your Pokemon</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={squirtle} alt="Squirtle Pokemon" height={400} width={400} />
          <Carousel.Caption>
            <h3>Purchase a Pokemon</h3>
            <p>Visit the Pokemart to buy a new Pokemon today!</p>
            <Button>Visit the Pokemart</Button>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </>
  );
} export default MainPage;