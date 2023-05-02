import { useEffect, useState } from "react"
import "./Tasks.css"
import { useNavigate } from "react-router-dom";

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()

    const getTasks = () => {
        fetch("http://localhost:8088/tasks")
            .then((res) => res.json())
            .then(setTasks);
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    useEffect(()=>{
        getTasks();
    }, []);
    
    return (
        <>
        <input type="button"
            value="Add Task"
            onClick={() => { 
                navigate("/create");
                }}/>
        <ul> 
            {tasks.map((task) => (
                    <li style={{ listStyle: "none" }} key={task.id}>
                      {task.taskDescription}
                    Point Value: {task.points}
                    <input 
                        type="button"
                        value="Edit"
                        onClick={()=> {
                            navigate(`/edit/${task.id}`);
                        }} 
                        />
                        <input
                        type="button"
                        value="Delete"
                        onClick={()=> {
                            deleteTask(task.id);
                        }}
                        />
                        </li>
            ))}</ul>
        </>
    );
}
