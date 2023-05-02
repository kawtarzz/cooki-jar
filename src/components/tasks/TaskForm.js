// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// const TaskForm = () => {
//     const [task, setTask] = useState({
//         userId: "",
//         taskDescription: "",
//         points: "",
//         completed: false
//     })

//     const navigate = useNavigate()
    
//     const localcookiJarUser = localStorage.getItem("cookijar_user")
//     const cookijarUserObject = JSON.parse(localcookiJarUser)


//     const handleSaveButtonClick = (event) => {
//         event.preventDefault()
        
//         // TODO: Create the object to be saved to the API
//         const taskToSendToAPI =  {
//             completed: task.completed,
//             userId: parseFloat(cookijarUserObject.id),
//             taskDescription: task.taskDescription,
//             points: parseInt(task.points),
//         }
//         // TODO: Perform the fetch() to POST the object to the API
//         return fetch(`http://localhost:8088/tasks`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(taskToSendToAPI)
//         })
//         .then(response => response.json())
//         .then(() => {
//             navigate("/tasks")
//         })
//     }

//     return (
//         <form className="taskForm">
//             <h2 className="taskForm__title">Create New Task</h2>
//             <fieldset>
               
//                 <div className="form-group">
//                     <label htmlFor="taskDescription">Task Description:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="Brief description of task"
//                         value={task.taskDescription}
//                         onChange={
//                             (evt) => {
//                                 const copy = { ...task }
//                                 copy.taskDescription = evt.target.value
//                                 setTask(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>

//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="points"> Task Point Value: </label>
//                     <select name="points" 
//                     className="form-control" placeholder="Task Point Value" 
//                         value={task.points} onChange={
//                             (evt) => {
//                                 const copy = { ...task}
//                                 copy.points = evt.target.value
//                                 setTask(copy)
//                             } }> 
//                         <option value="0">Select Points</option>
//                         <option value="5">5</option>
//                         <option value="10">10</option>
//                         <option value="15">15</option>
//                         <option value="20">20</option>
                     
//                             </select>
//                             </div>
//                 </fieldset>
//             <button
//                 onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
//                 className="submit">
//                 Submit
//             </button>
//         </form>
//     )
// }

// // export const createNewTask = (task) => {
// //     const localcookiJarUser = localStorage.getItem("cookijar_user")
// //     const cookijarUserObject = JSON.parse(localcookiJarUser)
// //     const newTaskObject = [{
// //         userId: parseFloat(cookijarUserObject.id),
// //         taskDescription: task.taskDescription,
// //         points: parseInt(task.points),
// //         completed: task.completed
// //     }]
// //     return fetch("http://localhost:8088/tasks", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(newTaskObject)
// //     })
// //         .then(response => response.json())
// //         .then(() => {
// //             const navigate = useNavigate()
// //             navigate("/tasks")
// //         })
// // }
