import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/config";

// Removed isGuest prop temporarily - will reintroduce if we decide to bring back guest mode for tasks

export default function TaskList({ user, onPointsUpdate }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getMyTasks = useCallback(() => {
    fetch(API_ENDPOINTS.TASKS + `?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((tasksData) => {
        const incompleteTasks = tasksData.filter(
          (task) => task.userId === user.id && !task.completed
        );
        setTasks(incompleteTasks);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        window.alert("Error loading tasks. Please try again.");
      });
  }, [user.id]);

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
      points: parseInt(task.points),
      completed: true,
      id: task.id,
    };
    console.log("Sending to API:", sendToApi);

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
        getMyTasks();
      })
      .catch((error) => {
        console.error('Error completing task:', error);
        window.alert("Error completing task. Please try again.");
      });
  };

  useEffect(() => {
    getMyTasks();
  }, [getMyTasks]);

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div className="tasks__container mt-4">
      <h2 className="section-title">Tasks</h2>
      <div className="tasks__row flex flex-wrap justify-center">
        {tasks.length === 0 ? (
          <div className="text-center mt-4">
            <div className="text-center">
              <img src="/assets/celebration.png" style={{ width: "150px", margin: "0 auto" }} alt="" />
              <h3>Congratulations {user.name}!</h3>
              <p>You've completed all your tasks! 🎉</p>
              <button onClick={() => navigate("/tasks/new")}>
                Add New Task
              </button>
            </div>
          </div>
        ) : (
          tasks.map((task) => {
            return (
              <div key={task.id} className="mb-4">
                <div className="task__card">
                  <div>
                    <h3>{task.taskDescription}</h3>
                    <p>Points: {task.points}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setCompletedTask(task)}>
                        Completed
                      </button>
                      <button onClick={() => handleEditTask(task.id)}>
                        Edit
                      </button>
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
