import { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Removed isGuest prop temporarily - will reintroduce if we decide to bring back guest mode for tasks

export default function TaskList({ user, onPointsUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getMyTasks = () => {
    fetch(`http://localhost:8088/api/tasks?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return res.json();
      })
      .then((allTasks) => {
        const incompleteTasks = allTasks.filter(task => !task.completed);

        setTasks(incompleteTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8088/api/tasks/${id}`, {
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
          console.error('Error deleting task:', error);
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

    fetch(`http://localhost:8088/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendToApi),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to complete task');
        }
        return response.json();
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

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  useEffect(() => {
    getMyTasks();
  }, [user.id]);

  if (loading) {
    return <div className="text-center mt-4">Loading tasks...</div>;
  }

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
    <>
      {tasks.length === 0 ? (
        <Alert variant="success" className="text-center">
          <h4>All tasks completed! 🎉</h4>
          <p>Great job! You don't have any pending tasks.</p>
          <Button variant="primary" onClick={() => navigate("/tasks/new")}>
            Add New Task
          </Button>
        </Alert>
      ) : (
        tasks.map((task) => {
          return (
            <Card key={task.id} className="mb-4">

              <Card.Header>
                <strong>{task.taskDescription}</strong>

              </Card.Header>

              <Card.Body>
                <Card.Text>
                  <strong>
                    Point Value:
                  </strong> {task.points || 0} points
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setCompletedTask(task);
                    }}
                  >
                    Complete
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </>
  );
}