import React, { useState } from 'react'
import "../styles/project.css"
import {
  CirclePlus,
  Rocket,
  Gauge,
  CircleCheck,
  NotebookPen,
  TrendingUp,
  LayoutGrid,
  List,
  Calendar,
  UserPlus
} from 'lucide-react';
import AddMemberModal from '../components/AddMemberModal';
import { Link, useNavigate } from 'react-router-dom';
import { useProject } from '../hooks/useProject';

const Project = () => {
  const { loading, projects ,handleAddMember} = useProject();
  const [showAddMember, setShowAddMember] = useState(false)
  const [projectId,setProjectId]=useState("")

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/addproject');
  };
  const handleAddClick=(e, projectId)=>{
    e.stopPropagation(); 
    setProjectId(projectId);
    setShowAddMember(true)
    
    // console.log(projectId);
  }

  if (loading) return <main><h1>Loading...</h1></main>;


  return (
    <div className="projects-container">
      {/* Top Banner Title & Action Area */}
      <div className="projects-header">
        <div className="header-text">
          <h1>Active Projects</h1>
          <p>Oversee your current engineering sprints and team velocity.</p>
        </div>
        <div className="header-actions">
         
          <button onClick={handleButtonClick} className="btn-primary">
            <CirclePlus size={20} /> New Project
          </button>
        </div>
      </div>

      {/* Render the modal at the root level of the component, not inside a loop */}
      {showAddMember && <AddMemberModal setShowAddMember={setShowAddMember} handleAddMember={handleAddMember}  projectId={projectId} />}

      {/* Analytics Telemetry Bar */}
      <div className="metrics-grid">
        <div className="metric-card" >
          <div className="metric-info">
            <span className="metric-label">Total Projects</span>
            <h3>{projects.length}</h3>
            {/* <span className="metric-trend positive">
              <TrendingUp size={14} /> +3 this month
            </span> */}
          </div>
          <Rocket className="metric-icon" size={34} />
        </div>

        {/* <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Velocity</span>
            <h3>84%</h3>
            <span className="metric-trend stable">Stable productivity</span>
          </div>
          <Gauge className="metric-icon" size={34} />
        </div> */}

        {/* <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Completed</span>
            <h3>142</h3>
            <span className="metric-trend positive">
              <TrendingUp size={14} /> +12% vs last Q
            </span>
          </div>
          <CircleCheck className="metric-icon" size={34} />
        </div> */}

        {/* <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Pending Reviews</span>
            <h3>08</h3>
            <span className="metric-trend warning">4 Critical priority</span>
          </div>
          <NotebookPen className="metric-icon" size={34} />
        </div> */}
      </div>

      {/* Filter and View Toggle Controls */}
      <div className="controls-row">
        <div className="filter-tabs">
          <button className="tab-btn active">All Projects</button>
          <button className="tab-btn">Personal</button>
          <button className="tab-btn">Enterprise</button>
          <button className="tab-btn">Archived</button>
        </div>
        <div className="view-toggles">
          <button className="toggle-btn active">
            <LayoutGrid size={18} />
          </button>
          <button className="toggle-btn">
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            {/* <div className="card-top">
              <span className="status-badge-pulse">{project.status}</span>
              {project.tag && (
                <span className={`tag-badge ${project.tag.toLowerCase()}`}>
                  {project.tag}
                </span>
              )}
            </div> */}

            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>

            {/* Progress Meter Layout */}
            {/* <div className="progress-section">
              <div className="progress-label-row">
                <span>Completion</span>
                <span className="progress-percentage">{project.completion}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
            </div> */}

            {/* Card Footer Meta Metadata */}
            <div className="card-footer">
              <div className="avatar-group">
                {project.members.map((initial, index) => (
                  <div key={index} className="avatar-placeholder" title={`Team Member ${initial}`}>
                    {initial.name?.charAt(0).toUpperCase()}
                  </div>
                ))}
                <div className="avatar-more">+{project.members.length}</div>

              </div>
              {/* <div className="date-badge">
                <Calendar size={14} />
                <span>{project.date}</span>
              </div> */}
              <div onClick={(e)=>handleAddClick(e, project._id)} className="avatar-placeholder invite-member" title="Add Team Member">
                <UserPlus size={14} />
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Mobile/Desktop Blank Inception Card */}
        <div onClick={handleButtonClick} className="project-card start-new-card">
          <CirclePlus size={48} className="add-huge-icon" />
          <h3>Start New Project</h3>
          <p>Define goals, assign members, and launch a new initiative.</p>
        </div>
      </div>
    </div>
  );
}

export default Project