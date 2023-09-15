import { Outlet, Route, Routes } from "react-router-dom"

export default function ApplicationViews() {
    return <>
        <Routes>
            <Route path="/home" element={
                <>
                    <Outlet />
                </>}>
            </Route>
        </Routes >
    </>
}