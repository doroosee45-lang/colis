import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './components/Context/AuthContext';
import ProtectedRoute from './components/Context/Protectedroute';
import Layout from './components/Layout/Layout';

// Public Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact/Contact';
import Tarifs from './pages/Home/Tarifs';
import Solutions from './pages/Home/Solutions';
import Caracteristiques from './pages/Home/Caracteristiques';
import Demo from './pages/Home/Demo';

// Clients
import ClientsList from './pages/Clients/ClientsList';
import ClientDetail from './pages/Clients/ClientDetail';

// Packages
import PackagesList from './pages/Packages/PackagesList';
import PackageDetail from './pages/Packages/PackageDetail';
import AddPackage from './pages/Packages/AddPackage';
import PackageTracking from './pages/Packages/PackageTracking';

// Agencies
import AgenciesList from './pages/Agencies/AgenciesList';
import AgencyDetail from './pages/Agencies/AgencyDetail';
import AddAgency from './pages/Agencies/AddAgency';

// Employees
import EmployeesList from './pages/Employees/EmployeesList';
import EmployeeDetail from './pages/Employees/EmployeeDetail';
import AddEmployee from './pages/Employees/AddEmployee';


// Payments
import PaymentsList from './pages/Payments/PaymentsList';
import PaymentDetail from './pages/Payments/PaymentDetail';
import AddPayment from './pages/Payments/AddPayment';
import InvoiceView from './pages/Payments/InvoiceView';

// Marketplace
import ProductsList from './pages/Marketplace/ProductsList';
import ProductDetail from './pages/Marketplace/ProductDetail';
import AddProduct from './pages/Marketplace/AddProduct';
import MySales from './pages/Marketplace/MySales';
import KilosMarketplace from './pages/Marketplace/KilosMarketplace';
import SellKilos from './pages/Marketplace/SellKilos';
import BuyKilos from './pages/Marketplace/BuyKilos';
import MyKilosSold from './pages/Marketplace/MyKilosSold';
import MyKilosBought from './pages/Marketplace/MyKilosBought';

// Analytics, Profile, etc.
import Analytics from './pages/Analytics/Analytics';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Notifications from './pages/Notifications/Notifications';
import Reports from './pages/Reports/Reports';
import Help from './pages/Help/Help';
import About from './pages/About/About';

// Dashboard (si vous voulez le garder sous /app ou le rendre public)
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={4000} theme="dark" />
        <Routes>
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ROUTES PUBLIQUES (sans sidebar, accessibles à tous) */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/caracteristiques" element={<Caracteristiques />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/agenciesList" element={<AgenciesList />} />

          {/* Clients */}
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/clients/:id" element={<ClientDetail />} />

          {/* Packages */}
          <Route path="/packages" element={<PackagesList />} />
          <Route path="/packages/add" element={<AddPackage />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/packages/:id/tracking" element={<PackageTracking />} />

          {/* Employees */}
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/employees/:id/edit" element={<AddEmployee />} />

          {/* Payments */}
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/payments/add" element={<AddPayment />} />
          <Route path="/payments/:id" element={<PaymentDetail />} />
          <Route path="/payments/:id/invoice" element={<InvoiceView />} />

          {/* Marketplace */}
          <Route path="/marketplace/products" element={<ProductsList />} />
          <Route path="/marketplace/products/:id" element={<ProductDetail />} />
          <Route path="/marketplace/my-sales" element={<MySales />} />
          <Route path="/marketplace/kilos" element={<KilosMarketplace />} />
          <Route path="/marketplace/kilos/sell" element={<SellKilos />} />
          <Route path="/marketplace/kilos/buy" element={<BuyKilos />} />
          <Route path="/marketplace/my-kilos-sold" element={<MyKilosSold />} />
          <Route path="/marketplace/my-kilos-bought" element={<MyKilosBought />} />
          <Route path="/marketplace/products/add" element={<AddProduct />} />

          {/* Analytics, Profile, Settings, etc. */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />

          {/* Si vous voulez aussi le Dashboard public (sinon, laissez sous /app) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ROUTES PROTÉGÉES (avec sidebar, si nécessaire) */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* Vous pouvez garder une route /app pour les pages qui nécessitent une sidebar */}
          <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            {/* Vous pouvez ajouter ici d'autres routes qui nécessitent la sidebar */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;