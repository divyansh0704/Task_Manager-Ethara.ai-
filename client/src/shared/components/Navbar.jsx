import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/Auth/hooks/useAuth';
import '../styles/dashboard.css';
import { 
  LayoutDashboard, 
  FolderClosed, 
  ClipboardList, 
  Rocket, 
  CircleHelp, 
  LogOut, 
  Plus 
} from 'lucide-react';

const Navbar = ({ isOpen, toggleMenu }) => {

    const navigate = useNavigate();
    const {handleLogout} = useAuth();
    
        const handleClick = async () => {
            await handleLogout();
        }
        
  return (
    <nav className={`app-sidebar ${isOpen ? 'drawer-open' : ''}`}>
      <div className="sidebar-brand">
        <Rocket className="brand-logo-icon" size={24} />
        <div className="brand-text">
          <h2>Ethara</h2>
          <span className="brand-tag">MANAGEMENT PRO</span>
        </div>
      </div>

      <ul className="sidebar-nav-links">
        <li>
          <NavLink to="/dashboard" end onClick={() => toggleMenu(false)}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" onClick={() => toggleMenu(false)}>
            <FolderClosed size={20} />
            <span>Projects</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" onClick={() => toggleMenu(false)}>
            <ClipboardList size={20} />
            <span>Tasks</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/dashboard/calendar" onClick={() => toggleMenu(false)}>
            <span className="material-icons">calendar_today</span>
            <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reports" onClick={() => toggleMenu(false)}>
            <span className="material-icons">bar_chart</span>
            <span>Reports</span>
          </NavLink>
        </li> */}
      </ul>

      <div className="sidebar-footer-actions">
        <button onClick={()=>{navigate("/createtask")}} className="btn-sidebar-action">
          <Plus size={18} />
          <span>Create Task</span>
        </button>
        <div className="utility-nav">
          <NavLink to="/dashboard/help" className="utility-item">
            <CircleHelp size={18} /> Help
          </NavLink>
          <button onClick={handleClick} className="utility-item btn-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;