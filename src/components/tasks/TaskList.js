import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import EditTask from "./EditTask.js"


export default function TaskList({ getMyPoints, awardPoints }) {
    const [tasks, setTasks] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const user = JSON.parse(localcookiJarUser)

    const getMyTasks = () => {
        fetch(`http://localhost:8088/tasks?userId=${user.id}&completed=false`)
            .then((res) => res.json())
            .then(setTasks);
    }

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(() => { getMyTasks() })
    }

    const setCompletedTask = (task) => {
        const sendToApi = {
            userId: user.id,
            taskDescription: task.taskDescription,
            points: task.points,
            completed: true,
            id: task.id,
        }
        fetch(`http://localhost:8088/tasks/${task.id}?userId=${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendToApi)
        }).then(() => {
            awardPoints(task)
        })
        window.alert(`Great job ${user.name}!You have been awarded ${task.points} points`)
    }

    useEffect(() => {
        getMyTasks()
    }, [])

    return (
        <>
            <Container>
                {tasks.map((task) => (
                    <>
                        <div key={task.id}>
                            <ListGroup>
                                <ListGroupItem>
                                    <h3>{task.taskDescription}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h4>Value: {task.points} points</h4>
                                </ListGroupItem>
                                <ButtonGroup aria-label="Basic example" style={{ width: '2rem' }}>
                                    <Button variant="secondary" onClick={() => { setCompletedTask(task) }
                                    }>Complete</Button>
                                    <Button onClick={() => { deleteTask(task.id); }}>Delete</Button>
                                </ButtonGroup>
                            </ListGroup>
                        </div>
                    </>
                ))}
            </Container>
        </>
    )
}