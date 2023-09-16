import { Outlet, Route, Routes } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import RewardsList from "../rewards/Rewards"
import { ButtonAction } from "../ui/ButtonAction"
import { Container } from "react-bootstrap"

export default function ApplicationViews() {
    return <>
        <ButtonAction />
        <Outlet />
        <Container fluid="md">
            <Routes>
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/rewards" element={<RewardsList />} />

                <div className="App-logo">
                    <img src={Logo} alt="App-logo" width="300" height="350" className="App-logo" />
                </div>
                <h2 style={{ color: "yellow" }}>
                    {`Welcome back ${cookijarUserObject.name} You have ${parseInt(points)} points!`}
                </h2>
                <Button variant="warning" onClick={() => { navigate("/create") }}>Add Task</Button>
                <Button variant="primary" onClick={() => { navigate("/tasks") }}>My Tasks</Button>
                <Button variant="success" onClick={() => { navigate("/rewards") }}>Cash-In</Button>
            </center> </header><Outlet />


    </>
}>

                <Route path="/tasks" element={<TaskList sumPoints={sumPoints} />} />
                <Route path="/create" element={< CreateTask />} />
                <Route path="/edit/:id" element={< EditTask />} />
                <Route path="/rewards" element={< RewardsList setPoints={setPoints} points={points} />} />

            </Route >
        </Routes >
    </>
}