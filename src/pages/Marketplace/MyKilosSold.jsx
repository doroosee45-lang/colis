import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleIcon, CurrencyDollarIcon, UserGroupIcon, SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const MyKilosSold = () => {
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
    fetchStats();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/marketplace/my-kilos-sold');
      setSales(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des ventes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/marketplace/my-kilos-sold/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'disponible': 'badge-success',
      'en cours': 'badge-warning',
      'vendu': 'badge-info',
      'expiré': 'badge-danger',
    };
    return statusConfig[status] || 'badge-info';
  };

  const columns = [
    {
      key: 'title',
      label: 'Annonce',
      render: (val, row) => (
        <div>
          <div className="font-medium text-gray-900">{val}</div>
          <div className="text-sm text-gray-500">{row.quantity} kg à {row.pricePerKg} €/kg</div>
        </div>
      ),
    },
    {
      key: 'buyer',
      label: 'Acheteur',
      render: (val) => val ? `${val.firstName} ${val.lastName}` : 'En attente',
    },
    {
      key: 'quantitySold',
      label: 'Quantité vendue',
      render: (val, row) => `${val || 0} / ${row.quantity} kg`,
    },
    {
      key: 'totalRevenue',
      label: 'Revenu',
      render: (val) => val ? `${val.toLocaleString()} €` : '-',
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
      label: 'Date publication',
      render: (val) => new Date(val).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/marketplace/kilos/${row._id}`)}
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
            Kilos vendus
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Historique de vos ventes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Consultez toutes les transactions et revenus générés par la vente de vos kilos.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/marketplace/my-kilos-bought')}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 transition-all font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-slate-900/30 hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Mes achats
            </button>

            <button
              onClick={() => navigate('/marketplace/my-sales')}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-all font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Mes ventes
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total vendu"
            value={`${(stats.totalSold || 0).toLocaleString()} kg`}
            icon={ScaleIcon}
            color="primary"
          />
          <StatCard
            title="Revenu total"
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
        </div>

        {/* Sales Table */}
        <DataTable
          columns={columns}
          data={sales}
          loading={loading}
          onRowClick={(row) => navigate(`/marketplace/kilos/${row._id}`)}
        />

        {!loading && sales.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <ScaleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune vente pour le moment
            </h3>
            <p className="text-gray-600">
              Publiez des annonces pour vendre vos kilos
            </p>
            <button
              onClick={() => navigate('/marketplace/kilos/sell')}
              className="mt-4 btn-primary"
            >
              Vendre des kilos
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyKilosSold;