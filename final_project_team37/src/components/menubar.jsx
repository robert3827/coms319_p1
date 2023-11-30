import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import pokeball from '../images/pokeball.png'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import {useState, useEffect} from 'react';





function Menubar() {
  
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
            <li><Link to="/" className="nav-link active">Home</Link></li>
            <li><Link to= "/pokemart" className="nav-link ">Pokemart</Link></li>
            <li><Link to="/yourCollection" className="nav-link">Your Collection</Link></li>
            <li><Link to="/credits" className="nav-link">Credits</Link></li>
          </ul>

          <div className="col-md-3 text-end">

          </div>
        </header>
      </div>

    </>
  );
} export default Menubar;