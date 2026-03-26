import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./tasks.css";
import TaskForm from "./NewTaskForm";
import { API_ENDPOINTS } from "../../api/config";


export default function CreateTask({ user }) {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    userId: user.id,
    taskDescription: "",
    points: "",
    completed: false,
    id: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    try {
      const newTask = {
        userId: user.id,
        taskDescription: task.taskDescription,
        points: parseInt(task.points),
        completed: false,
        id: task.id,
      };
      return fetch(API_ENDPOINTS.TASKS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then((response) => {
        console.log("Create Task Response:", response);
        console.log("new Task", newTask);
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
        return response.json();
      }).then(() => {
        window.alert("You got this!");
        navigate("/tasks");
      })
        .catch((error) => {
          console.error("Error creating task:", error);
          window.alert("Error creating task. Please try again.");
        });
    } catch (error) {
      console.error("Error creating task:", error);
      window.alert("Error creating task. Please try again.");
    }


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
// const newTask = {
//   userId: user.id,
//   taskDescription: task.taskDescription,
//   points: parseInt(task.points),
//   completed: false,
//   id: task.id,
// };

// return fetch(API_ENDPOINTS.TASKS, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(newTask),
// }).then(response => {
//   if (!response.ok) {
//     throw new Error('Failed to create task');
//   }
//   return response.json();
// })
//   .then(() => {
//     window.alert("You got this!");
//     navigate("/");
//   })
//   .catch(error => {
//     console.error('Error creating task:', error);
//     window.alert("Error creating task. Please try again.");
//   });