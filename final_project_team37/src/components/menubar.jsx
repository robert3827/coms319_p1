import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import pokeball from '../images/pokeball.png';
import pokeCoin from '../images/pokeCoin.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link, NavLink } from "react-router-dom";
import {useState, useEffect} from 'react';





function Menubar() {

  var coinsCount = 69;
  
  var [pageState, setPageState] = useState({
    home: true,
    pokemart: false,
    yourCollection: false,
    credits: false,
  });


  return (
    
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
              <img src={pokeball} alt="go to home" height="50px" width="50px" className="logo" />

            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav nav-pills">
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to= "/pokemart" className="nav-link ">Pokemart</NavLink></li>
            <li><NavLink to="/yourCollection" className="nav-link">Your Collection</NavLink></li>
            <li><NavLink to="/earnCoins" className="nav-link">Earn Coins</NavLink></li>
            <li><NavLink to="/credits" className="nav-link">Credits</NavLink></li>
            <li><NavLink to="/signIn" className="nav-link">Sign In</NavLink></li>
          </ul>

          <div className="col-md-3 text-end ">
          <h2> <img src={pokeCoin} height={50} width={50}/> {coinsCount} </h2>
          </div>
        </header>
      </div>

    </>
  );
} export default Menubar;