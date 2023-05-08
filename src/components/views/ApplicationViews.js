import { Outlet, Route, Routes } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"
import { useEffect, useState } from "react"
import Logo from './logo.svg'

export default function ApplicationViews() {
    const [points, setPoints] = useState(0)
    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    useEffect(() => {
        const localcookiJarUser = localStorage.getItem("cookijar_user")
        const cookijarUserObject = JSON.parse(localcookiJarUser)
        fetch(`http://localhost:8088/users?id=${cookijarUserObject.id}`)
            .then((res) => res.json())
            .then(res => setPoints(JSON.stringify(res[0].points)))
    }, [])

    return <Routes>
            <Route path="/" element={
                <> <header className="App-header">
                    <div className="App-logo">
                        <img src={Logo} alt="App-logo" width="300" height="300" className="App-logo"/>
                    </div> 
                 <h2>Rewarding productivity!</h2>
                {`Welcome back ${cookijarUserObject.name} You have ${parseInt(points)} points!`} </header>
                    <Outlet />
                </>}>

                <Route path="/tasks" element={<TaskList />} />
                <Route path="/create" element={< CreateTask />} />
                <Route path="/edit/:id" element={< EditTask />} />
            </Route>
        </Routes> 
}

const SetUserPoints = () => {
    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    const [completed, setCompleted] = useState()

    const getMyPoints = () => {
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=true`).then((res) => res.json())
        .then(console.log(setCompleted));
    }
    console.log(getMyPoints())
    const setMyPoints = setCompleted.map((task) => { 
        if (task.completed === true && task.points > 0) {
            return task.points
        } else { return ("")}
    })    
}

