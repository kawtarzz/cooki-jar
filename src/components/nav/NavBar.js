import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from '../views/logo.svg'


export const NavBar = () => {
    const navigate = useNavigate()
    return (
    <>
        <div className="container">
            <header className="header">  <Link to ="/" onClick={()=> {navigate("/")}} > 
            <img src={Logo} width="50" height="50" alt="Logo"/><br/><h5>cookiJar</h5>
            </Link>
            </header></div>
            
                <div>
                <Link to="/login" className="logout" onClick={() => {
                    localStorage.removeItem("cookijar_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
        </div>
        </>

    )
}

