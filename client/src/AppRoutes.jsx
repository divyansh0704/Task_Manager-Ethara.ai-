import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "./features/Auth/pages/Login"
import Register from "./features/Auth/pages/Register"

import DashboardHome from "./shared/pages/DashboardHome"
import Protected from "./shared/components/Protected"
import Project from "./features/projects/pages/Project"
import CreateProject from "./features/projects/pages/CreateProject"
import Tasks from "./features/tasks/pages/Tasks"
import CreateTask from "./features/tasks/pages/CreateTask"
import DashboardLayout from "./shared/pages/DashboardLayout"
import TaskDescription from "./features/tasks/pages/TaskDescription"
// import ProjectOutlet from "./features/projects/pages/ProjectOutlet"


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />

    },

    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element:<Protected><DashboardHome /></Protected> 
            },
            {
                path: "dashboard",
                element:<Protected><DashboardHome /></Protected> 
            },
            {
                path: "projects",
                element:<Protected><Project /></Protected> 
            },
            {
                path: "tasks",
                element:<Protected> <Tasks /></Protected>
            },
            {
                path: "createtask",
                element: <Protected><CreateTask />  </Protected> 
            },
            {
                path: "addproject",
                element:<Protected><CreateProject /></Protected> 
            },
            {
                path: "tasks/:taskId",
                element: <Protected> <TaskDescription/> </Protected>
            }
        ]
    }
])