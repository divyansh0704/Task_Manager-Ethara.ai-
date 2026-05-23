import React from 'react'
import "../styles/tasks.css"
import { useState } from 'react';
import { Calendar, SquarePlus, Search, X, Folder, Layers } from 'lucide-react';
import { useTask } from '../hooks/useTask';
import { useNavigate } from 'react-router-dom';


const Tasks = () => {
    
    const { loadingT, tasks } = useTask();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const navigate = useNavigate();

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            // || task._id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =  task.status === statusFilter || statusFilter === 'ALL' ;
        return matchesSearch && matchesStatus;
    });
    if(loadingT){
        <main><h1>Loading...</h1></main>
    }
    return (
        <div className="tasks-page-container">
            {/* Upper Module Heading */}
            <div className="tasks-page-header">
                <div>
                    <h1>Task Matrix</h1>
                    <p>Execute, filter, and audit cross-project engineering units.</p>
                </div>
                <button onClick={()=>{navigate("/createtask")}} className="btn-create-task">
                    <SquarePlus size={18} />
                    <span>New Task</span>
                </button>
            </div>

            {/* Control Search & Filter Command Panel */}
            <div className="tasks-control-bar">
                <div className="search-box-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search by task name, identifier, or parent project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {
                        //   searchQuery && 
                        (
                            <X className="clear-icon" size={18} />
                        )}
                </div>

                <div className="filter-select-group">
                    <button
                        className={`filter-badge-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('ALL')}
                    >
                        All ({tasks.length})
                    </button>
                    <button
                        className={`filter-badge-btn ${statusFilter === 'IN PROGRESS' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('IN PROGRESS')}
                    >
                        In Progress
                    </button>
                    <button
                        className={`filter-badge-btn ${statusFilter === 'OVERDUE' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('OVERDUE')}
                    >
                        Overdue
                    </button>
                    <button
                        className={`filter-badge-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('COMPLETED')}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {/* Dynamic Data Container Viewports */}
            <div className="tasks-view-wrapper">
                {filteredTasks.length === 0 ? (
                    <div className="tasks-empty-state">
                        <Layers className="empty-icon" size={48} />
                        <h4>No tasks found</h4>
                        <p>Refine your search parameters or construct a new actionable unit.</p>
                    </div>
                ) : (
                    <>
                        {/* 🖥️ DESKTOP VIEWPORT: High-Density Structured Table Layout */}
                        <div className="tasks-desktop-table-view">
                            <table className="tasks-data-table">
                                <thead>
                                    <tr>
                                        <th>Identifier</th>
                                        <th>Task Details</th>
                                        <th>Parent Project</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Assignee</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map((task,index) => (
                                        <tr key={task._id} onClick={() => navigate(`/tasks/${task._id}`)} className="table-row-item">
                                            <td className="task-id-cell">{index+1}</td>
                                            <td className="task-title-cell">
                                                <div className="title-text-truncation" title={task.title}>{task.title}</div>
                                            </td>
                                            <td className="task-project-cell">{task.project.title}</td>
                                            <td>
                                                <span className={`priority-tag ${task.priority.toLowerCase().replace(' ', '-')}`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${task.status.toLowerCase().replace(' ', '-')}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="assignee-cell-wrapper">
                                                    <div className="assignee-avatar">{task.assignedTo.name.charAt(0).toUpperCase()}</div>
                                                    <span>{task.assignedTo.name}</span>
                                                </div>
                                            </td>
                                            <td className="date-cell">{task.dueDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 📱 MOBILE VIEWPORT: Component Stack Card Layout */}
                        <div className="tasks-mobile-stack-view">
                            {filteredTasks.map((task) => (
                                <div key={task._id} className="task-mobile-card">
                                    <div className="mobile-card-top-row">
                                        <span className="mobile-task-id">{task._id}</span>
                                        <span className={`status-pill ${task.status.toLowerCase().replace(' ', '-')}`}>
                                            {task.status}
                                        </span>
                                    </div>

                                    <h3 className="mobile-task-title">{task.title}</h3>
                                    <p className="mobile-task-project">
                                        <Folder size={14} /> {task.project.title}
                                    </p>

                                    <div className="mobile-card-meta-divider"></div>

                                    <div className="mobile-card-bottom-row">
                                        <div className="mobile-assignee">
                                            <div className="assignee-avatar">{task.assignedTo.name.charAt(0).toUpperCase()}</div>
                                            <span>{task.assignedTo.name}</span>
                                        </div>
                                        <div className="mobile-date">
                                            <Calendar size={14} />
                                            <span>{task.dueDate}</span>
                                        </div>
                                    </div>

                                    <div className="mobile-priority-ribbon">
                                        <span className={`priority-tag ${task.priority.toLowerCase().replace(' ', '-')}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Tasks