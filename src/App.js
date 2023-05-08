import { Authorized } from "./components/views/Authorized.js"
import ApplicationViews from "./components/views/ApplicationViews.js"
import { NavBar } from "./components/nav/NavBar.js"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Route, Routes, Link } from "react-router-dom"
import "./App.css"


export const App = () => {
    return <> <section className="App">

      <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  
    <Route path="*" element={
      <Authorized><>
      
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized> } />
  </Routes>

  <Link className="button__delete" to="/tasks">Tasks</Link> <Link className="button__edit" to="/create">Create Task</Link>
     
      </section>
      </>
  }
  
  export default App;

  