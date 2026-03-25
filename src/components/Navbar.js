import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./img/logo-icon.svg";

function NavigationBar({ user, onLogout }) {
  const isGuest = !user || !user.id;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cookijar_user");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <Navbar bg="primary" className="m-auto" data-bs-theme="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          alt=""
          src={Icon}
          width="160"
          height="160"
          className="d-inline-block align-center"
        />{" "}
        CookiJar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/tasks">To-do</Nav.Link>
          {!isGuest ? (
            <NavDropdown title={`${user.name}'s Jar`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createreward">
                + New Reward
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rewards">
                Cash-In
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {/*  removed /users/:id — no route exists, replaced with home */}
              <NavDropdown.Item as={Link} to="/">
                Home
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
          {!isGuest && (
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;