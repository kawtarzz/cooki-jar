import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Outlet } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import Button from "react-bootstrap/Button";
import CreateTask from "../tasks/CreateTask";
import RewardsList from "../rewards/Rewards";
import CreateReward from "../rewards/CreateReward";
import "../../App.css";

export default function Header({ user }) {
  const [userPoints, setUserPoints] = useState(0);
  const [showTaskList, setShowTaskList] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRewardsList, setShowRewardsList] = useState(false);
  const [showRewardForm, setShowRewardForm] = useState(false);

  const getMyPoints = () => {
    fetch(`http://localhost:8088/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPoints(data.userPoints);
      });
  };

  const awardPoints = (task) => {
    const sendToApi = {
      userPoints: parseInt(userPoints) + parseInt(task.points),
    };
    fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendToApi),
    }).then(() => {
      getMyPoints();
    });
  };

  useEffect(() => {
    getMyPoints();
  }, []);

  const handleTaskListClick = () => {
    setShowTaskList(!showTaskList);
  };

  const handleNewTaskClick = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleRewardsClick = () => {
    setShowRewardsList(!showRewardsList);
  };

  const handleNewRewardClick = () => {
    setShowRewardForm(!showRewardForm);
  };

  return (
    <>
      <div className="header container">
        <ListGroup>
          <ListGroup.Item>
            <h1>{user.name}'s To-Do List</h1>
            <h3>You have {parseInt(userPoints)} points!</h3>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="home section">
        <Outlet />
        <Button onClick={handleNewTaskClick}>+ New Task</Button>
        {showTaskForm && <CreateTask user={user} />}
        <Button onClick={handleTaskListClick}>Tasks</Button>
        {showTaskList && (
          <TaskList
            user={user}
            awardPoints={awardPoints}
            getMyPoints={getMyPoints}
          />
        )}
        <Button onClick={handleNewRewardClick}>+ New Reward</Button>
        {showRewardForm && <CreateReward user={user} />}
        <Button onClick={handleRewardsClick}>Rewards</Button>
        {showRewardsList && <RewardsList user={user} />}
      </div>
    </>
  );
}
