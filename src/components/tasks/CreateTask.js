import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskForm from "./NewTaskForm.js"


export default function CreateTask() {
    const navigate = useNavigate();
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const [task, setTask] = useState({
        userId: cookijarUserObject.id,
        taskDescription: "",
        typeId: "",
        points: "",
        startDate: "",
        completedDate: "",
        completed: false


    });

    const [type, setType] = useState({
        id: "",
        type: ""
    })

    const onFormSubmit = (evt) => {
        evt.preventDefault();

        const newTask = {
            userId: cookijarUserObject.id,
            taskDescription: task.taskDescription,
            typeId: parseInt(type.id),
            points: parseInt(task.points),
            startDate: task.startDate,
            completedDate: "",
            completed: false
        }
        return fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(() => {
            window.alert('You got this!')
            navigate("/tasks");
        });
    };

    return (
        <> <center>

            <header>
                <h2>Add a  new Task</h2>
            </header><br></br>

            <TaskForm
                task={task}
                setTask={setTask}
                type={type}
                setType={setType}

                onSubmit={onFormSubmit}
            />

        </center>
        </>
    );
}
