import { Authorized } from "./components/views/Authorized.js"
import { ApplicationViews } from "./components/views/ApplicationViews.js"
import { NavBar } from "./components/nav/NavBar.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes } from "react-router-dom"

export const App = () => {
    return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  
    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationViews />

        </>
      </Authorized>
  
    } />
  </Routes>
  }
  
  export default App;
  