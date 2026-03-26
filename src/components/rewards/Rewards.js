import { useCallback, useEffect, useState } from "react";
import { Row, Col, Card, Container, Button, Alert } from "react-bootstrap";
import { API_ENDPOINTS } from "../../api/config";
import { useNavigate } from "react-router-dom";

const RewardsList = ({ user, userPoints }) => {
  const [rewards, setRewards] = useState([]);
  const navigate = useNavigate();

  const getMyRewards = useCallback(() => {
    fetch(API_ENDPOINTS.REWARDS + `?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rewards");
        return res.json();
      })
      .then((rewardsData) => {
        const unredeemedRewards = rewardsData.filter(
          (reward) => reward.userId === user.id && reward.redeemed === false
        );
        setRewards(unredeemedRewards);
      })
      .catch((err) => {
        console.error("Error fetching rewards:", err);
        window.alert("Error loading rewards. Please try again.");
      });
  }, [user.id]);

  const redeemReward = (rewardId, pointsNeeded) => {
    if (userPoints < pointsNeeded) {
      window.alert("You don't have enough points to redeem this reward.");
      return;
    }

    fetch(API_ENDPOINTS.REWARDS + `/${rewardId}/redeem`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to redeem reward");
        return res.json();
      })
      .then(() => {
        window.alert("You have redeemed this reward!");
        getMyRewards();
      })
      .catch((err) => {
        console.error("Error redeeming reward:", err);
        window.alert("Error redeeming reward. Please try again.");
      });
  };

  useEffect(() => {
    getMyRewards();
  }, [getMyRewards]);

  return (
    <Container fluid className="rewards__container">
      <h2 className="section-title">Rewards</h2>
      <Row className="justify-content-md-center rewards__row">
        {rewards.length === 0 ? (
          <Alert variant="success" className="text-center">
            <Card.Img variant="top" src="/assets/celebration.png" style={{ width: "150px", margin: "0 auto" }} />
            <Card.Title>Hi {user.name}! You don't have any rewards to redeem yet.</Card.Title>
            <Card.Text>Add rewards to redeem your points! 🎉</Card.Text>
            <Button variant="primary" onClick={() => navigate("/rewards/new")}>
              Add New Reward
            </Button>
          </Alert>
        ) : (
          rewards.map((reward) => (
            <Col key={reward.id}>
              <Card className="reward__card">
                <Card.Title>
                  <h5>{reward.rewardsDescription}</h5>
                </Card.Title>
                <Card.Text>{reward.points} points</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => redeemReward(reward.id, reward.points)}
                >
                  Redeem
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
export default RewardsList;
