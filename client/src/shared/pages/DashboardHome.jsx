import React, { useContext } from 'react';
import { ClipboardList, CheckCircle, Hourglass, XCircle } from 'lucide-react';
import "../styles/dashboard.css"
import { useAuth } from '../../features/Auth/hooks/useAuth';
import { useProject } from '../../features/projects/hooks/useProject';
import { useTask } from '../../features/tasks/hooks/useTask';
import { TaskContext } from '../../features/tasks/TaskContext';

const DashboardHome = () => {
  // const {tasks,loadingT} = useTask();
  const {tasks,loadingT}= useContext(TaskContext);
  
  const completedTasks = tasks.filter(task => task.status === "completed");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const overdueTasks = tasks.filter(task => task.status === "overdue");
  const todoTasks = tasks.filter(task => task.status === "todo");

  if(loadingT){
    <main><h1>Loading...</h1></main>
  }


  
  return (
    <div className="dashboard-home-view">
      <div style={{marginBottom:"24px"}} className="view-welcome-banner">
        <h1 >Welcome Back, Alex.</h1>
        {/* <p>You have 4 tasks to focus on today across 2 active projects.</p> */}
      </div>

      {/* Metrics Dash Grid */}
      <div className="metrics-dashboard-grid">
        <div className="metric-card">
          <div className="metric-card-header">
            <ClipboardList size={24} className="text-blue" />
            {/* <span className="trend-percentage positive">+12%</span> */}
          </div>
          <div className="metric-value">{tasks.length}</div>
          <div className="metric-label">Total Tasks</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-header">
            <CheckCircle size={24} className="text-green" />
            {/* <span className="trend-percentage positive">+8%</span> */}
          </div>
          <div className="metric-value">{completedTasks.length}</div>
          <div className="metric-label">Completed</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-header">
            <Hourglass size={24} className="text-amber" />
            {/* <span className="trend-percentage stable">Stable</span> */}
          </div>
          <div className="metric-value">{todoTasks.length}</div>
          <div className="metric-label">Pending </div>
        </div>
        <div className="metric-card">
          <div className="metric-card-header">
            <XCircle size={24} className="text-red" />
            {/* <span className="trend-percentage negative">-2%</span> */}
          </div>
          <div className="metric-value">{overdueTasks.length}</div>
          <div className="metric-label">Overdue Tasks</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;