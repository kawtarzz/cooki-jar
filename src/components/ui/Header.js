import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import CreateTask from "../tasks/CreateTask";
import RewardsList from "../rewards/Rewards";
import CreateReward from "../rewards/CreateReward";
import { API_ENDPOINTS } from "../../api/config";

export default function Header({ user }) {
  const [userPoints, setUserPoints] = useState(0);
  const [activeTab, setActiveTab] = useState("taskList"); // Simplified state management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyPoints = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_ENDPOINTS.USERS}/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user points");
        return res.json();
      })
      .then((data) => {
        setUserPoints(data.userPoints || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (user) getMyPoints();
  }, [user, getMyPoints]);

  if (!user) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  // Helper to handle tab switching
  const toggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? "" : tabName);
  };

  return (
    <>
      <section className="page__home text-center">
        <h1 className="text-4xl font-extrabold">
          {user.name}'s To-Do List
        </h1>
        <h3 className="text-xl font-medium text-gray-600 mb-6">
          You have <span>{loading ? "..." : Math.floor(userPoints)}</span> points!
        </h3>

        {error && (
          <div className="mb-6 rounded-lg bg-yellow-50 p-3  border border-yellow-200">
            <strong>Note:</strong> Unable to sync points ({error})
          </div>
        )}

        <Outlet />

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => toggleTab("taskForm")}
            className="button-primary"
          >
            + New Task
          </button>

          <button
            onClick={() => toggleTab("taskList")}
            className="button-primary"
          >
            Tasks
          </button>

          <button
            onClick={() => toggleTab("rewardForm")}
            className="button-primary"
          >
            + New Reward
          </button>

          <button
            onClick={() => toggleTab("rewardsList")}
            className="button-primary"
          >
            Rewards
          </button>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 mt-10 bg-white rounded-lg shadow-md py-6 home__content">
        <div className="space-y-6">
          {activeTab === "taskForm" && <CreateTask user={user} />}
          {activeTab === "taskList" && <TaskList user={user} onPointsUpdate={getMyPoints} />}
          {activeTab === "rewardForm" && <CreateReward user={user} />}
          {activeTab === "rewardsList" && <RewardsList user={user} userPoints={userPoints} />}
        </div>
      </section>


    </>
  );
}