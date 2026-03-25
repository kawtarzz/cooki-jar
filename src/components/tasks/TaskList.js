import { useEffect, useState } from "react";
import { Button, Card, Alert, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/config";

// Removed isGuest prop temporarily - will reintroduce if we decide to bring back guest mode for tasks

export default function TaskList({ user, onPointsUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getMyTasks = () => {
    fetch(API_ENDPOINTS.TASKS + `?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then(setTasks)
      .catch((err) => {

        window.alert("Error loading tasks. Please try again.");
      });
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(API_ENDPOINTS.TASKS + `/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to delete task');
          return res.status !== 204 ? res.json() : null;
        })
        .then(() => {
          getMyTasks();
        })
        .catch((error) => {

          window.alert("Error deleting task. Please try again.");
        });
    }
  };

  const setCompletedTask = (task) => {
    const sendToApi = {
      userId: user.id,
      taskDescription: task.taskDescription,
      points: task.points,
      completed: true,
      id: task.id,
    };

    fetch(API_ENDPOINTS.TASKS + `/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendToApi),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to complete task");
        return res.json();
      })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== task.id));
        if (onPointsUpdate) onPointsUpdate();
        window.alert(`Great job ${user.name}! You have been awarded ${task.points} points!`);
      })
      .catch((error) => {
        console.error('Error completing task:', error);
        window.alert("Error completing task. Please try again.");
      });
  };

  useEffect(() => {
    getMyTasks();
  }, []);

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading tasks: {error}
        <br />
        <Button variant="outline-primary" onClick={getMyTasks} className="mt-2">
          Try Again
        </Button>
      </Alert>
    );
  }

  return (
    <Container fluid className="tasks__container mt-4">
      <h2 className="section-title">Tasks</h2>
      <Row className="justify-content-md-center tasks__row">

        {tasks.length === 0 ? (
          <Card className="text-center mt-4">
            <Alert variant="success" className="text-center">
              <Card.Img variant="top" src="/assets/celebration.png" style={{ width: "150px", margin: "0 auto" }} />
              <Card.Title>
                Congratulations {user.name}!
              </Card.Title>
              <Card.Text>
                You've completed all your tasks! 🎉
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/tasks/new")}>
                Add New Task
              </Button>
            </Alert>
          </Card>
        ) : (
          tasks.map((task) => {
            return (
              <Col key={task.id} xs={12} md={6} lg={4} className="mb-4">
                <Card className="task__card">
                  <Card.Body>
                    <Card.Title>{task.taskDescription}</Card.Title>
                    <Card.Text>Points: {task.points}</Card.Text>
                    <div className="d-flex gap-2">
                      <Button variant="outline-success" onClick={() => setCompletedTask(task)}>
                        Completed

                      </Button>
                      <Button variant="outline-primary" onClick={() => handleEditTask(task.id)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>);
}