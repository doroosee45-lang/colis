import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const AddPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      client: location.state?.clientId || '',
      amount: '',
      method: 'carte',
      status: 'en attente',
      paymentDate: new Date().toISOString().split('T')[0],
      packages: [],
      notes: '',
      ...(location.state?.amount && { amount: location.state.amount }),
    },
  });

  const [clients, setClients] = useState([]);
  const [clientPackages, setClientPackages] = useState([]);
  const [searchClient, setSearchClient] = useState('');
  const [showClientSearch, setShowClientSearch] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchClient.length > 2) {
      searchClients();
    }
  }, [searchClient]);

  useEffect(() => {
    if (watch('client')) {
      fetchClientPackages(watch('client'));
    }
  }, [watch('client')]);

  const searchClients = async () => {
    try {
      const response = await axios.get(`/clients?search=${searchClient}&limit=5`);
      setClients(response.data);
    } catch (error) {
      console.error('Error searching clients:', error);
    }
  };

  const fetchClientPackages = async (clientId) => {
    try {
      const response = await axios.get(`/clients/${clientId}/packages?status=en attente`);
      setClientPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const selectClient = (client) => {
    setValue('client', client._id);
    setSearchClient(`${client.firstName} ${client.lastName}`);
    setShowClientSearch(false);
  };

  const togglePackage = (pkg) => {
    setSelectedPackages(prev => {
      const isSelected = prev.some(p => p._id === pkg._id);
      if (isSelected) {
        return prev.filter(p => p._id !== pkg._id);
      } else {
        return [...prev, pkg];
      }
    });
  };

  const calculateTotal = () => {
    return selectedPackages.reduce((sum, pkg) => sum + (pkg.shippingCost || 0), 0);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const paymentData = {
        ...data,
        packages: selectedPackages.map(p => p._id),
        amount: calculateTotal(),
        reference: `PAY${Date.now()}`,
      };
      await axios.post('/payments', paymentData);
      toast.success('Paiement enregistré avec succès');
      navigate('/payments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section spécifique aux paiements */}
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
            <span className="text-sm font-medium tracking-wider uppercase">Paiement</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Enregistrer un paiement
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              simple et sécurisé
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Sélectionnez un client, choisissez les colis concernés et validez le paiement.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* En-tête du formulaire */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Nouveau paiement</h1>
                <p className="text-blue-100 text-sm">Enregistrez un nouveau paiement pour un client</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
            {/* Client Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <SparklesIcon className="w-5 h-5 text-blue-600" />
                Client
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchClient}
                  onChange={(e) => {
                    setSearchClient(e.target.value);
                    setShowClientSearch(true);
                  }}
                  onFocus={() => setShowClientSearch(true)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                {showClientSearch && searchClient.length > 2 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {clients.map((client) => (
                      <button
                        key={client._id}
                        type="button"
                        onClick={() => selectClient(client)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <div className="font-medium">{client.firstName} {client.lastName}</div>
                        <div className="text-sm text-gray-500">{client.email} • {client.phone}</div>
                      </button>
                    ))}
                    {clients.length === 0 && (
                      <div className="px-4 py-3 text-gray-500 text-sm">Aucun client trouvé</div>
                    )}
                  </div>
                )}
              </div>
              {errors.client && <p className="mt-2 text-sm text-red-600">Veuillez sélectionner un client</p>}
            </div>

            {/* Packages Selection */}
            {watch('client') && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <SparklesIcon className="w-5 h-5 text-blue-600" />
                  Colis à payer
                </h3>
                <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                  {clientPackages.length > 0 ? (
                    <>
                      {clientPackages.map((pkg) => (
                        <label
                          key={pkg._id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedPackages.some(p => p._id === pkg._id)}
                              onChange={() => togglePackage(pkg)}
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{pkg.trackingNumber}</p>
                              <p className="text-sm text-gray-500">
                                Destination: {pkg.destination?.city} • Poids: {pkg.weight}kg
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {pkg.shippingCost?.toLocaleString()} €
                            </p>
                          </div>
                        </label>
                      ))}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">Total à payer</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {calculateTotal().toLocaleString()} €
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Aucun colis en attente de paiement pour ce client
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <SparklesIcon className="w-5 h-5 text-blue-600" />
                Détails du paiement
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Méthode de paiement *
                  </label>
                  <select
                    {...register('method', { required: 'La méthode est requise' })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  >
                    <option value="carte">Carte bancaire</option>
                    <option value="virement">Virement bancaire</option>
                    <option value="espèces">Espèces</option>
                    <option value="paypal">PayPal</option>
                  </select>
                  {errors.method && <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de paiement
                  </label>
                  <input
                    type="date"
                    {...register('paymentDate')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select {...register('status')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="en attente">En attente</option>
                    <option value="payé">Payé</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Informations complémentaires..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/payments')}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || selectedPackages.length === 0}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer le paiement'
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

export default AddPayment;