import { useState } from "react"
import RewardsList from "./Rewards.js"

function CreateReward({ reward, setReward, onSubmit }) {
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

    // TODO: Create the object to be saved to the API

    const rewardToSendToAPI = {
      userId: cookijarUserObject.id,
      rewardsDescription: reward.rewardsDescription,
      points: parseInt(reward.points),
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

    <> <div className="task__header">

      <RewardsForm
        reward={reward}
        setReward={setReward}

        onSubmit={onFormSubmit}
      />
    </div>

    </>

  )
}


