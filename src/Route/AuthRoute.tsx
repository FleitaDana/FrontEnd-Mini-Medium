import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
    const token = window.sessionStorage.getItem("token")
    return token ? (
        <Outlet/>
    ) : (
        <Navigate to="/SignIn" replace/>
    )
}

export default AuthRoute