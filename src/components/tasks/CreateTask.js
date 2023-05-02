import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskForm from "./NewTaskForm"

export default function CreateTask() {
    const navigate = useNavigate();
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const [task, setNewTask] = useState({
        userId: cookijarUserObject.id,
        taskDescription: "",
        points: "",
        completed: false
        
    });

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(() => {
            navigate("/tasks");
        });
    };

    return (
        <>
            <h1>Add a  new Task</h1>
            <TaskForm
                task={task}
                setNewTask={setNewTask}
                onSubmit={onFormSubmit}
            />
        </>
    );
}