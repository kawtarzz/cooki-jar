import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Tasks.css"

export default function TaskList() {
    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const getMyTasks = () => {
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}&completed=false`)
            .then((res) => res.json())
            .then(setTasks);
    }

    const setCompletedTask = (task) => {
        const sendToApi = {
            userId: cookijarUserObject.id,
            taskDescription: task.taskDescription,
            points: task.points,
            completed: true
        }
        fetch(`http://localhost:8088/tasks/${task.id}?userId=${cookijarUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendToApi)
        })

        getMyTasks()
    }

    const deleteTask = (id) => {
        console.log('deleteTask...');
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(() => { getMyTasks() })
    }

    useEffect(() => {
        const myTasks = getMyTasks()
    }, [])

    return (
        <> <br></br>
            <center>
                <input type="button"
                value="Add Task"
                className="button__add"
                onClick={() => {
                    navigate("/create");
                }}
            />
                
            <ul>
                {tasks.map((task) => (
                    <li style={{ listStyle:"none" }} key={task.id} >
                        <div className="task_list">
                        <h3>Task:</h3> <h4>{task.taskDescription}</h4>
                        <h5>Point Value: {task.points}{""}</h5>
                        <h5>Start: {task.date}</h5>
                        <h6>Completed?:{task.completed}</h6>
                        
                        <input
                            type="button"
                            className="button__edit"
                            value="Edit"
                            onClick={() => {
                                navigate(`/edit/${task.id}`);
                            }}
                        />
                        <input
                            type="button"
                            className="button__delete"
                            value="Delete"
                            
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                        />
                        <input
                            type="button"
                            value="Complete"
                            className="button__complete"
                            onClick={() => {
                                setCompletedTask(task);
                            }}
                        />
                   
                    </div> </li>
                ))}</ul></center>
        </>
    )
}