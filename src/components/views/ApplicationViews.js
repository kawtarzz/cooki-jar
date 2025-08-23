import NavigationBar from "../Navbar";
import Header from "../ui/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import RewardsList from "../rewards/Rewards";
import { Outlet } from "react-router-dom";
import CreateTask from "../tasks/CreateTask";
import EditTask from "../tasks/EditTask";
import { useEffect, useState } from "react";
import CreateReward from "../rewards/CreateReward";

export default function ApplicationViews() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const guestMode = localStorage.getItem("cookijar_guest_mode");

    if (localcookiJarUser) {
      const parsedUser = JSON.parse(localcookiJarUser);
      setUser(parsedUser);
      setIsGuest(guestMode === 'true');
      console.log('User:', parsedUser, 'Guest mode:', guestMode === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cookijar_user");
    localStorage.removeItem("cookijar_guest_mode");
    setUser(null);
    setIsGuest(false);
    window.location.href = '/login';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="App">
        <NavigationBar
          user={user}
          isGuest={isGuest}
          onLogout={handleLogout}
        />
        <Container fluid className="p-0">
          {isGuest && (
            <div className="alert alert-info text-center">
              You're in Guest Mode. Your changes won't be saved permanently.
            </div>
          )}
          <Routes>
            <Route path="/" element={<Header user={user} />}>
              <Route index element={<Outlet />} />
            </Route>
            <Route path="/tasks/new" element={<CreateTask user={user} isGuest={isGuest} />} />
            <Route path="/tasks" element={<TaskList user={user} isGuest={isGuest} />} />
            <Route path="/tasks/:id" element={<EditTask user={user} isGuest={isGuest} />} />

            <Route path="/rewards" element={<RewardsList user={user} isGuest={isGuest} />} />
            <Route
              path="/createreward"
              element={<CreateReward user={user} isGuest={isGuest} />}
            />
          </Routes>
        </Container>
      </div>
    </>
  );
}