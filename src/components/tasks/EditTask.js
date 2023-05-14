import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "./NewTaskForm";

export default function EditTask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState()


    const getTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`)
            .then((res) => res.json())
            .then(setTask);
    };

    useEffect(() => {
        getTask(id);
    }, [id]);

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(() => {
        navigate("/");
    })
    };
    if (!task) {
        return null;
    }

    return (
        <>
            <h1>Edit {task.id}</h1>
            <TaskForm
                task={task}
                setTask={setTask}
                onSubmit={onFormSubmit}
            />
        </>
    );
}
