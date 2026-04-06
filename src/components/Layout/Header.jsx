import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, MagnifyingGlassIcon, Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import axios from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications]   = useState([]);
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchResults, setSearchResults]   = useState([]);
  const [showSearch, setShowSearch]         = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.NOTIFICATIONS);
      // Support les deux formats : { data: { notifications } } ou tableau direct
      const data = response.data?.data?.notifications ?? response.data;
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      // Silencieux — pas de toast pour les notifications
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(API_ENDPOINTS.NOTIFICATION_READ(id));
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(API_ENDPOINTS.NOTIFICATIONS_READ_ALL ?? '/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(`/search?q=${query}`);
        setSearchResults(response.data?.data ?? response.data ?? []);
      } catch {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Déconnexion réussie');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Initiales de l'utilisateur
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '?';

  const roleLabel = {
    superadmin: 'Super Admin',
    admin:      'Administrateur',
    manager:    'Manager',
    agent:      'Agent',
    client:     'Client',
  }[user?.role] ?? user?.role ?? '';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Gauche ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Recherche */}
            <div className="hidden md:block">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                  className="w-80 pl-9 pr-4 py-2 border border-gray-200 rounded-lg
                           text-sm focus:outline-none focus:ring-2 focus:ring-sky-400
                           focus:border-transparent bg-gray-50 transition-all"
                />
                {showSearch && searchResults.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                    {searchResults.map((result) => (
                      <a key={result._id} href={result.url}
                        className="block px-4 py-2.5 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0">
                        <div className="font-medium text-gray-800">{result.title}</div>
                        <div className="text-xs text-gray-400">{result.type}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Droite ── */}
          <div className="flex items-center gap-2">

            {/* Notifications */}
            <Menu as="div" className="relative">
              <Menu.Button className="relative p-2 text-gray-400 hover:text-gray-600
                                     hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500
                                   rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-xl
                                    shadow-xl border border-gray-100 focus:outline-none z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead}
                      className="text-xs text-sky-600 hover:text-sky-700 font-medium transition-colors">
                      Tout marquer lu
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <Menu.Item key={notif._id}>
                        {() => (
                          <button onClick={() => markAsRead(notif._id)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors
                                       ${!notif.read ? 'bg-sky-50/60' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                                ${notif.read ? 'bg-gray-300' : 'bg-sky-500'}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 leading-snug">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {new Date(notif.createdAt).toLocaleString('fr-FR', {
                                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          </button>
                        )}
                      </Menu.Item>
                    ))
                  ) : (
                    <div className="py-8 text-center text-sm text-gray-400">
                      Aucune notification
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 p-2">
                  <Link to="/app/notifications"
                    className="block w-full text-center text-xs text-sky-600
                             hover:text-sky-700 py-1.5 font-medium transition-colors">
                    Voir toutes les notifications →
                  </Link>
                </div>
              </Menu.Items>
            </Menu>

            {/* Menu utilisateur */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5
                                     hover:bg-gray-100 rounded-lg transition-colors focus:outline-none">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600
                               rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs">{initials}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-none">
                    {user ? `${user.firstName} ${user.lastName}` : '...'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{roleLabel}</p>
                </div>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl
                                    shadow-xl border border-gray-100 focus:outline-none z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Connecté en tant que</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/app/profile"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-50' : ''}`}>
                        Mon profil
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/app/settings"
                        className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-50' : ''}`}>
                        Paramètres
                      </Link>
                    )}
                  </Menu.Item>
                </div>

                <div className="border-t border-gray-100 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={handleLogout}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600
                                   ${active ? 'bg-red-50' : ''} transition-colors`}>
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        Déconnexion
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;