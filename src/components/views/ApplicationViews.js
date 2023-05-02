import { Outlet, Route, Routes } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"

const localcookiJarUser = localStorage.getItem("cookijar_user")
const cookijarUserObject = JSON.parse(localcookiJarUser)


export default function Dashboard() {
    return (
    <Routes>
        <Route path="/" element={
        <>
        <h1> cookiJar</h1>
        <div>The sweet rewards of productivity!</div>
        {`Welcome back ${cookijarUserObject.name} !`}
            <Outlet />
        </>}>

    <Route path="tasks" element={<TaskList />} />
    <Route path="/create" element ={ < CreateTask />} />
    <Route path="/edit/:id" element={< EditTask />} />


            </Route>
        </Routes>
    )
}
