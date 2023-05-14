import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"


export default function TaskList({ sumPoints }) {
    const [tasks, setTasks] = useState([])

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = month + "/" + day + "/" + year;

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
            startDate: task.startDate,
            completedDate: newdate,
            completed: true
        }
        fetch(`http://localhost:8088/tasks/${task.id}?userId=${cookijarUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendToApi)
        })
        window.alert(`Great job ${cookijarUserObject.name}!`)
        getMyTasks()
        sumPoints()
    }

    const deleteTask = (id) => {
        console.log('deleteTask...');
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(() => { getMyTasks() })
    }

    useEffect(() => {
        getMyTasks()
    }, [])

    return (
        <> <center>
            {tasks.map((task) => (
        <div className="notecard">
            <header key={task.id} className="card header">
                <span class="card-title"><h4> <b>Task:</b>{task.id}</h4><h5>{task.taskDescription}</h5>
  </span></header>
                <br></br>
    <p className="card-text">

       
            <br></br>
       <h6><b>Point Value:</b> {task.points}{""}</h6>
       <h6><b>Start:</b> {task.startDate} {""}</h6>
   
            <h6><b>Completed?:</b> {task.completed}{" "}</h6>
   
                       <br></br>
  
                        <Button onClick={() => {navigate(`/edit/${task.id}`);
                            }}>Edit Task</Button>
                        <Button variant="success" onClick={() => {setCompletedTask(task);}}>Completed</Button>
                        <Button variant="danger" onClick={() => {deleteTask(task.id);}}>Delete</Button>
                
                            </p>
       
                     </div>
                     
                     ))}
               
                </center>
               </>
    )
}

      