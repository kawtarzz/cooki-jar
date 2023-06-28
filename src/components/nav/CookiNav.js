import { Link, useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { Container } from "react-bootstrap"
import logo from "./logo.svg"
import { Nav } from "react-bootstrap"

const navigate = useNavigate()

export default function CookiNav() {
  return (
    <> <Nav className="bg-body-tertiary">
      <Container>
        <Nav.Link href="/">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}

        </Nav.Link>
        <Nav.Link to="/tasks" onClick={() => { navigate("/tasks") }}>Tasks</Nav.Link>{' '}
        <Nav.Link to="/create" onClick={() => { navigate("/create"); }}> Add Task</Nav.Link>
        <Nav.Link to="/login" className="logout" onClick={() => {
          localStorage.removeItem("cookijar_user")
          navigate("/", { replace: true })
        }}>Logout</Nav.Link >{' '}
      </Container>

    </Nav>
    </>

  )
}
