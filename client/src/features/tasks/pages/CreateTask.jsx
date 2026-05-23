import React, { useState, useEffect } from 'react'
import { useTask } from "../hooks/useTask"
import { useContext } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { useProject } from "../../projects/hooks/useProject"
import "../styles/createtask.css"
import { useAuth } from "../../Auth/hooks/useAuth"
import {
    Folder,
    UserPlus,
    Calendar,
    CircleAlert,
    ChevronRight,
    SquarePlus,
    Lightbulb
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const CreateTask = () => {
    const { members,loading} = useAuth();
    const { projects,loadingP } = useProject();
    const { handleCreateTask,loadingT } = useTask();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        dueDate: '',
        priority: 'medium'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateTask(formData);
        setFormData({
            title: '',
            description: '',
            project: '',
            assignedTo: '',
            dueDate: '',
            priority: 'medium'
        })
        navigate('/tasks');

    }
    if(loading || loadingT || loadingP){
        <main><h1>Loading...</h1></main>

    }

    // useEffect(() => {
    //     handleGetAllUser();
    // }, []);
    

    return (
        <div className="create-task-page-container">
            {/* Route Header Breadcrumbs */}
            <div className="create-task-header">
                <div className="task-breadcrumb">
                    <span>Tasks</span>
                    <ChevronRight size={16} />
                    <span className="active-route">Create New</span>
                </div>
                <h1>Create New Task</h1>
                <p>Define the scope, assign ownership, and set timelines for your next engineering milestone.</p>
            </div>

            <div className="create-task-layout-body">
                {/* Main Content Entry Form */}
                <form className="create-task-form-panel" onSubmit={handleSubmit}>

                    <div className="form-input-group">
                        <label htmlFor="title">Task Name *</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="e.g., Implement OAuth2 authorization middleware"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-input-group">
                        <label htmlFor="description">Detailed Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Provide clear technical specifications, acceptance criteria, or relevant repository links..."
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-input-grid">
                        <div className="form-input-group">
                            <label htmlFor="project">Project Selection *</label>
                            <div className="select-input-wrapper">
                                <Folder className="select-icon" size={18} />
                                <select
                                    id="project"
                                    name="project"
                                    value={formData.project}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Target Project</option>
                                    {projects.map((p) => (
                                        <option key={p._id} value={p._id}>{p.title}</option>
                                    ))}


                                </select>
                            </div>
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="assignedTo">Assignee *</label>
                            <div className="select-input-wrapper">
                                <UserPlus className="select-icon" size={18} />
                                <select
                                    id="assignedTo"
                                    name="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choose a Member</option>
                                    {members.map((m) => (
                                        <option key={m._id} value={m._id}>{m.name}</option>
                                    ))}
                                    {/* <option value="m1">Alex Rivera (Lead Designer)</option>
                  <option value="m2">Sarah Chen (Senior Dev)</option>
                  <option value="m3">Marcus Thorne (Product Owner)</option> */}
                                </select>
                            </div>
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <div className="select-input-wrapper">
                                <Calendar className="select-icon" size={18} />
                                <input
                                    id="dueDate"
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="priority">Priority Level</label>
                            <div className="select-input-wrapper">
                                <CircleAlert className="select-icon" size={18} />
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Form CTA Buttons */}
                    <div className="form-action-row">
                        <button type="button" className="btn-task-cancel">Cancel</button>
                        <button type="submit" className="btn-task-submit">
                            <span>Create Task</span>
                            <SquarePlus size={18} />
                        </button>
                    </div>

                </form>

                {/* Desktop Side Information / Tips Panel */}
                <div className="create-task-info-sidebar">
                    <div className="sidebar-tip-card">
                        <Lightbulb className="tip-lightbulb" size={24} />
                        <h4>Quick Integration Tips</h4>
                        <ul>
                            <li>Use clear action verbs at the start of task headings (e.g., *Refactor*, *Patch*, *Deploy*).</li>
                            <li>Ensure your assignee possesses sufficient bandwidth for the ongoing active sprint capacity.</li>
                            <li>High priority labels automatically flag tasks in your core group's daily slack/terminal digest loops.</li>
                        </ul>
                    </div>

                    <div className="sidebar-insight-banner">
                        <span className="meta-label">PROJECT INSIGHT</span>
                        <blockquote>"Efficiency is doing things right; effectiveness is doing the right things."</blockquote>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateTask