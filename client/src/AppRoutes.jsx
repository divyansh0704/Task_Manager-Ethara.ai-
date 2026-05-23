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
        element: <Protected><DashboardLayout /></Protected>,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: "dashboard",
                element: <DashboardHome />
            },
            {
                path: "projects",
                element: <Project />
            },
            {
                path: "tasks",
                element: <Tasks />
            },
            {
                path: "createtask",
                element:  <CreateTask />  
            },
            {
                path: "addproject",
                element: <CreateProject />
            },
            {
                path: "tasks/:taskId",
                element:  <TaskDescription/> 
            }
        ]
    }
])