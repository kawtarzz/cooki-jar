import { Outlet, Route, Routes } from "react-router-dom"
import { TaskList } from "../tasks/TaskList.js"
import EditTask from "../tasks/EditTask.js"
import CreateTask from "../tasks/CreateTask.js"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>cookiJar</h1>
                    <div>Welcome </div>

                    <Outlet />
                </>
            }>

                <Route path="/tasks/create" element={< CreateTask />} />
                <Route path="/edit/:id" element={< EditTask />} />
                <Route path="/tasks" element={< TaskList />} />
            </Route>
        </Routes>
    )
}

