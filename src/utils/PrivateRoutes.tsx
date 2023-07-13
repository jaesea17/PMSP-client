import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    let auth = { 'token': localStorage.getItem('token') }

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}
