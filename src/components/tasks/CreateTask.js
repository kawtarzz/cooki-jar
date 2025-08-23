import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./tasks.css";
import TaskForm from "./NewTaskForm";

export default function CreateTask({ user, isGuest = false }) {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    userId: user.id,
    taskDescription: "",
    points: "",
    completed: false,
  });

  const onFormSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      userId: user.id,
      taskDescription: task.taskDescription,
      points: parseInt(task.points),
      completed: false,
    };

    if (isGuest) {
      window.alert("Task created! (Guest mode - changes won't be saved)");
      navigate("/");
      return;
    }

    return fetch(`http://localhost:8088/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      return response.json();
    })
      .then(() => {
        window.alert("You got this!");
        navigate("/");
      })
      .catch(error => {
        console.error('Error creating task:', error);
        window.alert("Error creating task. Please try again.");
      });
  };

  return (
    <>
      <TaskForm
        key={task.id}
        onSubmit={onFormSubmit}
        task={task}
        setTask={setTask}
        isGuest={isGuest}
      />
    </>
  );
}