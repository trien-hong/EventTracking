import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserAuthContext from '../contexts/UserAuthContext';

function PrivateRoute() {
    const { user } = useContext(UserAuthContext)

    return user ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute;