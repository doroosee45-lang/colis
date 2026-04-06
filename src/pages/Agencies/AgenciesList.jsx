import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import agencyService from '../../services/Agencyservice';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const AgenciesList = () => {
  const [agencies, setAgencies] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', country: '', status: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAgencies();
    fetchStats();
  }, [filters]);

  const fetchAgencies = async () => {
    setLoading(true);
    try {
      const res = await agencyService.getAll(filters);
      setAgencies(res.data?.data || res.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des agences');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await agencyService.getStats();
      setStats(res.data?.data || res.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette agence ? Cette action est irréversible.')) return;

    try {
      await agencyService.delete(id);
      toast.success('Agence supprimée avec succès');
      fetchAgencies();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const getStatusBadge = (status) => {
    return status === 'actif'
      ? 'px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200'
      : 'px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-200';
  };

  // Image par défaut
  const defaultAgencyImage = "https://images.unsplash.com/photo-1486406146926-c627a392ad40?w=800&q=80";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{
              backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/50 to-slate-900/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">NOS AGENCES</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Consultez, gérez et supervisez l’ensemble
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              de vos agences et succursales
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Un espace centralisé pour piloter tout votre réseau d’agences avec efficacité.
          </p>
        </div>

        {/* Stats rapides */}
        <div className="relative z-10 flex flex-wrap gap-8 mt-12 justify-center">
          <div className="text-center">
            <div className="text-4xl font-semibold text-white">{stats.total || 0}</div>
            <div className="text-slate-300 text-sm mt-1">Agences totales</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-semibold text-emerald-400">{stats.active || 0}</div>
            <div className="text-slate-300 text-sm mt-1">Agences actives</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-semibold text-white">{stats.totalEmployees || 0}</div>
            <div className="text-slate-300 text-sm mt-1">Employés</div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal - Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* En-tête + Bouton Ajouter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-slate-800">Liste des agences</h2>
            <p className="text-slate-500 mt-1">Gérez votre réseau d’agences en toute simplicité</p>
          </div>

          <button
            onClick={() => navigate('/app/agencies/new')}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3.5 rounded-2xl font-medium transition shadow-sm"
          >
            <PlusIcon className="w-5 h-5" />
            Nouvelle agence
          </button>
        </div>

        {/* Filtres */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher une agence..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-400"
            />

            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-400"
            >
              <option value="">Tous les pays</option>
              <option value="Canada">Canada</option>
              <option value="RDC">RDC</option>
              <option value="Cameroun">Cameroun</option>
              <option value="Benin">Bénin</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-orange-400"
            >
              <option value="">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>

            <button
              onClick={() => setFilters({ search: '', country: '', status: '' })}
              className="px-6 py-3 text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-100 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Grid de Cards - 3 par ligne sur grand écran */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Chargement des agences...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencies.map((agency) => (
              <div
                key={agency._id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/app/agencies/${agency._id}`)}
              >
                {/* Photo de l'agence */}
                <div className="h-56 bg-slate-100 relative overflow-hidden">
                  <img
                    src={agency.image || "https://images.unsplash.com/photo-1486406146926-c627a392ad40?w=800&q=80"}
                    alt={agency.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={getStatusBadge(agency.status)}>
                      {agency.status === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="font-semibold text-xl text-slate-800 mb-1 line-clamp-1">{agency.name}</div>
                  <div className="text-sm text-slate-500 mb-4">Code : {agency.code || '—'}</div>

                  <div className="space-y-2.5 text-sm text-slate-600">
                    <p className="line-clamp-1">
                      <span className="font-medium">Adresse :</span> {agency.address?.street || agency.address}
                    </p>
                    <p>
                      <span className="font-medium">Ville :</span> {agency.address?.city || agency.city}, {agency.address?.country || agency.country}
                    </p>
                    <p>
                      <span className="font-medium">Téléphone :</span> {agency.phone || '—'}
                    </p>
                    <p className="line-clamp-1">
                      <span className="font-medium">Email :</span> {agency.email || '—'}
                    </p>
                    <p>
                      <span className="font-medium">Responsable :</span> {agency.manager ? `${agency.manager.firstName} ${agency.manager.lastName}` : '—'}
                    </p>
                    <p>
                      <span className="font-medium">Employés :</span> {agency.employeesCount || 0}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/app/agencies/${agency._id}/edit`); }}
                    className="p-2.5 rounded-xl hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition"
                    title="Modifier"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(agency._id); }}
                    className="p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                    title="Supprimer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {agencies.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-500">
            Aucune agence trouvée avec ces filtres.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AgenciesList;