import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar pour mobile et desktop */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Contenu principal */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Le contenu de chaque page sera injecté ici */}
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer optionnel */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} CargoSphere. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay pour mobile quand le sidebar est ouvert */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;