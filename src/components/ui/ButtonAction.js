import { ButtonGroup, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';

export const ButtonAction = () => {
  return (
    <>
      <Container>
        <Button
          variant="primary"
          href="/tasks">
          Tasks
        </Button>
        <Button variant="success"
          href="/rewards"> Rewards</Button>
        <hr></hr>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            href="/tasks/new"
            size="lg"
          >
            + New Task
          </Button>
        </ButtonGroup>
      </Container>
    </>
  )
}