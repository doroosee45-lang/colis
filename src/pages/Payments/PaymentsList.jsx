import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, CreditCardIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    method: '',
    dateFrom: '',
    dateTo: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, [filters]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/payments?${params}`);
      setPayments(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des paiements');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/payments/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'payé': 'badge-success',
      'en attente': 'badge-warning',
      'échoué': 'badge-danger',
      'remboursé': 'badge-info',
    };
    return statusConfig[status] || 'badge-info';
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'carte':
        return '💳';
      case 'virement':
        return '🏦';
      case 'espèces':
        return '💵';
      case 'paypal':
        return '🅿️';
      default:
        return '💰';
    }
  };

  const columns = [
    {
      key: 'reference',
      label: 'Référence',
      render: (val) => (
        <span className="font-mono text-sm font-medium text-primary-600">{val}</span>
      ),
      sortable: true,
    },
    {
      key: 'client',
      label: 'Client',
      render: (val) => (val ? `${val.firstName} ${val.lastName}` : '-'),
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Montant',
      render: (val) => <span className="font-medium">{val?.toLocaleString()} €</span>,
      sortable: true,
    },
    {
      key: 'method',
      label: 'Méthode',
      render: (val) => (
        <div className="flex items-center space-x-2">
          <span>{getMethodIcon(val)}</span>
          <span className="capitalize">{val}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => <span className={getStatusBadge(val)}>{val}</span>,
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (val) => new Date(val).toLocaleDateString(),
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/payments/${row._id}`);
            }}
            className="text-blue-600 hover:text-blue-900"
            title="Voir détails"
          >
            <CreditCardIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/payments/${row._id}/invoice`, '_blank');
            }}
            className="text-green-600 hover:text-green-900"
            title="Voir facture"
          >
            <DocumentTextIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section avec bouton intégré */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{ backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider uppercase">GESTION DES PAIEMENTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Suivez vos transactions
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              en toute transparence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Consultez l’historique de vos paiements, gérez les statuts et générez des factures.
          </p>

          {/* Bouton dans la Hero */}
          <div className="mt-10">
            <button
              onClick={() => navigate('/payments/add')}
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 transition-all font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-slate-900/30 hover:scale-105 active:scale-95"
            >
              <PlusIcon className="w-6 h-6" />
              Nouveau paiement
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total revenus"
            value={`${(stats.totalRevenue || 0).toLocaleString()} €`}
            icon={CreditCardIcon}
            color="primary"
          />
          <StatCard
            title="Paiements en attente"
            value={`${(stats.pendingAmount || 0).toLocaleString()} €`}
            icon={CreditCardIcon}
            color="warning"
          />
          <StatCard
            title="Paiements réussis"
            value={stats.successfulCount || 0}
            icon={CreditCardIcon}
            color="success"
          />
          <StatCard
            title="Taux de réussite"
            value={`${stats.successRate || 0}%`}
            icon={CreditCardIcon}
            color="info"
          />
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous statuts</option>
              <option value="payé">Payé</option>
              <option value="en attente">En attente</option>
              <option value="échoué">Échoué</option>
              <option value="remboursé">Remboursé</option>
            </select>
            <select
              value={filters.method}
              onChange={(e) => setFilters({ ...filters, method: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes méthodes</option>
              <option value="carte">Carte bancaire</option>
              <option value="virement">Virement</option>
              <option value="espèces">Espèces</option>
              <option value="paypal">PayPal</option>
            </select>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Date début"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Date fin"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() =>
                setFilters({
                  search: '',
                  status: '',
                  method: '',
                  dateFrom: '',
                  dateTo: '',
                })
              }
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={payments}
          onRowClick={(row) => navigate(`/payments/${row._id}`)}
          loading={loading}
        />
      </div>

      <Footer />
    </div>
  );
};

export default PaymentsList;