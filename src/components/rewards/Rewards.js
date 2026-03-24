import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RewardsList = ({ user, userPoints = 0 }) => {
  const [rewards, setRewards] = useState([]);

  const getMyRewards = () => {
    fetch(`http://localhost:8088/api/rewards`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rewards");
        return res.json();
      })
      .then(setRewards)
      .catch((err) => {
        console.error("Error fetching rewards:", err);
        window.alert("Error loading rewards. Please try again.");
      });
  };

  const redeemReward = (rewardId, pointsNeeded) => {
    if (userPoints < pointsNeeded) {
      window.alert("You don't have enough points to redeem this reward.");
      return;
    }

    fetch(`http://localhost:8088/api/rewards/${rewardId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redeemed: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to redeem reward");
        return res.json();
      })
      .then(() =>

        fetch(`http://localhost:8088/api/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userPoints: userPoints - pointsNeeded }),
        })
      )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update points");
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
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h2>Rewards</h2>
        {rewards.map((reward) => {
          if (reward.userId === user.id && reward.redeemed === false) {
            return (
              <Col key={reward.id}>
                <Card>
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
            );
          }
          return null;
        })}
      </Row>
    </Container>
  );
};

export default RewardsList;