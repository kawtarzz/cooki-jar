import { useState } from "react";
import { RewardsForm } from "./RewardsForm";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/config";

export default function CreateReward({ user }) {
  const navigate = useNavigate();

  const [reward, setReward] = useState({
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

    fetch(API_ENDPOINTS.REWARDS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rewardToSendToAPI),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create reward");
        return res.json();
      })
      .then(() => {
        window.alert("Reward created!");
        navigate("/rewards");
      })
      .catch((err) => {
        console.error("Error creating reward:", err);
        window.alert("Error creating reward. Please try again.");
      });
  };

  return (
    <RewardsForm
      reward={reward}
      setReward={setReward}
      submitReward={submitReward}
    />
  );
}