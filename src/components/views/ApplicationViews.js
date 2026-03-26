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

  useEffect(() => {
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    if (localcookiJarUser) {
      const parsedUser = JSON.parse(localcookiJarUser);
      setUser(parsedUser);
    } else {
      setUser(null);
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cookijar_user");
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <>
      <div className="App">
        <NavigationBar
          user={user}
          onLogout={handleLogout}
        />
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Header user={user} />}>
              <Route index element={<Outlet />} />
            </Route>
            <Route path="/tasks/new" element={<CreateTask user={user} />} />
            <Route path="/tasks" element={<TaskList user={user} />} />
            <Route path="/tasks/:id" element={<EditTask user={user} />} />

            <Route path="/rewards" element={<RewardsList user={user} />} />
            <Route
              path="/rewards/new"
              element={<CreateReward user={user} />}
            />
          </Routes>
        </Container>
      </div>
    </>
  );
}