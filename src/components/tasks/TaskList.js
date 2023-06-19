import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import './tasks.css'
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function TaskList({ sumPoints }) {
    const [tasks, setTasks] = useState([])

    var dateObj = new Date()
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
            typeId: task.typeId,
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

    return (<>
        <Card style={{ margin: "1rem 1rem", padding: "1%" }}>
            <Card.Header className="list__header">
                <h3>
                    My Tasks
                </h3>
            </Card.Header>

            <ListGroup className="list__row">
                {tasks.map(task => {
                    return <>
                        <ListGroupItem key={task.id}>
                            <b>
                                Task Description:
                            </b>
                            <h5 className="task__header">
                                {task.taskDescription} {" "}
                            </h5>
                        </ListGroupItem>

                        <ListGroupItem key={task.id}>
                            <h6>
                                Task Type:
                            </h6>
                            {task.typeId}{" "}
                        </ListGroupItem>

                        <ListGroupItem key={task.id}>
                            <h6>
                                Point Value:
                            </h6>
                            {task.points}{" "}
                        </ListGroupItem>

                        <ListGroupItem key={task.id}>
                            <h6>Start:</h6>
                            {task.startDate} {" "}
                        </ListGroupItem>

                        <Card.Footer className="task__list">
                            <ButtonGroup>
                                {task.completed}{" "}
                                <Button variant="success" onClick={() => { setCompletedTask(task); }}>Completed</Button>

                                <Button onClick={() => {
                                    navigate(`/edit/${task.id}`);
                                }}>Edit Task</Button>

                                <Button variant="danger" onClick={() => { deleteTask(task.id); }}>Delete</Button>
                            </ButtonGroup>
                        </Card.Footer>
                    </>

                })}
            </ListGroup>
        </Card >

    </>)
}



