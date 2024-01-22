import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const RewardsForm = ({ reward, setReward, submitReward }) => {
  return (
    <>
      <Card className="reward-form">
        <Card.Header className="reward__header">
          <h2>Add New reward</h2>
        </Card.Header>
        <Card.Body className="reward__list">
          <form>
            <fieldset>
              <div className="reward__list">
                <label htmlFor="rewardDescription">Reward Description:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="short reward description"
                  value={reward.rewardsDescription}
                  onChange={(e) => {
                    setReward({
                      ...reward,
                      rewardsDescription: e.target.value,
                    });
                  }}
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="rewards__list">
                <label htmlFor="reward-points">Enter Point Value:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="point value"
                  value={reward.points}
                  onChange={(e) => {
                    setReward({ ...reward, points: e.target.value });
                  }}
                />
              </div>
            </fieldset>
            <Button
              type="submit"
              value="Save"
              variant="primary"
              onClick={submitReward}
            >
              Save
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};
