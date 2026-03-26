export default function TaskForm({ onSubmit, task, setTask }) {
  return (
    <>
      <div className="mx-auto task__section">
        <h3 className="task__header">{task.id ? 'Edit Task' : 'Add New Task'}</h3>
        <div className="task__card">
          <form className="" onSubmit={onSubmit}>
            <fieldset>
              <div className="task__list">
                <label htmlFor="taskDescription">Task Description:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="w-full form__text"
                  placeholder="Short task description"
                  value={task.taskDescription || ""}
                  onChange={(e) => {
                    setTask({ ...task, taskDescription: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="task__list">
                <label htmlFor="points" >Set Point Value:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 form__text"
                  placeholder="Enter Point Value"
                  value={task.points}
                  onChange={(e) => {
                    setTask({ ...task, points: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <div className="flex gap-2 mt-3 button__container">
              <button type="submit">
                {task.id ? 'Update Task' : 'Save Task'}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
