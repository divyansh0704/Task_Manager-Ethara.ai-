import React,{useState} from 'react'
import { useProject } from '../hooks/useProject'
import "../styles/createproject.css"
import {useNavigate} from "react-router-dom"
import { Rocket } from 'lucide-react';

const CreateProject = () => {
    const {loading,handleCreateProject} = useProject();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleCreateProject({title,description});
        setTitle("");
        setDescription("");
        navigate("/projects");

    }
    return (
        <div className="create-project-container">
            {/* Top Breadcrumb & Navigation */}
            <div className="create-header">
                <div className="breadcrumb">
                    {/* <span>Projects</span> */}
                    {/* <span className="material-icons">chevron_right</span> */}
                    <span className="current">Create New Project</span>
                </div>
                <h1>Launch New Initiative</h1>
                <p>Define the parameters, objectives, and team for your next engineering sprint.</p>
            </div>

            <div className="create-content-wrapper">
                <form className="create-project-form" onSubmit={handleSubmit}>

                    {/* Section 1: Project Identity */}
                    <div className="form-section">
                        <div className="section-header">
                            {/* <span className="material-icons">fingerprint</span> */}
                            <h3>Project Identity</h3>
                        </div>

                        <div className="input-grid">
                            <div className="input-group full-width">
                                <label>Project Name *</label>
                                <input type="text" placeholder="e.g., Neural Nexus Infrastructure" onChange={(e)=>{setTitle(e.target.value)}} required />
                                <span className="input-hint">A clear, concise name for your project.</span>
                            </div>

                            {/* <div className="input-group">
                <label>Project Identifier</label>
                <div className="input-with-prefix">
                  <span className="prefix">ETH-</span>
                  <input type="text" placeholder="NNI-01" />
                </div>
              </div> */}

                            {/* <div className="input-group">
                <label>Project Category</label>
                <select className="custom-select">
                  <option value="backend">Backend Infrastructure</option>
                  <option value="uiux">UI/UX Design System</option>
                  <option value="security">Cybersecurity Audit</option>
                  <option value="devops">Cloud Orchestration</option>
                </select>
              </div> */}
                        </div>
                    </div>

                    {/* Section 2: Objectives & Description */}
                    <div className="form-section">
                        <div className="section-header">
                            {/* <span className="material-icons">description</span> */}
                            <h3>Scope & Objectives</h3>
                        </div>
                        <div className="input-group full-width">
                            <label>Description</label>
                            <textarea
                                onChange={(e)=>{setDescription(e.target.value)}}
                                placeholder="Describe the primary goals, technical requirements, and expected outcomes..."
                                rows="5"
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 3: Timeline & Team */}
                    {/* <div className="form-section">
                        <div className="section-header">
                            <span className="material-icons">groups</span>
                            <h3>Team & Timeline</h3>
                        </div>

                        <div className="input-grid">
                            <div className="input-group">
                                <label>Start Date</label>
                                <input type="date" />
                            </div>
                            <div className="input-group">
                                <label>End Date (Target)</label>
                                <input type="date" />
                            </div>

                            <div className="input-group full-width">
                                <label>Assign Lead Engineer</label>
                                <div className="member-search">
                                    <span className="material-icons">search</span>
                                    <input type="text" placeholder="Search team members by name or role..." />
                                </div>
                                <div className="selected-members">
                                    <div className="member-chip">
                                        <div className="chip-avatar">AR</div>
                                        <span>Alex Rivera (You)</span>
                                    </div>
                                    <div className="member-chip">
                                        <div className="chip-avatar">SL</div>
                                        <span>Sophie Laurent</span>
                                        <span className="material-icons close-chip">close</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button type="button" className="btn-ghost">Cancel</button>
                        <button type="submit" className="btn-primary-launch">
                            <span>Create Project</span>
                            <Rocket size={20} />
                        </button>
                    </div>

                </form>

                {/* Right Sidebar - Dynamic Preview (Desktop Only) */}
                <div className="create-preview-sidebar">
                    <div className="preview-card">
                        <h4>Live Preview</h4>
                        <div className="preview-status">STABLE</div>
                        <div className="preview-skeleton-title"></div>
                        <div className="preview-skeleton-text"></div>
                        <div className="preview-skeleton-text short"></div>
                        <div className="preview-progress-track">
                            <div className="preview-progress-fill"></div>
                        </div>
                        <div className="preview-footer">
                            <div className="skeleton-avatars"></div>
                            <div className="skeleton-date"></div>
                        </div>
                    </div>
                    <div className="pro-tip">
                        <span className="material-icons">lightbulb</span>
                        <p><strong>Pro Tip:</strong> Projects with clear identifiers like "ETH-DEV" are 40% easier to track in search.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProject