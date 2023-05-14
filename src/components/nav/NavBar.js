import { useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Button } from "react-bootstrap"
import { Nav } from "react-bootstrap"


export const NavBar = () => {
    const navigate = useNavigate()
    return (
    <>  
    <Nav fill variant="tabs" defaultActiveKey="/home">                
        <Nav.Item>
         <Nav.Link eventkey="link-1" onClick={()=> {navigate("/tasks")}}>Tasks</Nav.Link>{' '}
        </Nav.Item>
            
        <Nav.Item>
            <Nav.Link eventkey="2" to="/create"
                onClick={() => { navigate("/create");}}>
                    Add Task</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
           
                <Button variant ="danger"to="/login" className="logout" onClick={() => {
                    localStorage.removeItem("cookijar_user")
                    navigate("/", { replace: true })
                }}>Logout</Button>{' '}
               
        </Nav.Item>
        </Nav>
        </>

    )
}
