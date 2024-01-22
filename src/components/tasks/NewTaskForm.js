import Button from "react-bootstrap/Button";
import { useState } from "react";

import "./tasks.css";
import Card from "react-bootstrap/Card";

export default function TaskForm({ onSubmit, task, setTask }) {
  return (
    <>
      <Card className="task-form">
        <Card.Header className="task__header">
          <h2>Add New task</h2>
        </Card.Header>
        <Card.Body className="task__list">
          <form>
            <fieldset>
              <div className="task__list">
                <label htmlFor="taskDescription">Task Description:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="short task description"
                  value={task.taskDescription}
                  onChange={(e) => {
                    setTask({ ...task, taskDescription: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="task__list">
                <label htmlFor="points">Set Point Value:</label>
                <select
                  name="points"
                  placeholder="Select Points"
                  value={task.points}
                  onChange={(e) => {
                    setTask({ ...task, points: e.target.value });
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </fieldset>
            <Button
              type="submit"
              value="Save"
              variant="primary"
              onClick={onSubmit}
            >
              Save
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}
