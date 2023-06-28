import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap"
import { Container } from "react-bootstrap";


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
        <>

            <h2>{cookijarUserObject.name}'s <br></br>To-Do List</h2>
            {tasks.map((task) => (
                <Container key={task.id}>
                    <ListGroup className="list-group-flush">
                        <Card.Header as="h3">
                            <b></b> {" "}{task.taskDescription}
                        </Card.Header>
                        <ListGroup.Item>
                            <u>
                                <b>Point Value:</b>
                            </u>
                            {" "}{task.points}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <u>
                                <b>Start:</b>
                            </u>
                            {" "}{task.startDate}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <u>
                                <b>Completed?:</b>
                            </u>
                            {" false"}{task.completed}
                        </ListGroup.Item>
                    </ListGroup>
                    <ButtonGroup>
                        <Button onClick={() => {
                            navigate(`/edit/${task.id}`);
                        }}>Edit Task</Button>

                        <Button variant="primary" onClick={() => { deleteTask(task.id); }}>Delete</Button>

                        <Button variant="success" onClick={() => { setCompletedTask(task); }}>Complete</Button>
                    </ButtonGroup>


                </Container>
            ))}
        </>
    )
}

