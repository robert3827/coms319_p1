import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { Outlet, Link, NavLink } from "react-router-dom";





function Menubar(props) {  


  return (
    
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link " to="/" onClick={() => {props.getAllProducts()}}>View Products</NavLink>
            <NavLink className="nav-link " to="/form" onClick={() => {props.setDefaultProduct()}}>Add Product</NavLink>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
} export default Menubar;