
import { Outlet, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import TaskList from "./components/tasks/TaskList"
import { useState, useEffect } from "react"
import RewardsList from "./components/rewards/Rewards"
import { Navbar } from "react-bootstrap"
import Nav from './components/Navbar'
import Header from "./components/ui/Header"
import ApplicationViews from "./components/views/ApplicationViews"
import { Authorized } from './components/views/Authorized'
import { ButtonAction } from "./components/ui/ButtonAction"
export const App = () => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <Authorized><>
            <Nav />
            <Header />
            <ApplicationViews />
          </>
          </Authorized>} />
      </Routes>
    </>
  )

}

export default App;
