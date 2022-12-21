import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const isAuthenticated = true
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute;