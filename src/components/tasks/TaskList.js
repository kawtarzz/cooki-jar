import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TaskList() {
    const [tasks, setMyTasks] = useState([])
    const [ filteredTasks, setFiltered] = useState([])
    const [complete, setCompleted] = useState(false)
    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    useEffect(()=>{
        if (complete) {
            const completedTasks = tasks.filter(task => task.completed === true) 
                setCompleted(true)
            } else {
                setFiltered(tasks)
            } 
        }, [filteredTasks]
    )

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(() => { getMyTasks() }
            );};

    const getMyTasks = () => {
       fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}`)
            .then((res) => res.json())
            .then(setMyTasks);}
                
    useEffect(() => {
        getMyTasks()
        }, [])

    return (
        <><aside>
            <input type="button"
                value="Add Task"
                onClick={() => {
                    navigate("/create");
                }}
            /></aside>
            <ul>
                {tasks.map((task) => (
                    <li style={{ listStyle: "none" }} key={task.id}>
                        <h3>Task:</h3> <h4>{task.taskDescription}</h4>
                        <h5>Point Value: {task.points}{""}</h5>
                        <h6>{task.completed}</h6>

                        <input
                            type="button"
                            value="Edit"
                            onClick={() => {
                                navigate(`/edit/${task.id}`);
                            }}
                        />
                        <input
                            type="button"
                            value="Delete"
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                        />
                        <input
                            type="button"
                            value="Complete"
                            onClick={() => {
                                setCompleted(true);
                            }}
                        />
                    </li>
                ))}</ul>
        </>
    );
}
   