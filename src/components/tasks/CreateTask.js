import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskForm from "./NewTaskForm"

export default function CreateTask() {
    const navigate = useNavigate();
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = month + "/" + day + "/" + year;

    const [task, setTask] = useState({
        userId: cookijarUserObject.id,
        taskDescription: "",
        points: "",
        completedDate: "",
        startDate: "",
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
           <header>
                <h2>Add a  new Task</h2>
                </header><br></br>
            
            <TaskForm
                task={task}
                setTask={setTask}
                onSubmit={onFormSubmit}
                />
               
        </>
    );
}
