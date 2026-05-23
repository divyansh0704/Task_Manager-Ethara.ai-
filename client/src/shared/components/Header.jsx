import React from 'react';
import '../styles/dashboard.css';
import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useAuth } from '../../features/Auth/hooks/useAuth';
import {useContext} from 'react'
import { AuthContext } from '../../features/Auth/AuthContext';

const Header = ({ toggleMenu }) => {
  const { user } = useContext(AuthContext);
  

  return (
    <header className="global-workspace-header">
     
      <button className="mobile-hamburger-trigger" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

     
      <div className="workspace-search-bar">
        <Search className="search-bar-icon" size={18} />
        <input type="text" placeholder="Search tasks, projects, or team..." />
      </div>

      {/* Right Actions Cluster */}
      <div className="header-actions-cluster">
        <button className="header-action-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge-dot"></span>
        </button>
        <button className="header-action-btn" aria-label="Settings">
          <Settings size={20} />
        </button>
        <div className="header-profile-avatar">
          {user?.name ? (
            <div className="user-initial-avatar">{user.name.charAt(0).toUpperCase()}</div>
          ) : (
            <img src="https://via.placeholder.com/36" alt="User Profile" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;