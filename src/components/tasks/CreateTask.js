import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./tasks.css";
import TaskForm from "./NewTaskForm";

export default function CreateTask({ user }) {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    userId: user.id,
    taskDescription: "",
    points: "",
    completed: false,
  });

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const newTask = {
      userId: user.id,
      taskDescription: task.taskDescription,
      points: parseInt(task.points),
      completed: false,
    };
    return fetch(`http://localhost:8088/tasks?userId=${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then(() => {
      window.alert("You got this!");
      navigate("/");
    });
  };
  return (
    <>
      <TaskForm
        key={task.id}
        onSubmit={onFormSubmit}
        task={task}
        setTask={setTask}
      />
    </>
  );
}
