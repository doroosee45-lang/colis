import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleIcon, CurrencyDollarIcon, TruckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const MyKilosBought = () => {
  const [purchases, setPurchases] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchases();
    fetchStats();
  }, []);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/marketplace/my-kilos-bought');
      setPurchases(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des achats');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/marketplace/my-kilos-bought/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en attente': 'badge-warning',
      'confirmé': 'badge-info',
      'livré': 'badge-success',
      'annulé': 'badge-danger',
    };
    return statusConfig[status] || 'badge-info';
  };

  const columns = [
    {
      key: 'seller',
      label: 'Vendeur',
      render: (val) => val ? `${val.firstName} ${val.lastName}` : '-',
    },
    {
      key: 'quantity',
      label: 'Quantité achetée',
      render: (val) => `${val} kg`,
    },
    {
      key: 'pricePerKg',
      label: 'Prix/kg',
      render: (val) => `${val} €`,
    },
    {
      key: 'totalPrice',
      label: 'Total payé',
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
      label: "Date d'achat",
      render: (val) => new Date(val).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => navigate(`/marketplace/kilos/${row.listingId}`)}
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
            <span className="text-sm font-medium tracking-wider">MES ACHATS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Historique de vos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              achats de kilos
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Consultez tous les kilos que vous avez achetés sur notre marketplace.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total acheté"
            value={`${(stats.totalBought || 0).toLocaleString()} kg`}
            icon={ScaleIcon}
            color="primary"
          />
          <StatCard
            title="Dépense totale"
            value={`${(stats.totalSpent || 0).toLocaleString()} €`}
            icon={CurrencyDollarIcon}
            color="warning"
          />
          <StatCard
            title="Envois réalisés"
            value={stats.totalShipments || 0}
            icon={TruckIcon}
            color="success"
          />
        </div>

        {/* Purchases Table */}
        <DataTable
          columns={columns}
          data={purchases}
          loading={loading}
          onRowClick={(row) => navigate(`/marketplace/kilos/${row.listingId}`)}
        />

        {!loading && purchases.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <ScaleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun achat pour le moment
            </h3>
            <p className="text-gray-600">
              Parcourez la marketplace pour acheter des kilos
            </p>
            <button
              onClick={() => navigate('/marketplace/kilos')}
              className="mt-4 btn-primary"
            >
              Voir les annonces
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyKilosBought;