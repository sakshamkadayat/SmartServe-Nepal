import { createBrowserRouter, Navigate } from 'react-router-dom';

//layouts
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';

//new user 
import Login from './views/Login';
import Register from './views/Register';

//admin components import
import Dashboard from './views/admin/Dashboard';
import Polls from './views/admin/Polls';
import PolicyFeedback from './views/admin/PolicyFeedback';

//error page
import Page404 from './views/Page404';

//user components import
import Home from './views/Home';
import PollsUser from './views/PollsUser';
import FeedbackUser from './views/FeedbackUser';

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
            },
            {
                path:'/polls',
                element:<PollsUser/>
            },
            {
                path:'/feedbacks',
                element: <FeedbackUser/>
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