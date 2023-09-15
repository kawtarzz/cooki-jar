import { Authorized } from "./components/views/Authorized.js"
import ApplicationViews from "./components/views/ApplicationViews.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes } from "react-router-dom"
import './App.css'
import Nav from "./components/Navbar.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Header from "./components/ui/Header.js"
export const App = () => {
  return <>
    <Nav />
    <Outlet />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
          <Header />
          <ApplicationViews />
        </Authorized>} />
    </Routes>
  </>
}

export default App;
