import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './views/Home';
import GuestLayout from './layouts/GuestLayout';
import Login from './views/Login';
import Register from './views/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './views/admin/Dashboard';
import Page404 from './views/Page404';
import Surveys from './views/admin/Surveys';
import Polls from './views/admin/Polls';
import PolicyFeedback from './views/admin/PolicyFeedback';

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
            },
            {
                path:'/guest',
                element:<Login/>
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
            },
            {
                path : 'surveys',
                element : <Surveys />
            },
            {
                path : 'polls',
                element : <Polls />
            },
            {
                path : 'policy_feedbacks',
                element : <PolicyFeedback />
            }
        ]
    },
    {
        path : '*',
        element : <Page404 />   
    }
]);

export default router; 