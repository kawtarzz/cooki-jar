import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"
import { useEffect, useState } from "react"
import Logo from './logo.svg'
import { Button, ButtonGroup } from "react-bootstrap"
import RewardsList from "../rewards/Rewards.js"


export default function ApplicationViews() {
    const [points, setPoints] = useState(0)

    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    const navigate = useNavigate()

    const sumPoints = async () => {

        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=true`)
            .then((res) => res.json())
            .then(res => JSON.stringify(setPoints(res.map(res => res.points).reduce((acc, curr) => acc + curr))))
    }

    useEffect(() => {
        sumPoints()
    }, [])

    return <>
        <header className="App-header">
            <center>
                <div className="centered-bg">
                    <img src={Logo} alt="App-logo" width="500" height="500" className="App-logo" />
                </div> </center>
        </header>
        <Routes>
            <Route path="/" element={
                <>
                    <center>

                        <h2 style={{ color: "#FFBD59" }}>
                            {`Welcome back ${cookijarUserObject.name} You have ${parseInt(points)} points!`}
                        </h2>
                        <ButtonGroup>

                            <Button variant="primary" onClick={() => { navigate("/tasks") }}>My Tasks</Button>

                            <Button variant="primary" onClick={() => { navigate("/tasks/create") }}>Add Task</Button>

                            <Button variant="success" onClick={() => { navigate("/rewards") }}>Cash-In</Button>
                        </ButtonGroup>

                        <Outlet />
                    </center>
                </>}>

                <Route path="/tasks" element={<TaskList sumPoints={sumPoints} />} />
                <Route path="/tasks/create" element={< CreateTask />} />

                <Route path="/edit/:id" element={< EditTask />} />
                <Route path="/rewards" element={< RewardsList setPoints={setPoints} points={points} />} />

            </Route>
        </Routes>
    </>
}