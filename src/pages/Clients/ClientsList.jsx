import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import ClientForm from '../../components/Forms/ClientForm';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    country: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, [filters]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/clients?${params}`);
      setClients(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await axios.delete(`/clients/${id}`);
        toast.success('Client supprimé avec succès');
        fetchClients();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedClient) {
        await axios.put(`/clients/${selectedClient._id}`, data);
        toast.success('Client mis à jour avec succès');
      } else {
        await axios.post('/clients', data);
        toast.success('Client créé avec succès');
      }
      setShowModal(false);
      setSelectedClient(null);
      fetchClients();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  const columns = [
    { key: 'firstName', label: 'Prénom', sortable: true },
    { key: 'lastName', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Téléphone' },
    { key: 'company', label: 'Entreprise' },
    { key: 'country', label: 'Pays', sortable: true },
    { key: 'totalPackages', label: 'Colis', render: (val) => val || 0 },
    {
      key: 'createdAt',
      label: 'Inscrit le',
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
              setSelectedClient(row);
              setShowModal(true);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="text-red-600 hover:text-red-900"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
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
            <span className="text-sm font-medium tracking-wider uppercase">GESTION DES CLIENTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Gérez vos clients
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              en toute simplicité
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Consultez, ajoutez, modifiez ou supprimez vos clients en quelques clics.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
        <button
            onClick={() => {
              setSelectedClient(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition shadow-md"
          >
            <PlusIcon className="w-5 h-5" />
            Nouveau client
          </button>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 relative z-10">
        {/* En-tête + bouton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les pays</option>
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="LU">Luxembourg</option>
              <option value="CA">Canada</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setFilters({ search: '', country: '' })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <DataTable
          columns={columns}
          data={clients}
          onRowClick={(row) => navigate(`/clients/${row._id}`)}
          loading={loading}
        />

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedClient(null);
          }}
          title={selectedClient ? 'Modifier le client' : 'Nouveau client'}
          size="lg"
        >
          <ClientForm
            initialData={selectedClient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowModal(false);
              setSelectedClient(null);
            }}
          />
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default ClientsList;