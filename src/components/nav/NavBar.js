import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    return (
    <>
        <div className="container">
            <header className="header"> cookiJar</header>
           
            <nav className="logout">
                <aside className="logout">
                    <Link to="" onClick={() => {
                        localStorage.removeItem("cookijar_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </aside>
            </nav>
        </div>
        <footer className="nav__aside">
            <aside className="nav__aside">

           <ul>
            
           <li>
             <Link to="/tasks">Tasks</Link> 
            </li>
        <li>
            <Link to="/create">Create Task</Link>
        </li>
            </ul> 
            </aside>
   </footer> </>


    )
}

