import { useEffect, useState } from "react"
import "./Tasks.css"

export const TaskList = () => {
    // tickets holds an empty array, set tickets is our function, use state lets us view array in current state
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [completed, setCompleted] = useState(false)

    const localcookiJarUser = localStorage.getItem("cookijar_user")
    const cookijarUserObject = JSON.parse(localcookiJarUser)

    useEffect(() => {
        fetch(`http://localhost:8088/tasks`)
            .then(response => response.json())
            .then((tasks) => { setTasks(tasks) });
    }, [])

    useEffect(() => {
        if (completed === true) {
            const incompleteTasks = filteredTasks.filter(filteredTask => filteredTask.completed === false)
            setTasks(incompleteTasks)
        } else {
            setCompleted(tasks)
        }
    }, [tasks])

    useEffect(() => {
        if (cookijarUserObject === true) {
            const myTasks = filteredTasks.filter(filteredTask => filteredTask.userId === parseInt(cookijarUserObject.id))
            setFilteredTasks(myTasks)
        } else { setFilteredTasks(tasks) }
    }, [filteredTasks])

    return (
        <>
        <div id="task__divListBlock">
            <h2>Hello, {cookijarUserObject.name}!</h2>
            {tasks.map(task => <div id="task__divListRow" className="task" key={task.id}>
                <article>

                            <h3> {task.taskDescription}</h3>
                            <p>Point Value: {task.points}</p>
                            <button className="task__delete">Delete</button>
                </article>
            </div>)}
                    </div>
        </>
    )
}

