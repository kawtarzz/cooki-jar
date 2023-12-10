import NavigationBar from "../Navbar";
import Header from "../ui/Header";
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import TaskList from "../tasks/TaskList";
import Rewards from '../rewards/Rewards';
import { Outlet } from 'react-router-dom';
import CreateTask from "../tasks/CreateTask"
import EditTask from "../tasks/EditTask"


export default function ApplicationViews() {
    const localcookiJarUser = localStorage.getItem("cookijar_user");
    const user = JSON.parse(localcookiJarUser);

    return (
        <>
            <div className="App">
                <NavigationBar user={user} />
                <Container fluid className="p-0">
                    <Routes>
                        <Route
                            path="/"
                            element={<Header user={user} />}
                        >
                            <Route index element={<Outlet />} />
                        </Route>
                        <Route path="/tasks/new" element={<CreateTask />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/:id" element={<EditTask />} />

                        <Route path="/rewards" element={<Rewards />} />
                    </Routes>
                </Container>
            </div >
        </>
    );
}

