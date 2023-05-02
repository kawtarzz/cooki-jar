import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([])
    const [complete, setComplete] = useState(false)
    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const getTasks = () => {
        fetch(`http://localhost:8088/tasks`)
            .then((res) => res.json())
            .then(setTasks);
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
        .then(() => {
            getTasks()
        });
    };

    
    useEffect(()=> {
        fetch(`http://localhost:8088/tasks?userId=${cookijarUserObject.id}`)
            .then((res) => res.json())
            .then(setMyTasks);
    },[])

   const completeTask = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:8088/tasks/${id}`, {
        method: "PUT",
    }).
   }

    return (
        <><aside>
        <input type="button"
            value="Add Task"
            onClick={() => { 
                navigate("/create");
                }}
            /></aside>

        <ul> 
            {myTasks.map((t) => (
                    
                        
                    <li style={{ listStyle: "none" }} key={t.id}>
                      <h3>Tasks:</h3> <h4>{t.taskDescription}</h4>
                    <h5>Point Value: {t.points}{""}</h5>
               
                    <input 
                        type="button"
                        value="Edit"
                        onClick={()=> {
                            navigate(`/edit/${t.id}`);
                        }} 
                        />
                        <input
                        type="button"
                        value="Complete"
                        onClick={()=> {
                            setComplete(t.id)  
                        }}/>
                        <input
                        type="button"
                        value="Delete"
                        onClick={()=> {
                            deleteTask(t.id);
                        }}
                        />
                        
                        </li>
            ))}</ul>
        </>
    );
}
