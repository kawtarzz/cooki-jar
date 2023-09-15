import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const RewardsList = ({ setPoints, points }) => {
    const [rewards, setRewards] = useState([]);

    const getMyRewards = () => {
        fetch(`http://localhost:8088/rewards`)
            .then((response) => response.json())
            .then(setRewards)
    };

    const redeemReward = (id, pointsNeeded) => {
        if (points > pointsNeeded) {
            fetch(`http://localhost:8088/rewards/${id}`, {
                method: "DELETE",
            }).then((res) => res.json())
                .then(() => {
                    getMyRewards()
                }).then(() => {
                    setPoints(points - pointsNeeded)
                })
        } else {
            alert('Not enough points!')
        }
    }
    useEffect(() => {
        getMyRewards()
    }, [])

    return (
        <>
            <h2>Rewards</h2>
            {rewards.map(reward => (
                <Card key={reward.id}>
                    <Card.Header> <h4> {reward.description} </h4>
                    </Card.Header>
                    <Card.Body>
                        Points Needed: {reward.points}
                    </Card.Body>
                    <Button onClick={() => { redeemReward(reward.id, reward.points) }}>
                        Redeem Reward</Button>
                </Card>
            ))}
        </>
    )
}
