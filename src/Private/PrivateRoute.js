import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('userID') !== undefined;
    console.log("LOCAL STORAGE USER ID, ", localStorage.getItem('userID'))
    console.log("ESTA AUTENTICADO, ",isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;