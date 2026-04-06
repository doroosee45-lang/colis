import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  ScaleIcon,
  SparklesIcon,
  ShoppingBagIcon,
  CurrencyEuroIcon,
  MapPinIcon,
  CalendarIcon,
  DocumentTextIcon,
  TagIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const BuyKilos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      quantity: '',
      maxPricePerKg: '',
      location: '',
      deliveryDate: '',
      terms: false,
    },
  });

  const quantity = watch('quantity') || 0;
  const maxPricePerKg = watch('maxPricePerKg') || 0;
  const totalBudget = (quantity * maxPricePerKg).toFixed(2);

  const onSubmit = async (data) => {
    if (!data.terms) {
      toast.error('Vous devez accepter les conditions générales');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/marketplace/kilos/buy', {
        ...data,
        type: 'buy',
        quantity: parseFloat(data.quantity),
        maxPricePerKg: parseFloat(data.maxPricePerKg),
      });
      toast.success('Demande d\'achat publiée avec succès !');
      navigate('/marketplace/kilos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden">
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
            <span className="text-sm font-medium tracking-wider uppercase">Achat de kilos</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Trouvez de l'espace
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              pour vos envois
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Publiez une demande d'achat et trouvez rapidement des kilos disponibles près de chez vous.
          </p>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Formulaire amélioré */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* En-tête du formulaire */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ScaleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Acheter des kilos</h1>
                <p className="text-blue-100 text-sm">Recherchez de l'espace de transport pour vos envois</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
            {/* Section 1 : Informations générales */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-5">
                <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                Détails de votre demande
              </h3>
              <div className="space-y-5">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    Titre de la demande <span className="text-red-500">*</span>
                    <div className="group relative inline-block">
                      <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg z-10">
                        Un titre clair attire plus de vendeurs.
                      </div>
                    </div>
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Le titre est requis' })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                    placeholder="Ex: Recherche espace pour envoi de colis"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('description', { required: 'La description est requise' })}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                    placeholder="Décrivez vos besoins (type de marchandise, contraintes, etc.)"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                {/* Grille 2 colonnes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <ScaleIcon className="w-4 h-4" />
                      Quantité (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('quantity', {
                        required: 'La quantité est requise',
                        min: { value: 0.1, message: 'Minimum 0.1 kg' },
                      })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.quantity ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                      placeholder="Ex: 150"
                    />
                    {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <CurrencyEuroIcon className="w-4 h-4" />
                      Prix max par kg (€) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('maxPricePerKg', {
                        required: 'Le prix maximum est requis',
                        min: { value: 0.01, message: 'Prix positif requis' },
                      })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.maxPricePerKg ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                      placeholder="Ex: 2.50"
                    />
                    {errors.maxPricePerKg && <p className="mt-1 text-sm text-red-600">{errors.maxPricePerKg.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      Localisation de départ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('location', { required: 'La localisation est requise' })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.location ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all`}
                      placeholder="Ville, Pays"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      Date de livraison souhaitée
                    </label>
                    <input
                      type="date"
                      {...register('deliveryDate')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 : Budget estimé - style carte améliorée */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <CurrencyEuroIcon className="w-5 h-5 text-blue-600" />
                Budget estimé
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Quantité :</span>
                  <span className="font-semibold text-gray-800">{quantity} kg</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Prix max / kg :</span>
                  <span className="font-semibold text-gray-800">{maxPricePerKg} €</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-800 font-bold">Budget maximum :</span>
                  <span className="text-2xl font-bold text-blue-700">{totalBudget} €</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Ce budget est une estimation. Les vendeurs peuvent proposer des prix inférieurs.
                </p>
              </div>
            </div>

            {/* Section 3 : Conditions générales */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('terms', { required: 'Vous devez accepter les conditions' })}
                  className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Je certifie que les informations fournies sont exactes et j'accepte les
                  <button type="button" className="text-blue-600 hover:text-blue-800 mx-1 font-medium">
                    conditions générales d'achat
                  </button>
                  de la marketplace.
                </span>
              </label>
              {errors.terms && <p className="mt-2 text-sm text-red-600">{errors.terms.message}</p>}
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/marketplace/kilos')}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || !isValid}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publication...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Publier la demande
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyKilos;