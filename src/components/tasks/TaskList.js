import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

export default function TaskList({ getMyPoints, awardPoints }) {
  const [tasks, setTasks] = useState([]);
  const localcookiJarUser = localStorage.getItem("cookijar_user");
  const user = JSON.parse(localcookiJarUser);

  const getMyTasks = () => {
    fetch(`http://localhost:8088/tasks?userId=${user.id}&completed=false`)
      .then((res) => res.json())
      .then(setTasks);
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8088/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getMyTasks();
      });
  };

  const setCompletedTask = (task) => {
    const sendToApi = {
      userId: user.id,
      taskDescription: task.taskDescription,
      points: task.points,
      completed: true,
      id: task.id,
    };
    fetch(`http://localhost:8088/tasks/${task.id}?userId=${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendToApi),
    }).then(() => {
      awardPoints(task);
    });
    window.alert(
      `Great job ${user.name}!You have been awarded ${task.points} points`
    );
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        {tasks.map((task) => {
          return (
            <>
              <Col key={task.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{task.taskDescription}</Card.Title>
                    <Card.Text>
                      Point Value:
                      {task.points}
                      {""}
                    </Card.Text>
                    <br />
                    <ButtonGroup bsSize="x-s">
                      <Button variant="secondary" href={`/tasks/${task.id}`}>
                        Edit Task
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          setCompletedTask(task);
                        }}
                      >
                        Completed
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteTask(task.id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </Container>
  );
}
