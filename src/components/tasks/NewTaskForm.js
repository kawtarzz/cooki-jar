export default function TaskForm({ task, setTask, onSubmit }){ 
  return (
    <form>
    <label htmlFor="taskDescription">Task Description:</label>
      <input type="text" name="taskDescription" value={task.taskDescription} onChange={(e) => {
        setTask({...task, taskDescription: e.target.value});
      }}/>
    
    <label htmlFor="points">Task Point Value:</label>
      <select id="points" name="points" value={task.points} onChange={(e) => {
        setTask({...task, points: parseInt(e.target.value)});}}>
        <option value="0">Select Points</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
         </select>
      <input type="submit" value="Save" onClick={onSubmit}/>
    </form>
  );
}