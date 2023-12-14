import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import diglett from '../images/diglett.png';
import charmander from '../images/charmander.png';
import squirtle from '../images/squirtle.png';
import bulbasaur from '../images/bulbasaur.png';
import ditto from '../images/ditto.png'
import Menubar from '../components/menubar';
import {useNavigate} from "react-router-dom";



function MainPage() {

  const navigate = useNavigate();

  function handleSignInClick() {
    // console.log("got into signinclick");
    navigate("/signIn");
  }

  function handlePokemartClick(){
    navigate("/pokemart");
  }

  function handleYourCollectionClick(){
    navigate("/yourCollection");
  }

  function handleEarnCoinsClick(){
    navigate("/earnCoins");
  }

  return (
    <>
      <Carousel>
      <Carousel.Item>
          <img src={ditto} alt="Diglett Pokemon" className='carousel-img'/>
          <Carousel.Caption>
            <h3>Sign In</h3>
            <p>Have you signed in yet?</p>
            <Button onClick={()=>handleSignInClick()}>Go to Sign In</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={bulbasaur} alt="Bulbasaur Pokemon" className='carousel-img'/>
          <Carousel.Caption>
            <h3>Purchase a Pokemon</h3>
            <p>Visit the Pokemart to buy a new Pokemon today!</p>
            <Button onClick={()=>handlePokemartClick()}>Visit the Pokemart</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={charmander} alt="Charmander Pokemon" className='carousel-img' />
          <Carousel.Caption>
            <h3>View Your Collection</h3>
            <p>View the Pokemon you bought and watch them play!</p>
            <Button onClick={()=>handleYourCollectionClick()}>View Your Pokemon</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img src={squirtle} alt="Squirtle Pokemon" className='carousel-img' />
          <Carousel.Caption>
            <h3>Want to earn some coins?</h3>
            <p>Click on the big coin to earn yourself coins</p>
            <Button onClick={()=>handleEarnCoinsClick()}>Earn coins!</Button>
          </Carousel.Caption>
        </Carousel.Item>


      </Carousel>
    </>
  );
} export default MainPage;