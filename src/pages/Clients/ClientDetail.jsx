import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  SparklesIcon,
  CubeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [packages, setPackages] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchClientData();
  }, [id]);

  const fetchClientData = async () => {
    try {
      const [clientRes, packagesRes, paymentsRes, statsRes] = await Promise.all([
        axios.get(`/clients/${id}`),
        axios.get(`/clients/${id}/packages`),
        axios.get(`/clients/${id}/payments`),
        axios.get(`/clients/${id}/stats`),
      ]);

      setClient(clientRes.data);
      setPackages(packagesRes.data);
      setPayments(paymentsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      navigate('/clients');
    } finally {
      setLoading(false);
    }
  };

  const packageColumns = [
    { key: 'trackingNumber', label: 'N° Suivi' },
    { key: 'destination', label: 'Destination' },
    { key: 'weight', label: 'Poids (kg)' },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => {
        const color =
          val === 'livré'
            ? 'bg-green-100 text-green-800'
            : val === 'en transit'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800';
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{val}</span>;
      },
    },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
  ];

  const paymentColumns = [
    { key: 'reference', label: 'Référence' },
    { key: 'amount', label: 'Montant', render: (val) => `${val?.toLocaleString()} €` },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => {
        const color =
          val === 'payé'
            ? 'bg-green-100 text-green-800'
            : val === 'en attente'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800';
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{val}</span>;
      },
    },
    { key: 'method', label: 'Méthode' },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!client) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600">Client introuvable</p>
          <button onClick={() => navigate('/clients')} className="mt-4 btn-primary">
            Retour à la liste
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section personnalisée */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden">
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
            <span className="text-sm font-medium tracking-wider uppercase">Profil client</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {client.firstName} {client.lastName}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              {client.company || 'Client particulier'}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {client.email} • {client.phone || 'Téléphone non renseigné'}
          </p>
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
        {/* En-tête avec bouton retour */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/clients')}
            className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
          >
            ← Retour à la liste
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total colis"
            value={stats.totalPackages || 0}
            icon={CubeIcon}
            color="primary"
          />
          <StatCard
            title="Total dépensé"
            value={`${(stats.totalSpent || 0).toLocaleString()} €`}
            icon={CurrencyDollarIcon}
            color="success"
          />
          <StatCard
            title="Colis en cours"
            value={stats.pendingPackages || 0}
            icon={CubeIcon}
            color="warning"
          />
        </div>

        {/* Carte d'informations client */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${client.email}`} className="text-gray-900 hover:text-blue-600">
                    {client.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <a href={`tel:${client.phone}`} className="text-gray-900 hover:text-blue-600">
                    {client.phone || 'Non renseigné'}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="text-gray-900">
                    {client.address || 'Non renseignée'}
                    {client.city && `, ${client.city}`}
                    {client.country && `, ${client.country}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Entreprise</p>
                  <p className="text-gray-900">{client.company || 'Non renseignée'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <IdentificationIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">N° TVA</p>
                  <p className="text-gray-900">{client.taxId || 'Non renseigné'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'packages'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Colis ({stats.totalPackages || 0})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'payments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Paiements
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div>
          {activeTab === 'packages' && (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate('/packages/add', { state: { clientId: id } })}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-md"
                >
                  + Nouveau colis
                </button>
              </div>
              <DataTable
                columns={packageColumns}
                data={packages}
                onRowClick={(row) => navigate(`/packages/${row._id}`)}
              />
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate('/payments/add', { state: { clientId: id } })}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-md"
                >
                  + Nouveau paiement
                </button>
              </div>
              <DataTable
                columns={paymentColumns}
                data={payments}
                onRowClick={(row) => navigate(`/payments/${row._id}`)}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientDetail;