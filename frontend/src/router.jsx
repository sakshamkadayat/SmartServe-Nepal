import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './views/Home';
import GuestLayout from './layouts/GuestLayout';
import Login from './views/Login';
import Register from './views/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './views/admin/Dashboard';
import Page404 from './views/Page404';

const router = createBrowserRouter([
    {
        path: '/',
        element : <DefaultLayout />,
        children : [
            {
                path : '/',
                element : <Home />
            },
            {
                path : '/home',
                element : <Navigate to="/" />
            }

        ]
    },
    {
        path: '/guest',
        element : <GuestLayout />,
        children : [
            {
                path : 'login',
                element : <Login />
            },
            {
                path : 'register',
                element : <Register />
            }
        ]
    },
    {
        path : '/admin',
        element : <AdminLayout />,
        children : [
            {
                path : 'dashboard',
                element : <Dashboard />
            }
        ]
    },
    {
        path : '*',
        element : <Page404 />   
    }
]);

export default router; 