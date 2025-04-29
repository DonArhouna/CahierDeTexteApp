import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Narbar';

const MainLayout = () => {
  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flexGrow: 1 }}>
        <Navbar />
        <div className="page-content" style={{ padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
