import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Outlet } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import Button from "react-bootstrap/Button";
import CreateTask from "../tasks/CreateTask";
import RewardsList from "../rewards/Rewards";
import CreateReward from "../rewards/CreateReward";
import Alert from "react-bootstrap/Alert";
import "../../App.css";
import Col from "react-bootstrap/Col";

export default function Header({ user, isGuest = false }) {
  const [userPoints, setUserPoints] = useState(0);
  const [showTaskList, setShowTaskList] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRewardsList, setShowRewardsList] = useState(false);
  const [showRewardForm, setShowRewardForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyPoints = useCallback(() => {
    if (isGuest) {
      setUserPoints(25);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8088/api/users/${user.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user points');
        }
        return res.json();
      })
      .then((data) => {
        setUserPoints(data.userPoints || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching points:', error);
        setError(error.message);
        setLoading(false);
        setUserPoints(userPoints);
      });
  }, [isGuest, user, userPoints]);

  const awardPoints = (task) => {
    const newPoints = parseInt(userPoints) + parseInt(task.points);

    if (isGuest) {
      setUserPoints(newPoints);
      return;
    }

    const sendToApi = {
      userPoints: newPoints,
    };

    fetch(`http://localhost:8088/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendToApi),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update points');
        }
        return res.json();
      })
      .then(() => {
        getMyPoints();
      })
      .catch((error) => {
        console.error('Error updating points:', error);
        setUserPoints(newPoints);
      });
  };

  const handlePointsUpdate = (points) => {
    const newPoints = parseInt(userPoints) + parseInt(points);
    setUserPoints(newPoints);

    if (!isGuest) {
      const updatedUser = { ...user, userPoints: newPoints };
      localStorage.setItem('cookijar_user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    if (user) {
      getMyPoints();
    }
  }, [user, isGuest, getMyPoints]);

  const handleTaskListClick = () => {
    setShowTaskList(!showTaskList);
    setShowTaskForm(false);
    setShowRewardsList(false);
    setShowRewardForm(false);
  };

  const handleNewTaskClick = () => {
    setShowTaskForm(!showTaskForm);
    setShowTaskList(false);
    setShowRewardsList(false);
    setShowRewardForm(false);
  };

  const handleRewardsClick = () => {
    setShowRewardsList(!showRewardsList);
    setShowTaskList(false);
    setShowTaskForm(false);
    setShowRewardForm(false);
  };

  const handleNewRewardClick = () => {
    setShowRewardForm(!showRewardForm);
    setShowTaskList(false);
    setShowTaskForm(false);
    setShowRewardsList(false);
  };

  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <>
      <div className="home section">
        <ListGroup>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>
                  {user.name}'s To-Do List
                  {isGuest && <span className="badge bg-info ms-2">Guest Mode</span>}
                </h1>
                <h3>
                  You have {loading ? '...' : parseInt(userPoints)} points!
                  {isGuest && <small className="text-muted"> (Demo)</small>}
                </h3>
              </div>
              {error && (
                <Alert variant="warning" className="mb-0">
                  <small>Unable to sync points: {error}</small>
                </Alert>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>

        {isGuest && (
          <Alert variant="info" className="mt-3">
            <strong>Welcome to Guest Mode!</strong> You're exploring a demo version of Cookie Jar.
            Your changes won't be permanently saved.
            <a href="/login" className="alert-link ms-2">Create an account to save your progress!</a>
          </Alert>
        )}

        <Outlet />

        <Container fluid className="p-0">
          <Col>
            <div className="d-flex gap-2 mb-3 flex-wrap">
              <Button
                variant={showTaskForm ? "primary" : "outline-primary"}
                onClick={handleNewTaskClick}
              >
                + New Task
              </Button>

              <Button
                variant={showTaskList ? "success" : "outline-success"}
                onClick={handleTaskListClick}
              >
                Tasks
              </Button>

              <Button
                variant={showRewardForm ? "warning" : "outline-warning"}
                onClick={handleNewRewardClick}
              >
                + New Reward
              </Button>

              <Button
                variant={showRewardsList ? "info" : "outline-info"}
                onClick={handleRewardsClick}
              >
                Rewards
              </Button>
            </div>

            {showTaskForm && (
              <div className="mb-4">
                <CreateTask user={user} isGuest={isGuest} />
              </div>
            )}

            {showTaskList && (
              <div className="mb-4">
                <TaskList
                  user={user}
                  isGuest={isGuest}
                  onPointsUpdate={handlePointsUpdate}
                  awardPoints={awardPoints}
                  getMyPoints={getMyPoints}
                />
              </div>
            )}

            {showRewardForm && (
              <div className="mb-4">
                <CreateReward user={user} isGuest={isGuest} />
              </div>
            )}

            {showRewardsList && (
              <div className="mb-4">
                <RewardsList user={user} isGuest={isGuest} userPoints={userPoints} />
              </div>
            )}
          </Col>
        </Container>
      </div>
    </>
  );
}