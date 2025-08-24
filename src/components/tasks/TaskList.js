import { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TaskList({ user, isGuest = false, onPointsUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mockTasks = [
    {
      id: "mock-1",
      userId: user.id,
      taskDescription: "Sample Task 1 - Clean your room",
      points: 10,
      completed: false
    },
    {
      id: "mock-2",
      userId: user.id,
      taskDescription: "Sample Task 2 - Do homework",
      points: 15,
      completed: false
    },
    {
      id: "mock-3",
      userId: user.id,
      taskDescription: "Sample Task 3 - Walk the dog",
      points: 5,
      completed: false
    }
  ];

  const getMyTasks = () => {
    if (isGuest) {
      setTasks(mockTasks);
      setLoading(false);
      return;
    }

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
    if (isGuest) {
      window.alert("Task deleted! (Guest mode - changes won't be saved)");
      setTasks(tasks.filter(task => task.id !== id));

      return;
    }

    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8088/api/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to delete task');
          }
          return res.json();
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
    if (isGuest) {
      window.alert(
        `Great job ${user.name}! You would have earned ${task.points} points (Guest mode)`
      );
      setTasks(tasks.filter(t => t.id !== task.id));
      return;
    }

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

        if (onPointsUpdate) {
          onPointsUpdate(task.points);
        }

        window.alert(
          `Great job ${user.name}! You have been awarded ${task.points} points!`
        );
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
  }, [user.id, isGuest]);

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
      {
        isGuest && (
          <Alert variant="info" className="mb-3">
            <strong>Guest Mode:</strong>
            These are sample tasks. Your actions won't be permanently saved.
          </Alert>
        )
      }

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
                {isGuest && <span className="badge bg-secondary ms-2">Demo</span>}
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