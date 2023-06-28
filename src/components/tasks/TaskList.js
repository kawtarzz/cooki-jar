import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup } from "react-bootstrap"
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
        <> <CardGroup><center>

            <Card.Title as="h1">
                {cookijarUserObject.name}'s To-Do List
            </Card.Title><br></br>
        </center>
            {tasks.map((task) => (
                <Card key={task.id}>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>
                            {task.taskDescription}
                        </Card.Title>
                        <Card.Text>
                            <b>Point Value:</b>
                            {" "}{task.points}
                            <br></br>
                            <b>
                                Start:
                            </b>
                            {" "}{task.startDate}
                            <br></br>
                            <b>
                                Completed?:
                            </b>
                            {" false"}{task.completed}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup>

                            <Button onClick={() => {
                                navigate(`/edit/${task.id}`);
                            }}>
                                Edit Task
                            </Button>

                            <Button variant="success" onClick={() => { setCompletedTask(task); }}>
                                Complete
                            </Button><br></br>

                            <Button variant="danger" size="sm" onClick={() => { deleteTask(task.id); }}>
                                Delete
                            </Button>
                        </ButtonGroup>

                    </Card.Footer>


                </Card>
            ))}
        </CardGroup >
        </>
    )
}

