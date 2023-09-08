import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function RewardsList() {
    // tickets holds an empty array, set tickets is our function, use state lets us view array in current state
    const [rewards, setRewards] = useState([]);
    const [points, setPoints] = useState([]);

    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser);

    const getMyRewards = () => {
        // fetch rewards
        fetch(`http://localhost:8088/rewards`)
            .then((response) => response.json())
            .then(setRewards)
    };

    const redeemReward = (id, points, pointsNeeded) => {
        if (points >= pointsNeeded) {
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

    return <><Card>

        {rewards.map(reward => {
            return <>
                <ul id={reward.id}>
                    <li>
                        Reward:
                        {reward.rewardsDescription}
                        <b>Points Needed:</b> {reward.points}</li>

                    <Button onClick={() => { redeemReward(reward.id, reward.points) }}>
                        Redeem Reward</Button>
                </ul>
            </>
        })}
    </Card>
    </>
}

// if task.completed = true user.points = x + task.points

// if user.points >= reward.points - delete reward & deduct points from user
