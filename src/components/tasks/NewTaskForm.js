import { Button, Container, Form, Card } from "react-bootstrap";
import "./tasks.css";

export default function TaskForm({ onSubmit, task, setTask, isGuest = false }) {
  return (
    <>
      <Container className="mt-4 mb-4">
        <Card className="mx-auto task__card">
          <Card.Header className="task__header">
            <Card.Text>
              {task.id ? 'Edit Task' : 'Add New Task'}
              {isGuest && <small className="text-muted"> (Guest Mode)</small>}
            </Card.Text>
          </Card.Header>
          <Card.Body>
            <Form className="task__form" onSubmit={onSubmit}>
              <fieldset>
                <div className="task__list">
                  <label htmlFor="taskDescription">Task Description:</label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-control"
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
                  <label htmlFor="points">Set Point Value:</label>
                  <select
                    name="points"
                    className="form-control"
                    value={task.points || "5"}
                    onChange={(e) => {
                      setTask({ ...task, points: e.target.value });
                    }}
                  >
                    <option value="">Select Points</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </fieldset>
              {isGuest && (
                <div className="alert alert-warning mt-3">
                  <small>
                    <i className="bi bi-info-circle"></i>
                    Guest mode: This task won't be permanently saved
                  </small>
                </div>
              )}
              <div className="d-flex gap-2 mt-3">
                <Button
                  type="submit"
                  variant="outline-primary"
                >
                  {task.id ? 'Update Task' : 'Save Task'}
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}