import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"
import { useEffect, useState } from "react"
import Logo from './logo.svg'

export default function ApplicationViews() {
    const [points, setPoints] = useState(0)
    const [filtered, setFiltered] = useState([])

    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    const navigate = useNavigate()

    // const getPoints = async () => {
    //     let pointsArray = await fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=true`)
    //         .then((res) => res.json())
    //         .then(res => JSON.stringify(res.map(res => res.points)))
    // }

    const sumPoints = async () => {
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=true`)
            .then((res) => res.json())
            .then(res => JSON.stringify(setPoints(res.map(res => res.points).reduce((acc, curr) => acc + curr))))
    }
    
    useEffect(() => {
        sumPoints()
    }, [])



    return <Routes>
        <Route path="/" element={
            <> <header className="App-header">
                <div className="App-logo">
                    <img src={Logo} alt="App-logo" width="300" height="300" className="App-logo" />
                </div>
                <h2>Rewarding productivity!</h2>
                {`Welcome back ${cookijarUserObject.name} You have ${parseInt(points)} points!`} </header><Outlet />

            </>}>

            <Route path="/tasks" element={<TaskList sumPoints={sumPoints} />} />
            <Route path="/create" element={< CreateTask />} />
            <Route path="/edit/:id" element={< EditTask />} />

        </Route>
    </Routes>
}
