import { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const RewardsList = ({ setPoints, points }) => {
    const [rewards, setRewards] = useState([]);
    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser);

    const getMyRewards = () => {
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
                .then(() => {
                    getMyRewards()
                        .then(() => {
                            getMyRewards()
                        }).then(() => {
                            setPoints(points - pointsNeeded)
                        })
                })
        } else {
            window.alert("You don't have enough points for this reward.")
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
                    <Card.Footer>
                        <Button onClick={() => { redeemReward(reward.id, reward.points) }}>
                            Redeem Reward</Button>
                    </Card.Footer>
                </Card >
            ))}
        </>
    )
}


export default RewardsList;