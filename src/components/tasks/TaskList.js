import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function TaskList({ user, awardPoints }) {
  const [tasks, setTasks] = useState([]);

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
    <>
      {tasks.map((task) => {
        return (
          <Card key={task.id} className="mb-4">
            <Card.Header>{task.taskDescription}{" "}</Card.Header>
            <Card.Body>
              <Card.Text>
                Point Value: {task.points}
              </Card.Text>
              <div className="d-flex gap-2">
                <Button variant="outline-success"
                  size="sm"
                  onClick={() => {
                    setCompletedTask(task);
                  }}>
                  Completed{" "}
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  href={`/tasks/${task.id}/edit`}
                >
                  Edit{" "}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  Delete{" "}
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
