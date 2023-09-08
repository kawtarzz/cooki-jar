import { useState } from "react"
import RewardsList from "./Rewards.js"

function CreateReward() {
  const navigate = useNavigate();
  const localcookiJarUser = localStorage.getItem("cookijar_user");
  const cookijarUserObject = JSON.parse(localcookiJarUser)
  /*
      TODO: Add the correct default properties to the
      initial state object
      */
  const [reward, update] = useState({
    userId: cookijarUserObject.id,
    rewardsDescription: "",
    points: "",
    redeemed: false,
  })
  /*
  TODO: Use the useNavigation() hook so you can redirect
  the user to the reward list
  */

  const submitReward = (event) => {
    event.preventDefault()

    // TODO: Create the object to be saved to the API

    const rewardToSendToAPI = {
      userId: cookijarUserObject.id,
      rewardsDescription: reward.description,
      points: parseInt(reward.points),
      redeemed: false
    }
    // TODO: Perform the fetch() to POST the object to the API
    return fetch(`http://localhost:8088/rewards?userId=${cookijarUserObject.id}`, {
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

    <> <div className="reward__header">

      {/* <RewardsForm
        reward={reward}
        setReward={update}

        submitReward={submitReward}
      /> */}
    </div>

    </>

  )
}


