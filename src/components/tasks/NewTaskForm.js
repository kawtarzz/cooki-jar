import { Button, Container, Form, Card } from "react-bootstrap";
import "./tasks.css";

export default function TaskForm({ onSubmit, task, setTask }) {
  return (
    <>
      <Container className="mt-4 mb-4">
        <Card className="mx-auto task__card">
          <Card.Header className="task__header">
            <Card.Text>Add New task</Card.Text>
          </Card.Header>
          <Card.Body>
            <Form className="task__form">
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
                variant="outline-primary"
                onClick={onSubmit}
              >
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
