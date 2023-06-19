import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "./NewTaskForm";

export default function EditTask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState()
    const [type, setType] = useState()

    const getTasks = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`)
            .then((res) => res.json())
            .then(setTask);
    };

    const getTypes = () => {
        fetch(`http://localhost:8088/types/)`)
        .then((res)=> res.json())
        .then(setType)
    };

    useEffect(() => {
        getTypes(type)
    },[type])

    useEffect(() => {
        getTasks(id);
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
            navigate("/tasks");
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
                type={type}
                setType={setType}
                onSubmit={onFormSubmit}
            />
        </>
    );
}
