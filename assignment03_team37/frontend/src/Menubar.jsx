import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { Outlet, Link, NavLink } from "react-router-dom";





function Menubar() {  


  return (
    
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">View Products</NavLink>
            <NavLink to="/form">Edit</NavLink>
            <NavLink to="/form">Create New</NavLink>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
} export default Menubar;