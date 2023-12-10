import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const RewardsList = () => {
    const [rewards, setRewards] = useState([]);
    const [myPoints, setMyPoints] = useState(0);
    const pointsNeeded = rewards.points;

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser);

    const getMyRewards = () => {
        fetch(`http://localhost:8088/rewards`)
            .then((response) => response.json())
            .then(setRewards)
    };

    const getMyPoints = () => {
        fetch(`http://localhost:8088/users/${cookijarUserObject.id}`)
            .then((res) => res.json())
            .then(res => JSON.stringify(setMyPoints(res.points)))
    }

    const redeemReward = (rewardId, myPoints, rewardPoints) => {
        if (myPoints >= rewardPoints) {
            fetch(`http://localhost:8088/rewards/${rewardId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    redeemed: true
                })
            }).then(() => {
                fetch(`http://localhost:8088/users/${cookijarUserObject.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        points: cookijarUserObject.points - rewardPoints
                    })
                }).then(() => {
                    getMyPoints()
                    getMyRewards()
                    window.alert("You redeemed a reward!")
                })
            })
        } else {
            window.alert("You don't have enough points for that reward!")
        }
    }
    useEffect(() => {
        getMyRewards()
    }, [])

    return (
        <>
            <h2>Rewards</h2>
            <Card className="rewards">
                {rewards.map((reward) => {
                    if (reward.userId === cookijarUserObject.id && reward.redeemed === false) {
                        return (
                            <Card.Body key={reward.id}>
                                <Card.Title>{reward.rewardsDescription}</Card.Title>
                                <Card.Text>{reward.points}</Card.Text>
                                <Button variant="primary" onClick={() => redeemReward(reward.id, myPoints, reward.points)}>Redeem</Button>
                            </Card.Body>
                        )
                    } else {
                        return null
                    }
                })}
            </Card>
        </>)
}


export default RewardsList;