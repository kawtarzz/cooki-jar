import { Link, useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { Container } from "react-bootstrap"
import logo from "./logo.svg"
import { Nav } from "react-bootstrap"


export default function CookiNav() {
  const navigate = useNavigate()
  return (
    <> <Nav className="bg-body-tertiary">
      <Container>
        <Nav.Link href="/">
          <img
            alt="logo"
            src={logo}
            width="200"
            height="200"

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
