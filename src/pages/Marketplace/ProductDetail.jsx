import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  StarIcon,
  MapPinIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/marketplace/products/${id}`);
      const data = response.data;

      setProduct(data);

      // Récupérer les autres produits du vendeur
      if (data?.seller?._id) {
        const sellerRes = await axios.get(
          `/marketplace/products?seller=${data.seller._id}&limit=4`
        );
        const otherProducts = (sellerRes.data?.data || sellerRes.data || [])
          .filter(p => p._id !== id);
        setSellerProducts(otherProducts);
      }
    } catch (error) {
      toast.error('Produit introuvable ou erreur de chargement');
      navigate('/marketplace/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    toast.success('Produit ajouté au panier');
    // Ajoute ta logique panier ici
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product, quantity } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-medium text-gray-700">Produit introuvable</h2>
      </div>
    );
  }

  // Sécurité : images est toujours un tableau
  const images = product.images && Array.isArray(product.images) ? product.images : [];
  const currentImage = images[selectedImage]?.url || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Bouton retour */}
      <button
        onClick={() => navigate('/marketplace/products')}
        className="flex items-center text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Retour à la marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Section Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCartIcon className="w-24 h-24 text-gray-300" />
              </div>
            )}
          </div>

          {/* Miniatures */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>

          {/* Rating + Condition */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                i < Math.floor(product.rating || 0) ? (
                  <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                ) : (
                  <StarIcon key={i} className="w-5 h-5 text-gray-300" />
                )
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviewsCount || 0} avis)
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 capitalize">{product.condition || 'Neuf'}</span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-900">
              {product.price?.toLocaleString('fr-FR')} €
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                {product.originalPrice.toLocaleString('fr-FR')} €
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose text-gray-700">
            <p>{product.description}</p>
          </div>

          {/* Infos supplémentaires */}
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5" />
              <span>Localisation : {product.location || 'Non spécifiée'}</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5" />
              <span>
                Vendu par : {product.seller?.firstName} {product.seller?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5" />
              <span>
                Publié le : {product.createdAt ? new Date(product.createdAt).toLocaleDateString('fr-FR') : '—'}
              </span>
            </div>
          </div>

          {/* Quantité et actions */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium text-gray-700">Quantité :</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {[...Array(Math.min(product.stock || 10, 10))].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="text-gray-500 text-sm">
                {product.stock || 0} en stock
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Ajouter au panier
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Autres produits du vendeur */}
      {sellerProducts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-6">Autres produits du vendeur</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sellerProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/marketplace/products/${item._id}`)}
                className="cursor-pointer group"
              >
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                  {item.images && item.images[0] ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCartIcon className="w-10 h-10 text-gray-300" />
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </h4>
                <p className="text-blue-600 font-semibold mt-1">
                  {item.price?.toLocaleString('fr-FR')} €
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;