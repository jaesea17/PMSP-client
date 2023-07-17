import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    let auth = { 'admintoken': localStorage.getItem('admintoken') }

    return (
        auth.admintoken ? <Outlet /> : <Navigate to='/admin/login' />
    )
}
