import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    const cookijar_user = localStorage.getItem("cookijar_user")
    const cookijar_guest = localStorage.getItem("cookijar_guest")

    if (cookijar_user || cookijar_guest) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}

