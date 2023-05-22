import { createBrowserRouter, Navigate } from "react-router-dom";
import DefultLayout from "./components/DefultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";
import Task from "./views/Task";
import TaskForm from "./views/TaskForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/tasking" />
            },
            {
                path: '/tasking',
                element: <Task />
            },
            {
                path: '/tasking/new',
                element: <TaskForm />
            },
            {
                path: '/tasking/:id',
                element: <TaskForm />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <Notfound />
    },
])

export default router;