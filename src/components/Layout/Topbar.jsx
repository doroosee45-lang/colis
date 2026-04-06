import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../Context/AuthContext';

const ROUTE_LABELS = {
  '/app':                       'Tableau de Bord',
  '/app/clients':               'Clients',
  '/app/packages':              'Colis',
  '/app/agencies':              'Agences',
  '/app/employees':             'Employés',
  '/app/payments':              'Paiements',
  '/app/analytics':             'Analytics',
  '/app/settings':              'Paramètres',
  '/app/marketplace/products':  'Produits',
  '/app/marketplace/my-sales':  'Mes ventes',
  '/app/marketplace/kilos':     'Kilos',
};

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const location = useLocation();

  const pageLabel = ROUTE_LABELS[location.pathname] || 'Page';

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const initials = () => {
    if (!user) return '?';
    const n = user.name || user.firstName || '';
    return n.includes(' ')
      ? n.split(' ').map(x => x[0]).join('').toUpperCase()
      : n.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .topbar {
          font-family: 'Poppins', sans-serif;
          height: 52px;
          background: #fff;
          border-bottom: 1px solid #eef0f5;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          flex-shrink: 0;
          box-shadow: 0 1px 6px rgba(0,0,0,0.05);
          z-index: 20;
        }
        .topbar-menu-btn {
          display: none;
          padding: 6px;
          border: none;
          background: none;
          cursor: pointer;
          color: #6b7280;
          border-radius: 6px;
        }
        @media(max-width:1023px){ .topbar-menu-btn { display:flex; } }

        /* Breadcrumb */
        .topbar-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
        }
        .topbar-bc-bar {
          width: 3px; height: 16px;
          background: #00d4aa;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .topbar-bc-root {
          color: #9ca3af;
          font-weight: 500;
          text-decoration: none;
        }
        .topbar-bc-root:hover { color: #6b7280; }
        .topbar-bc-sep { color: #d1d5db; font-size: 0.7rem; }
        .topbar-bc-page {
          color: #00d4aa;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 0.72rem;
        }

        /* Right side */
        .topbar-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .topbar-date {
          font-size: 0.72rem;
          color: #9ca3af;
          font-weight: 400;
          white-space: nowrap;
        }
        .topbar-notif {
          position: relative;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #f4f6fb;
          border: 1px solid #e8eaf0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .topbar-notif-dot {
          position: absolute; top: 5px; right: 5px;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid #fff;
        }
        .topbar-user {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
        }
        .topbar-user-av {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #00d4aa, #00a88a);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .topbar-user-name {
          font-size: 0.78rem; font-weight: 600; color: #1e2d5e;
        }
        .topbar-user-badge {
          font-size: 0.65rem; font-weight: 600;
          color: #00d4aa;
          background: rgba(0,212,170,0.1);
          border: 1px solid rgba(0,212,170,0.25);
          border-radius: 20px;
          padding: 1px 8px;
        }
      `}</style>

      <header className="topbar">
        {/* Mobile menu button */}
        <button className="topbar-menu-btn" onClick={onMenuClick}>
          <Bars3Icon style={{ width: 20, height: 20 }} />
        </button>

        {/* Breadcrumb */}
        <div className="topbar-breadcrumb">
          <div className="topbar-bc-bar" />
          <Link to="/app" className="topbar-bc-root">Espace Admin</Link>
          <span className="topbar-bc-sep">›</span>
          <span className="topbar-bc-page">{pageLabel}</span>
        </div>

        {/* Right */}
        <div className="topbar-right">
          <span className="topbar-date">{dateStr}</span>

          <div className="topbar-notif">
            <BellIcon style={{ width: 17, height: 17, color: '#6b7280' }} />
            <div className="topbar-notif-dot" />
          </div>

          <div className="topbar-user">
            <div className="topbar-user-av">{initials()}</div>
            <span className="topbar-user-name">{user?.name || user?.firstName || 'Admin'}</span>
            <span className="topbar-user-badge">{user?.role || 'Admin'}</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;