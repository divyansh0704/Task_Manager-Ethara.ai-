import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from "./AppRoutes"
import { AuthProvider } from './features/Auth/AuthContext'
import { ProjectProvider } from './features/projects/ProjectContext'
import { TaskProvider } from './features/tasks/TaskContext'

const App = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <RouterProvider router={router} />
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>

  )
}

export default App
