import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap"
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
            <h1>{cookijarUserObject.name}'s To-Do List</h1>
            <br />

            <div className="cardContainer">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="flexDiv">
                            <Card>
                                <ListGroup as="ol">
                                    <ListGroupItem as="li" active>
                                        <Card.Title as="h2">{task.taskDescription}</Card.Title>
                                    </ListGroupItem>
                                    <Card.Text>
                                        <ListGroupItem as="li">
                                            <b>Point Value:</b>
                                            {" "}{task.points}
                                            <br></br>
                                            <b>Start:</b>
                                            {" "}{task.startDate}
                                            <br></br>
                                            <b>Completed?:</b>
                                            {" false"}{task.completed}
                                        </ListGroupItem>
                                        <ButtonGroup>
                                            <Button onClick={() => {
                                                navigate(`/edit/${task.id}`);
                                            }}>
                                                Edit Task
                                            </Button>

                                            <Button variant="success" onClick={() => { setCompletedTask(task); }}>
                                                Complete
                                            </Button>
                                            <br></br>

                                            <Button variant="warning" onClick={() => { deleteTask(task.id); }}>
                                                Delete
                                            </Button>

                                        </ButtonGroup>
                                    </Card.Text>
                                </ListGroup>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div>No tasks found.</div>
                )}
            </div>
        </>
    );
}