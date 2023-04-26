import { click } from "@testing-library/user-event/dist/click"
import { useState } from "react"
import { json, useNavigate } from "react-router-dom"

export const TaskForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [task, update] = useState({
        taskDescription: "",
        setPoints: "",
        expireOnDate: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the task list
    */

    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const taskToSendToAPI = {
            userId: cookijarUserObject.id,
            taskDescription: task.taskDescription,
            setPoints: task.setPoints,
            expireOnDate: task.expireOnDate
        }
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tasks")
            })
    }

    return (
        <form className="taskForm">
            <h2 className="taskForm__title">New Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="taskDescription">Task Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Task description"
                        value={task.description}
                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
                  
            <fieldset>
                <div className="form-group">
                    <label htmlFor="expire">Expiration:</label>
                    <input type="time" id="expire" name="expire" min="09:00" max="18:00" required
                        value={task.expireOnDate}
                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.expireOnDate = evt.target.checked
                                update(copy)
                                handleSaveButtonClick(evt)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="submit">
                Submit
            </button>
        </form>
    )
}