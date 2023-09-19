import { Outlet, Route, Routes } from "react-router-dom"
import TaskList from "../tasks/TaskList"
import RewardsList from "../rewards/Rewards"
import { ButtonAction } from "../ui/ButtonAction"
import { Container } from "react-bootstrap"
import CreateTask from "../tasks/CreateTask"

export default function ApplicationViews() {
    return <>
        <ButtonAction />
        <Outlet />
        <Container fluid="md">
            <Routes>
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/rewards" element={<RewardsList />} />
                <Route path="/tasks/new" element={<CreateTask />} />

            </Routes >
        </Container>
    </>
}