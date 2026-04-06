import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const MySales = () => {
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
    fetchStats();
  }, [filter]);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/marketplace/my-sales?status=${filter}`);
      setSales(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des ventes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/marketplace/my-sales/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en attente': 'badge-warning',
      'payé': 'badge-info',
      'expédié': 'badge-primary',
      'livré': 'badge-success',
      'annulé': 'badge-danger',
    };
    return statusConfig[status] || 'badge-info';
  };

  const columns = [
    {
      key: 'product',
      label: 'Produit',
      render: (val) => (
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3">
            {val.images?.[0] ? (
              <img src={val.images[0].url} alt="" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <ShoppingBagIcon className="w-6 h-6 text-gray-400 m-3" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{val.title}</div>
            <div className="text-sm text-gray-500">Ref: {val._id?.slice(-6)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'buyer',
      label: 'Acheteur',
      render: (val) => val ? `${val.firstName} ${val.lastName}` : '-',
    },
    {
      key: 'quantity',
      label: 'Quantité',
      render: (val) => val || 1,
    },
    {
      key: 'totalPrice',
      label: 'Total',
      render: (val) => <span className="font-bold">{val?.toLocaleString()} €</span>,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => (
        <span className={getStatusBadge(val)}>
          {val}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date vente',
      render: (val) => new Date(val).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/marketplace/sales/${row._id}`)}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          Détails
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{ backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/50 to-slate-900/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">MES VENTES</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Gérez vos ventes
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              sur la marketplace
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Consultez l'historique de vos ventes, suivez vos revenus et gérez vos commandes.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total ventes"
            value={stats.totalSales || 0}
            icon={ShoppingBagIcon}
            color="primary"
          />
          <StatCard
            title="Chiffre d'affaires"
            value={`${(stats.totalRevenue || 0).toLocaleString()} €`}
            icon={CurrencyDollarIcon}
            color="success"
          />
          <StatCard
            title="Acheteurs uniques"
            value={stats.uniqueBuyers || 0}
            icon={UserGroupIcon}
            color="info"
          />
          <StatCard
            title="Ventes en cours"
            value={stats.pendingSales || 0}
            icon={ChartBarIcon}
            color="warning"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'pending'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'completed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Terminées
            </button>
          </div>
        </div>

        {/* Sales Table */}
        <DataTable
          columns={columns}
          data={sales}
          loading={loading}
          onRowClick={(row) => navigate(`/marketplace/sales/${row._id}`)}
        />

        {!loading && sales.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune vente pour le moment
            </h3>
            <p className="text-gray-600">
              Publiez des produits pour commencer à vendre
            </p>
            <button
              onClick={() => navigate('/marketplace/products/add')}
              className="mt-4 btn-primary"
            >
              Vendre un produit
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MySales;