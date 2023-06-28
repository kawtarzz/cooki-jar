import { Authorized } from "./components/views/Authorized.js"
import ApplicationViews from "./components/views/ApplicationViews.js"
import { NavBar } from "./components/nav/NavBar.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
import Logo from "./components/views/logo.svg"
import { useNavigate } from "react-router-dom"
import './App.css'


export const App = () => {
  const navigate = useNavigate()
  return <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized><>
          <Link to="/" onClick={() => { navigate("/") }} >
            <img src={Logo} width="80" height="80" alt="Logo" /><br /><h4>cookiJar</h4>
          </Link>
          <NavBar />
          <ApplicationViews />
        </>
        </Authorized>} />
    </Routes>

  </>
}

export default App;