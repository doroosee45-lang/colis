import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  ShoppingBagIcon,
  StarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/marketplace/products?${params}`);
      const productsData = response.data?.data || response.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du chargement des produits');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/marketplace/categories');
      setCategories(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const ProductCard = ({ product }) => (
    <div
      onClick={() => navigate(`/marketplace/products/${product._id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 group"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300" />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Mis en avant
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) =>
            i < Math.floor(product.rating || 0) ? (
              <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarIcon key={i} className="w-4 h-4 text-gray-300" />
            )
          )}
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviewsCount || 0})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {product.price?.toLocaleString('fr-FR')} €
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice.toLocaleString('fr-FR')} €
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize">{product.condition || 'Neuf'}</span>
          <span>{product.location || 'Non spécifié'}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 truncate">
          Vendu par {product.seller?.firstName} {product.seller?.lastName}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section avec bouton intégré */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{
              backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider uppercase">
              MARKETPLACE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Achetez et vendez
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              en toute confiance
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Découvrez une large sélection de produits de qualité, vendus par notre communauté.
          </p>

          {/* Bouton Vendre un produit dans la hero */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate('/marketplace/products/add')}
              className="
      inline-flex items-center gap-3 
      bg-gradient-to-r from-blue-500 to-cyan-500 
      hover:from-blue-600 hover:to-cyan-600
      text-white px-8 py-4 rounded-2xl 
      font-semibold text-lg 
      shadow-lg shadow-blue-500/30 
      transition-all duration-300 
      hover:scale-105 active:scale-95
    "
            >
              <PlusIcon className="w-6 h-6" />
              Vendre un produit
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
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes catégories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Plus récents</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="popular">Plus populaires</option>
            </select>
            <input
              type="number"
              placeholder="Prix min (€)"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Prix max (€)"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Grille produits */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos filtres</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsList;