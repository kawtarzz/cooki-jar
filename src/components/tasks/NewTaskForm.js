import Button from 'react-bootstrap/Button';
import './tasks.css'
import Card from 'react-bootstrap/Card'

export default function TaskForm({ task, setTask, onSubmit, type, setType }) {

  return (<>
    <Card>
      <Card.Header className="task__header">
        <h2>Add New task</h2>
      </Card.Header>
      <Card.Body className="task__list">
        <form>
          <div className="task__list">
            <label htmlFor="taskDescription">
              Task Description:
            </label>
            <input
              required autoFocus
              type="text"
              className="form-control"
              placeholder="short task description"
              value={task.taskDescription}
              onChange={(e) => {
                setTask({ ...task, taskDescription: e.target.value })
              }} />
          </div>
          <Card.Header >
            <h3>Add New Task</h3>
          </Card.Header>
          <fieldset>
            <div className="task__list">
              <label htmlFor="type">
                Category/Type:
              </label>
              <select name="type"
                className="form-control"
                placeholder="Select task type"
                value={type.id}
                onChange={(e) => {
                  setType({ ...type, id: e.target.value });
                }}>
                <option value="0">Select Task Type</option>
                <option value="1">Errands</option>
                <option value="2">School</option>
                <option value="3">Work</option>
                <option value="4">Chores</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="task__list">
              <label htmlFor="points">Set Point Value:</label>
              <select name="points"
                placeholder="Select Points"
                value={task.points}
                onChange={(e) => {
                  setTask({ ...task, points: e.target.value });
                }}>
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="task__list">
              <label htmlFor="startDate">
                Date to Start:
              </label>
              <input
                required autoFocus
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={(e) => {
                  setTask({ ...task, startDate: e.target.value });
                }} />
            </div>
          </fieldset>
          <Button type="submit" value="Save" variant="primary"
            onClick={onSubmit}>Save</Button>
        </form>
      </Card.Body>
    </Card>
  </>
  );
}