import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import '../styles/taskdescription.css';
import { ArrowLeft, MoreHorizontal, Calendar, ChevronDown, Pencil, Circle } from 'lucide-react';
import { useTask } from '../hooks/useTask';


const TaskDescription = () => {
    const { taskId } = useParams();
    const { task, handleGetTask, loading,handleUpdateTask } = useTask();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const statuses = ["todo", "in-progress", "overdue", "completed"];

    useEffect(() => {
        if(taskId && handleGetTask){
            handleGetTask(taskId);

        }
        


    }, [taskId]);
    if (loading) return (
        <div className="task-details-pane">
            <div className="task-pane-scroll-content">
                <h2>Loading task details...</h2>
            </div>
        </div>
    );
    if (!task) return (
        <div className="task-details-pane">
             <div className="task-pane-scroll-content">
                <h2>Task not found</h2>
                <button onClick={() => navigate('/tasks')}>Return to Matrix</button>
            </div>
        </div>
    );

    return (
        <div className="task-details-pane">
            
            <div className="task-pane-header">
                <button className="pane-back-btn" aria-label="Go back">
                    <ArrowLeft size={20} />
                </button>
                <div className="pane-title-brand">
                    <h2>{task.title}</h2>
                    {/* <span className="pane-sub-brand">{task.project.description}</span> */}
                </div>
                <button className="pane-options-btn" aria-label="More options">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Main Metadata & Body Wrapper */}
            <div className="task-pane-scroll-content">
                <div className="task-badges-row">
                    <span className={`priority-pill ${task.priority.toLowerCase().replace(' ', '-')}`}>
                        <span className="dot-indicator"></span>
                        {task.priority}
                    </span>
                    <span className={`status-text-indicator ${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                    </span>
                </div>

                <h1 className="task-main-heading">{task.project.title}</h1>

                <div className="task-description-card">
          <p>{task.project.description}</p>
        </div>

                {/* Technical Split Meta Grid */}
                <div className="task-meta-split-grid">
                    <div className="meta-block">
                        <span className="meta-block-label">ASSIGNEE</span>
                        <div className="meta-user-profile">
                            <div className="meta-user-avatar">
                                
                                    <span>{task.assignedTo.name.charAt(0).toUpperCase()}</span>
                            
                            </div>
                            <span className="meta-user-name">{task.assignedTo.email}</span>
                        </div>
                    </div>

                    <div className="meta-block">
                        <span className="meta-block-label">DUE DATE</span>
                        <div className="meta-date-display">
                            <Calendar className="calendar-icon" size={18} />
                            <span className="meta-date-text">{task.dueDate}</span>
                        </div>
                    </div>
                </div>

                {/* Action Status Selection Control */}
                <div className="status-dropdown-wrapper">
                    <button
                        className="btn-status-dropdown-trigger"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span>Update Status</span>
                        <ChevronDown className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} size={18} />
                    </button>

                    {dropdownOpen && (
                        <ul className="status-dropdown-menu">
                            {statuses.map((statusItem) => (
                                <li key={statusItem}>
                                    <button
                                        type="button"
                                        className={`dropdown-item-btn ${task.status === statusItem ? 'active-status' : ''}`}
                                        onClick={() => {
                                            if (handleUpdateTask) handleUpdateTask(task._id, { status: statusItem });
                                            setDropdownOpen(false);
                                            navigate('/tasks');
                                        }}
                                    >
                                        {statusItem}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Activity Logs History Timeline */}
                <div className="task-activity-section">
                    {/* <div className="activity-section-header">
                        <h3>Activity</h3>
                        <button className="view-all-link-btn">View All</button>
                    </div> */}

                    {/* <div className="activity-timeline-list">
                        {task.activities.map((log) => (
                            <div key={log.id} className="activity-timeline-item">
                                <div className="activity-icon-wrapper">
                                    {log.type === 'edit' ? (
                                        <Pencil size={14} />
                                    ) : (
                                        <Circle size={8} fill="currentColor" />
                                    )}
                                </div>
                                <div className="activity-details-content">
                                    <p className="activity-text-line">
                                        <span className="user-bold">{log.user}</span> {log.action}{' '}
                                        {log.target && <span className="status-target-highlight">{log.target}</span>}
                                    </p>
                                    <span className="activity-timestamp-label">{log.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default TaskDescription;