import { click } from "@testing-library/user-event/dist/click"
import { useState } from "react"
import { json, useNavigate } from "react-router-dom"
import RewardsList from "./Rewards.js"

export const RewardsForm = () => {
    const navigate = useNavigate();
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const cookijarUserObject = JSON.parse(localcookiJarUser)
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [reward, update] = useState({
        rewardsDescription: "",
        pointsNeeded: "",
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the reward list
    */

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const rewardToSendToAPI = {
            userId: cookijarUserObject.id,
            rewardsDescription: reward.rewardsDescription,
            points: reward.points,
            redeemed: false
        }
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/rewards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rewardToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/rewards")
            })
    }

    return (

        <> <h2> Add New Reward</h2><div className="reward__header">
            {console.log("hello")}
            <RewardsForm
                reward={reward}

            />
        </div>

        </>

    )
}
