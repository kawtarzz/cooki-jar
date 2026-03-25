import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { API_ENDPOINTS } from "../../api/config";

const RewardsList = ({ user }) => {
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  // Get current user points from localStorage
  const getCurrentUserPoints = () => {
    const userPoints = user.points;
    setUserPoints(userPoints);

  }

  const getMyRewards = () => {
    fetch(API_ENDPOINTS.REWARDS + `?userId=${user.id}`)
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
      console.log('user points:', userPoints, 'points needed:', pointsNeeded);
      console.log('user:', user);
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
      .then((data) => {
        // Update user points in localStorage
        const updatedPoints = userPoints - pointsNeeded;
        localStorage.setItem(
          "cookijar_user",
          JSON.stringify({ ...user, points: updatedPoints })
        );
        setUserPoints(updatedPoints);
        window.alert("You have redeemed this reward!");
        window.location.reload();

      })
      .catch((err) => {
        console.error("Error redeeming reward:", err);
        window.alert("Error redeeming reward. Please try again.");
      });

  };

  useEffect(() => {
    getMyRewards();
    getCurrentUserPoints();
  }, []);

  return (
    <>
      <Container fluid className="rewards__container">
        <h2 className="section-title">Rewards</h2>
        <Row className="justify-content-md-center rewards__row">
          {rewards.map((reward) => {
            console.log("Reward:", reward);
            if (reward.userId === user.id && reward.redeemed === false) {
              return (
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
              );
            }
            return null;
          })}
        </Row>
      </Container>
    </>
  );
};

export default RewardsList;

// const getMyRewards = () => {
//   fetch(API_ENDPOINTS.REWARDS + `?userId=${user.id}`)
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to fetch rewards");
//       return res.json();
//     })
//     .then(setRewards)
//     .catch((err) => {
//       console.error("Error fetching rewards:", err);
//       window.alert("Error loading rewards. Please try again.");
//     });
// };

// const redeemReward = (reward, pointsNeeded) => {
//   if (userPoints < reward.points) {
//     window.alert("You don't have enough points to redeem this reward.");
//     return;
//   }

//   fetch(API_ENDPOINTS.REWARDS, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ redeemed: true }),
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to redeem reward");
//       return res.json();
//     })
//     .then(() =>
//       fetch(`${API_ENDPOINTS} / users / ${user.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userPoints: userPoints - pointsNeeded }),
//       })
//     )
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to update points");
//       return res.json();
//     })
//     .then(() => {
//       window.alert("You have redeemed this reward!");
//       getMyRewards();
//     })
//     .catch((err) => {
//       console.error("Error redeeming reward:", err);
//       window.alert("Error redeeming reward. Please try again.");
//     });
// };