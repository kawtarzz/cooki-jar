import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

export default function TaskForm({ task, setTask, onSubmit }) {
  return (
    <center>
      <div className="notecard">
        <Card>

          <form>

            <Card.Header style={{ backgroundColor: "#ffffff" }}>
              <h3>Add New Task</h3>
            </Card.Header>

            <label htmlFor="taskDescription">
              <h5>Task Description:</h5>
            </label>
            <input type="text" name="taskDescription" value={task.taskDescription} onChange={(e) => {
              setTask({ ...task, taskDescription: e.target.value });
            }} />

            <label htmlFor="points"><h5>
              Task Point Value:</h5>
            </label>
            <select id="points" name="points" value={task.points} onChange={(e) => {
              setTask({ ...task, points: parseInt(e.target.value) });
            }}>
              <option value="0">Select Points</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>

            <br></br>
            <label htmlFor="startDate">
              <h5>
                Date to Start:
              </h5>
            </label>
            <input type="date" name="startDate" value={task.startDate} onChange={(e) => {
              setTask({ ...task, startDate: e.target.value });
            }} /><br></br>
            <Button type="submit" value="Save" onClick={onSubmit}>Save</Button>

          </form>
        </Card>
      </div>
    </center>

  );
}