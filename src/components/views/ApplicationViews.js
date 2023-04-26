import { Outlet, Route, Routes } from "react-router-dom"
import { TaskContainer } from "../tasks/TaskContainer.js"
import { TaskForm } from "../tasks/TaskForm.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>cookiJar</h1>
                    <div>the sweet reward of productivity</div>

                    <Outlet />
                </>
            }>

                <Route path="tasks" element={<TaskContainer />} />
                
            
                <Route path="task/create" element={<TaskForm />} />
            </Route>
        </Routes>
    )
}