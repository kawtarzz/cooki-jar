import { Outlet, Route, Routes } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    const [points, setPoints] = useState(0)


    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${cookijarUserObject.id}`)
            .then((res) => res.json())
            .then(res => setPoints(JSON.stringify(res[0].points)))
    }, [])

    return (
        
        <Routes>
            <Route path="/" element={
                <><center>

                    <h1> cookiJar</h1>
                    <h3>Rewarding productivity!</h3>
                    {`Welcome back ${cookijarUserObject.name} You have ${parseInt(points)} points!`}
                </center>
                    <Outlet />
                </>}>

                <Route path="tasks" element={<TaskList />} />
                <Route path="/create" element={< CreateTask />} />
                <Route path="/edit/:id" element={< EditTask />} />


            </Route>
        </Routes>
    )
}