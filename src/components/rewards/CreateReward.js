import { useState } from "react";
import { RewardsForm } from "./RewardsForm";
import { useNavigate } from "react-router-dom";

export default function CreateReward({ user }) {
  const navigate = useNavigate();

  const [reward, update] = useState({
    userId: user.id,
    rewardsDescription: "",
    points: "",
    redeemed: false,
  });

  const submitReward = (event) => {
    event.preventDefault();

    const rewardToSendToAPI = {
      userId: user.id,
      rewardsDescription: reward.rewardsDescription,
      points: parseInt(reward.points),
      redeemed: false,
    };
    return fetch(`http://localhost:8088/rewards?userId=${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rewardToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      {" "}
      <div className="reward__header">
        <RewardsForm
          reward={reward}
          setReward={update}
          submitReward={submitReward}
        />
      </div>
    </>
  );
}
