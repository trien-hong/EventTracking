import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserAuthContext from '../contexts/UserAuthContext';

function PrivateRoute() {
    const { user } = useContext(UserAuthContext)

    return user ? <Outlet/> : <Navigate to="/login/"/>;
}

export default PrivateRoute;