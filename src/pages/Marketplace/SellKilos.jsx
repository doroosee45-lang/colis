import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ScaleIcon, SparklesIcon, CheckCircleIcon, PhoneIcon, EnvelopeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';


const SellKilos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      quantity: '',
      pricePerKg: '',
      minQuantity: 1,
      location: '',
      expiryDate: '',
      sellerPhone: '',
      sellerEmail: '',
      terms: false,
    },
  });

  const quantity = watch('quantity') || 0;
  const pricePerKg = watch('pricePerKg') || 0;
  const totalPrice = (quantity * pricePerKg).toFixed(2);

  const onSubmit = async (data) => {
    if (!data.terms) {
      toast.error('Vous devez accepter les conditions générales');
      return;
    }

    if (!data.sellerPhone || !data.sellerEmail) {
      toast.error('Veuillez renseigner votre téléphone et email');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/marketplace/kilos/sell', {
        ...data,
        type: 'sell',
        quantity: parseFloat(data.quantity),
        pricePerKg: parseFloat(data.pricePerKg),
        minQuantity: parseInt(data.minQuantity),
      });

      toast.success('Annonce publiée avec succès !');
      navigate('/marketplace/kilos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
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

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider">VENTE DE KILOS</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Vendez votre espace de transport
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              et optimisez vos revenus
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10">
            Proposez vos kilos disponibles aux autres expéditeurs et maximisez l'utilisation de votre capacité.
          </p>

          {/* ✅ BOUTONS BIEN ALIGNÉS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">

            <button
              onClick={() => navigate('/marketplace/my-kilos-bought')}
              className="inline-flex items-center justify-center gap-2 
      bg-white text-slate-900 hover:bg-slate-100 
      transition-all font-semibold text-base sm:text-lg 
      px-6 sm:px-8 py-3 sm:py-4 
      rounded-xl shadow-lg shadow-slate-900/30
      hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Mes achats
            </button>

            <button
              onClick={() => navigate('/marketplace/my-kilos-sold')}
              className="inline-flex items-center justify-center gap-2 
      bg-gradient-to-r from-blue-500 to-cyan-500 
      text-white hover:opacity-90 
      transition-all font-semibold text-base sm:text-lg 
      px-6 sm:px-8 py-3 sm:py-4 
      rounded-xl shadow-lg shadow-blue-500/30
      hover:scale-105 active:scale-95"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Mes ventes
            </button>

          </div>

        </div>
        {/* Wave effect en bas */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Formulaire */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <ScaleIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Publier une annonce de vente</h2>
              <p className="text-gray-600 mt-1">Remplissez les informations ci-dessous</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Informations de base */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'annonce <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Le titre est obligatoire' })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  placeholder="Ex: 500kg disponibles pour Paris - Lyon"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description', { required: 'La description est obligatoire' })}
                  rows={5}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500 resize-y"
                  placeholder="Décrivez les conditions, dates, type de marchandise acceptée, etc."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>

            {/* Détails techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité disponible (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('quantity', {
                    required: 'La quantité est obligatoire',
                    min: { value: 1, message: 'Minimum 1 kg' }
                  })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix par kg (€) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('pricePerKg', {
                    required: 'Le prix est obligatoire',
                    min: { value: 0.01, message: 'Le prix doit être positif' }
                  })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                />
                {errors.pricePerKg && <p className="text-red-500 text-sm mt-1">{errors.pricePerKg.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantité minimum (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('minQuantity')}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('location', { required: 'La localisation est obligatoire' })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  placeholder="Paris, France"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
              </div>
            </div>

            {/* Coordonnées du vendeur (Nouveau) */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>Vos coordonnées de contact</span>
                <span className="text-red-500 text-sm font-normal">(obligatoires)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <PhoneIcon className="w-4 h-4" /> Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('sellerPhone', { required: 'Le téléphone est obligatoire' })}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.sellerPhone && <p className="text-red-500 text-sm mt-1">{errors.sellerPhone.message}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <EnvelopeIcon className="w-4 h-4" /> Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('sellerEmail', { required: 'L’email est obligatoire' })}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                    placeholder="votre.email@exemple.com"
                  />
                  {errors.sellerEmail && <p className="text-red-500 text-sm mt-1">{errors.sellerEmail.message}</p>}
                </div>
              </div>
            </div>

            {/* Récapitulatif du prix */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="font-semibold text-emerald-800 mb-4">Récapitulatif de l'offre</h3>
              <div className="space-y-2 text-emerald-700">
                <div className="flex justify-between">
                  <span>Quantité proposée :</span>
                  <span className="font-medium">{quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Prix unitaire :</span>
                  <span className="font-medium">{pricePerKg} €/kg</span>
                </div>
                <div className="h-px bg-emerald-200 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-emerald-900">
                  <span>Total estimé :</span>
                  <span>{totalPrice} €</span>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-6">
              <input
                type="checkbox"
                {...register('terms')}
                className="mt-1 w-5 h-5 accent-emerald-600"
              />
              <div className="text-sm text-gray-600">
                J'accepte les{' '}
                <button type="button" className="text-emerald-600 hover:underline font-medium">
                  conditions générales de la marketplace
                </button>{' '}
                et certifie que les informations fournies sont exactes.
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/marketplace/kilos')}
                className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Publication en cours...</>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Publier l'annonce
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

export default SellKilos;