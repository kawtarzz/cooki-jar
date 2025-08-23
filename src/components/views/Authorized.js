import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    const user = localStorage.getItem("cookijar_user")
    const guestMode = localStorage.getItem("cookijar_guest_mode")

    if (user || guestMode) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}