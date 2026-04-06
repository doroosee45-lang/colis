import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#f4f6fb',
    }}>
      {/* ── Sidebar (fixed left column) ── */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* ── Main area (right column) ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          background: '#f4f6fb',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;