import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  CubeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../Context/AuthContext';

const navigation = [
  { name: 'TABLEAU DE BORD', href: '/app',           icon: HomeIcon },
  { name: 'CLIENTS',         href: '/app/clients',   icon: UsersIcon },
  { name: 'COLIS',           href: '/app/packages',  icon: CubeIcon },
  { name: 'AGENCES',         href: '/app/agencies',  icon: BuildingOfficeIcon },
  { name: 'EMPLOYÉS',        href: '/app/employees', icon: UserGroupIcon },
  { name: 'PAIEMENTS',       href: '/app/payments',  icon: CreditCardIcon },
  {
    name: 'MARKETPLACE',
    icon: ShoppingBagIcon,
    children: [
      { name: 'Produits',        href: '/app/marketplace/products' },
      { name: 'Ajouter produit', href: '/app/marketplace/products/add' },
      { name: 'Mes ventes',      href: '/app/marketplace/my-sales' },
      { name: 'Kilos',           href: '/app/marketplace/kilos' },
      { name: 'Vendre kilos',    href: '/app/marketplace/kilos/sell' },
    ],
  },
  { name: 'ANALYTICS',   href: '/app/analytics', icon: ChartBarIcon },
  { name: 'PARAMÈTRES',  href: '/app/settings',  icon: Cog6ToothIcon },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [expanded, setExpanded] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggle = (name) =>
    setExpanded(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        /* ── Root ── */
        .sb {
          font-family: 'Poppins', sans-serif;
          width: 220px;
          min-width: 220px;
          max-width: 220px;
          height: 100vh;
          background: #0d1f2d;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          z-index: 40;
        }

        /* ── Brand block ── */
        .sb-brand {
          padding: 28px 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .sb-brand-title {
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .sb-brand-title span {
          color: #00d4aa;
          display: block;
        }
        .sb-brand-line {
          width: 32px; height: 3px;
          background: #00d4aa;
          border-radius: 2px;
          margin-top: 8px;
        }

        /* ── Avatar block ── */
        .sb-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 16px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .sb-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d4aa, #00a88a);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; font-weight: 700; color: #fff;
          position: relative;
          box-shadow: 0 0 0 3px rgba(0,212,170,0.25);
        }
        .sb-avatar-dot {
          position: absolute; bottom: 2px; right: 2px;
          width: 12px; height: 12px; border-radius: 50%;
          background: #00d4aa;
          border: 2px solid #0d1f2d;
        }
        .sb-avatar-id {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          margin-top: 8px;
          letter-spacing: 0.05em;
        }

        /* ── Nav ── */
        .sb-nav {
          flex: 1;
          overflow-y: auto;
          padding: 10px 10px;
          scrollbar-width: none;
        }
        .sb-nav::-webkit-scrollbar { display: none; }

        /* nav link */
        .sb-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.42);
          cursor: pointer;
          transition: all 0.15s ease;
          margin-bottom: 1px;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .sb-link:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
        }
        .sb-link.active {
          color: #00d4aa;
          background: rgba(0,212,170,0.1);
          border-left: 3px solid #00d4aa;
          padding-left: 9px;
        }
        .sb-link .sb-ico {
          width: 18px; height: 18px;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.15s;
        }
        .sb-link:hover .sb-ico { opacity: 0.85; }
        .sb-link.active .sb-ico { opacity: 1; color: #00d4aa; }

        .sb-chevron {
          width: 12px; height: 12px;
          margin-left: auto;
          opacity: 0.3;
          transition: transform 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }
        .sb-chevron.open {
          transform: rotate(90deg);
          opacity: 0.65;
        }

        /* sub-menu */
        .sb-sub {
          margin: 2px 0 4px 38px;
          border-left: 1px solid rgba(255,255,255,0.08);
          padding-left: 10px;
        }
        .sb-sub-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 8px;
          border-radius: 5px;
          font-size: 0.69rem;
          color: rgba(255,255,255,0.32);
          text-decoration: none;
          transition: all 0.13s;
          margin-bottom: 1px;
        }
        .sb-sub-link::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
          transition: background 0.13s;
        }
        .sb-sub-link:hover {
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.04);
        }
        .sb-sub-link:hover::before { background: #00d4aa; }
        .sb-sub-link.active { color: #00d4aa; }
        .sb-sub-link.active::before { background: #00d4aa; }

        /* ── Logout row ── */
        .sb-logout-wrap {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 14px 10px;
          flex-shrink: 0;
        }
        .sb-logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          background: none;
          text-align: left;
        }
        .sb-logout-btn:hover {
          color: #f87171;
          background: rgba(248,113,113,0.1);
        }
        .sb-logout-btn .sb-ico {
          width: 18px; height: 18px;
          opacity: 0.5;
          transition: opacity 0.15s;
        }
        .sb-logout-btn:hover .sb-ico { opacity: 1; color: #f87171; }

        /* ── Mobile backdrop ── */
        .sb-backdrop {
          position: fixed; inset: 0; z-index: 30;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(2px);
        }

        /* Mobile: sidebar slides in */
        @media (max-width: 1023px) {
          .sb {
            position: fixed;
            top: 0; left: 0;
            z-index: 40;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sb.open {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Mobile backdrop */}
      {isOpen && (
        <div className="sb-backdrop lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sb${isOpen ? ' open' : ''}`}>

        {/* Brand */}
        <div className="sb-brand">
          <div className="sb-brand-title">
            Cargo<span>Sphere</span>
          </div>
          <div className="sb-brand-line" />
        </div>

        {/* Avatar */}
        <div className="sb-avatar-wrap">
          <div className="sb-avatar">
            {initials()}
            <div className="sb-avatar-dot" />
          </div>
          <div className="sb-avatar-id">
            ID : {user?.id || user?._id || 'ADM-001'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="sb-nav">
          {navigation.map(item => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggle(item.name)}
                    className="sb-link"
                  >
                    <item.icon className="sb-ico" />
                    {item.name}
                    <ChevronRightIcon
                      className={`sb-chevron${expanded.includes(item.name) ? ' open' : ''}`}
                    />
                  </button>
                  {expanded.includes(item.name) && (
                    <div className="sb-sub">
                      {item.children.map(c => (
                        <NavLink
                          key={c.name}
                          to={c.href}
                          className={({ isActive }) =>
                            `sb-sub-link${isActive ? ' active' : ''}`
                          }
                        >
                          {c.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.href}
                  end={item.href === '/app'}
                  className={({ isActive }) =>
                    `sb-link${isActive ? ' active' : ''}`
                  }
                >
                  <item.icon className="sb-ico" />
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="sb-logout-wrap">
          <button className="sb-logout-btn" onClick={handleLogout}>
            <ArrowRightOnRectangleIcon className="sb-ico" />
            DÉCONNEXION
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;