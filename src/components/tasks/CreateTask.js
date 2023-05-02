import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskForm from "./NewTaskForm"

export default function CreateTask() {
    const navigate = useNavigate();
    const [task, setNewTask] = useState({
        taskDescription: "",
        points: "",
        completed: "",
    });

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        fetch(`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(() => {
            navigate("/");
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