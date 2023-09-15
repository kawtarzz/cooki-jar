import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Icon from './img/logo-icon.svg'

function nav() {
  const localcookiJarUser = localStorage.getItem("cookijar_user");
  const cookijarUserObject = JSON.parse(localcookiJarUser)

  return (
    <Navbar bg="primary" className="m-auto" data-bs-theme="dark" expand="lg">
      <Navbar.Brand href="/home">
        <img
          alt=""
          src={Icon}
          width="160"
          height="160"
          className="d-inline-block align-center"
        />{' '} CookiJar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/tasks">To-do</Nav.Link>
          <Nav.Link href="/create"> + New Task </Nav.Link>
          <NavDropdown title={`${cookijarUserObject.name}'s Jar`} id="basic-nav-dropdown">
            <NavDropdown.Item href="/createreward">
              + New Reward
            </NavDropdown.Item>
            <NavDropdown.Item href="/rewards">
              Cash-In
            </NavDropdown.Item>
            <NavDropdown.Item href="/rewards">
              Rewards List
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={`/users/${cookijarUserObject.id}`}>
              My Account
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/logout" onClick={() => {
            localStorage.removeItem("cookijar_user")
          }}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default nav;