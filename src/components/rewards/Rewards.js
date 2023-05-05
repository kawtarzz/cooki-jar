import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RewardsList = () => {
    // tickets holds an empty array, set tickets is our function, use state lets us view array in current state
    const [rewards, setRewards] = useState([]);
    const navigate = useNavigate()

    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject= JSON.parse(localcookiJarUser);


    useEffect(
        () => {
            fetch(`http://localhost:8088/rewards`)
                .then(response => response.json())
                .then((rewards) => {
                    setRewards(rewards)
                });
        },
        [] // When this array is empty, you are observing initial component state
    );

    return (
    <>
            
            <h2>Rewards</h2>
            <article className="rewards">
                {
                    rewards.map(
                        reward => {
                            return <section className="reward" key={`reward--${reward.id}`}>
                                <header> {reward.rewardsName}</header>
                                <footer>
                                    Points Needed: {reward.setPoints}
                                </footer>
                            </section> 

                        }
                    )
                }
            </article>
        </>)
}

// if task.completed = true user.points = x + task.points 

