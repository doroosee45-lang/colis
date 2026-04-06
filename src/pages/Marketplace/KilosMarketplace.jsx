import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  ShoppingCartIcon,
  ScaleIcon,
  SparklesIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const KilosMarketplace = () => {
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',        // all, buy, sell
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
    fetchStats();
  }, [filters]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/marketplace/kilos?${params}`);
      const data = response.data?.data || response.data || [];
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du chargement des annonces');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/marketplace/kilos/stats');
      setStats(response.data?.data || response.data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const ListingCard = ({ listing }) => (
    <div
      onClick={() => navigate(`/marketplace/kilos/${listing._id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            listing.type === 'sell'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {listing.type === 'sell' ? '💰 Vente' : '🛒 Achat'}
        </span>
        <span className="text-2xl font-bold text-emerald-600">
          {listing.pricePerKg} €/kg
        </span>
      </div>

      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
        {listing.title}
      </h3>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{listing.description}</p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <ScaleIcon className="w-4 h-4" />
          <span>{listing.quantity} kg disponibles</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{listing.location || 'Non spécifié'}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
            {listing.user?.firstName?.[0]}
            {listing.user?.lastName?.[0]}
          </div>
          <span className="text-sm text-gray-600 truncate">
            {listing.user?.firstName} {listing.user?.lastName}
          </span>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          {listing.type === 'sell' ? 'Acheter' : 'Contacter'}
        </button>
      </div>
    </div>
  );

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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">MARKETPLACE DE KILOS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Achetez ou vendez
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              de l'espace de transport
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Optimisez vos envois en partageant vos kilos disponibles ou en trouvant de la place chez d'autres expéditeurs.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/marketplace/kilos/buy')}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 transition-all font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-slate-900/30 hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
             Acheter des kilos
            </button>

            <button
              onClick={() => navigate('/marketplace/kilos/sell')}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-all font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
               Vendre des kilos
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         
          
       
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Kilos disponibles"
            value={`${(stats.availableKilos || 0).toLocaleString()} kg`}
            icon={ScaleIcon}
            color="emerald"
          />
          <StatCard
            title="Prix moyen / kg"
            value={`${(stats.avgPrice || 0).toFixed(2)} €`}
            icon={ScaleIcon}
            color="amber"
          />
          <StatCard
            title="Annonces actives"
            value={stats.activeListings || 0}
            icon={ScaleIcon}
            color="blue"
          />
          <StatCard
            title="Volume échangé"
            value={`${(stats.tradedVolume || 0).toLocaleString()} kg`}
            icon={ScaleIcon}
            color="purple"
          />
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="sell">Ventes</option>
              <option value="buy">Achats</option>
            </select>

            <input
              type="number"
              placeholder="Prix min (€/kg)"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Prix max (€/kg)"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Localisation"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Grille des annonces */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {!loading && listings.length === 0 && (
          <div className="text-center py-16">
            <ScaleIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">
              Aucune annonce trouvée
            </h3>
            <p className="text-gray-500 mt-2">
              Soyez le premier à publier une annonce !
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default KilosMarketplace;