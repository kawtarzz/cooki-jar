import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    const user = localStorage.getItem("cookijar_user")
    // const guestMode = localStorage.getItem("cookijar_guest_mode")
    //removed guest mode for now, but may add back in later if we want to allow users to use the app without creating an account
    if (user) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}