import NavigationBar from "../Navbar";
import Header from "../ui/Header";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import RewardsList from "../rewards/Rewards";
import { Outlet } from "react-router-dom";
import CreateTask from "../tasks/CreateTask";
import EditTask from "../tasks/EditTask";
import { useEffect } from "react";
import CreateReward from "../rewards/CreateReward";

export default function ApplicationViews() {
  const localcookiJarUser = localStorage.getItem("cookijar_user");
  const user = JSON.parse(localcookiJarUser);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="App">
        <NavigationBar user={user} />
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Header user={user} />}>
              <Route index element={<Outlet />} />
            </Route>
            <Route path="/tasks/new" element={<CreateTask />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:id" element={<EditTask />} />

            <Route path="/rewards" element={<RewardsList user={user} />} />
            <Route
              path="/createreward"
              element={<CreateReward user={user} />}
            />
          </Routes>
        </Container>
      </div>
    </>
  );
}
