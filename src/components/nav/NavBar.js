import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import navlogo from './navlogo.svg'
import { useNavigate } from 'react-router-dom';
import './NavBar.css'



function AppNavBar() {
    const navigate = useNavigate()
    return (
        <>
            <br />
            <Navbar bg="primary" variant="dark" expand="sm" fixed="top">
                <Container>
                    <Navbar.Brand href="/"> <img src={navlogo} height="60" /></Navbar.Brand>

                    <br></br>
                    <Nav.Link href="/login" className="logout" onClick={() => {
                        localStorage.removeItem("cookijar_user")
                        navigate("/", { replace: true })
                    }}>Logout</Nav.Link>{' '}

                </Container>
            </Navbar>
        </>
    );
}

export default AppNavBar;

