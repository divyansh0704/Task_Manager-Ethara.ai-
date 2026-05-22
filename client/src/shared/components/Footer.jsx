import React from 'react';
import '../styles/dashboard.css';
const Footer = () => {
  return (
    <footer className="workspace-system-footer">
      <div className="telemetry-status">
        <span className="status-dot-pulse"></span>
        <span>Environment Node: Real-time Synchronized</span>
      </div>
      <div className="telemetry-meta">
        <span className="meta-tag"><span className="material-icons">security</span> Encrypted</span>
        <span className="meta-tag"><span className="material-icons">sync</span> v2.0.6-Beta</span>
      </div>
    </footer>
  );
};

export default Footer;