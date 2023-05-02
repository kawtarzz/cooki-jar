import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { HomePage } from "../views/Home"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <header className="header"> cookiJar</header>
            <nav className="navlinks" fixed="top">
                {HomePage}
                <div className="navlinks_2">
                    <Link to="/tasks">Tasks</Link> </div>
                <div className="navlinks_3">
                    <Link to="/tasks/create">Create Task</Link>
                </div>

            </nav>
            <nav className="logout">
                <aside className="logout">
                    <Link to="" onClick={() => {
                        localStorage.removeItem("cookijar_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </aside>
            </nav>

        </div>


    )
}

