import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/dashboard.css';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  return (
    <div className={`dashboard-app-frame ${isMobileMenuOpen ? 'mobile-nav-expanded' : ''}`}>
      
      <Navbar isOpen={isMobileMenuOpen} toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
   
      <div className="workspace-main-panel">
        <Header toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
       
        <main className="workspace-canvas">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;