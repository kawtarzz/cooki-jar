import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RewardsList = ({ user }) => {
  const [rewards, setRewards] = useState([]);
  const myPoints = user.userPoints;

  const getMyRewards = () => {
    fetch(`http://localhost:8088/rewards`)
      .then((response) => response.json())
      .then(setRewards);
  };

  const redeemReward = (rewardId, pointsNeeded) => {
    console.log(rewardId, pointsNeeded, myPoints);
    if (myPoints >= pointsNeeded) {
      fetch(`http://localhost:8088/rewards/${rewardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redeemed: true,
        }),
      })
        .then(() => {
          fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userPoints: myPoints - pointsNeeded,
            }),
          });
        })
        .then(() => {
          getMyRewards();
        });
      window.alert("You have redeemed this reward!");
    } else {
      alert("You don't have enough points to redeem this reward.");
    }
  };
  useEffect(() => {
    getMyRewards();
  }, []);

  return (
    <>
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

                    <Card.Text>
                      <p>{reward.points}</p>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => redeemReward(reward.id, reward.points)}
                    >
                      Redeem
                    </Button>
                  </Card>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </Container>
    </>
  );
};

export default RewardsList;
