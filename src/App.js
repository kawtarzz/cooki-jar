import { Authorized } from "./components/views/Authorized.js"
import ApplicationViews from "./components/views/ApplicationViews.js"
import AppNavBar from "./components/nav/NavBar.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes } from "react-router-dom"
import './index.css'

export const App = () => {
  return <>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized><>

         
            <AppNavBar />

            <ApplicationViews />
          

        </>
        </Authorized>} />
    </Routes>

  </>
}

export default App;

