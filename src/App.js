import { Authorized } from "./components/views/Authorized.js"
import ApplicationViews from "./components/views/ApplicationViews.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
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

          <ApplicationViews />
        </>
        </Authorized>} />
    </Routes>

  </>
}

export default App;