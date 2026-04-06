import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  PrinterIcon,
  EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentData();
  }, [id]);

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(`/payments/${id}`);
      // Vérifier que la réponse contient bien les données
      setPayment(response.data || null);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du chargement des données');
      navigate('/payments');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async () => {
    if (!payment) return;
    try {
      await axios.post(`/payments/${id}/send-invoice`);
      toast.success('Facture envoyée par email');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi');
    }
  };

  const handleDownloadInvoice = async () => {
    if (!payment) return;
    try {
      const response = await axios.get(`/payments/${id}/invoice`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facture-${payment.reference}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      payé: 'badge-success',
      'en attente': 'badge-warning',
      échoué: 'badge-danger',
      remboursé: 'badge-info',
    };
    return statusConfig[status] || 'badge-info';
  };

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

  if (!payment) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600">Paiement introuvable</p>
          <button
            onClick={() => navigate('/payments')}
            className="mt-4 btn-primary"
          >
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

      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden">
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
            <span className="text-sm font-medium tracking-wider uppercase">
              Détail du paiement
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Paiement {payment.reference}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              {payment.amount?.toLocaleString()} €
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {new Date(payment.createdAt).toLocaleDateString()}
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
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/payments')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Paiement {payment.reference}
              </h1>
              <p className="text-gray-600">
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={getStatusBadge(payment.status)}>{payment.status}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSendInvoice}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span>Envoyer facture</span>
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-md"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>Télécharger facture</span>
            </button>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Détails du paiement */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Détails du paiement
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Montant</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {payment.amount?.toLocaleString()} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Méthode</p>
                  <p className="text-lg font-medium text-gray-900 capitalize">
                    {payment.method}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date de paiement</p>
                  <p className="text-gray-900">
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleString()
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-600">
                    {payment.transactionId || '-'}
                  </p>
                </div>
                {payment.notes && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-gray-900">{payment.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Client */}
            {payment.client && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Informations client
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-lg">
                      {payment.client.firstName?.[0]}
                      {payment.client.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {payment.client.firstName} {payment.client.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{payment.client.email}</p>
                    <p className="text-sm text-gray-500">{payment.client.phone}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/clients/${payment.client._id}`)}
                    className="ml-auto px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50 transition"
                  >
                    Voir profil
                  </button>
                </div>
              </div>
            )}

            {/* Colis associés */}
            {payment.packages && payment.packages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Colis associés
                </h3>
                <div className="space-y-3">
                  {payment.packages.map((pkg) => (
                    <div
                      key={pkg._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {pkg.trackingNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {pkg.destination?.city || 'Destination inconnue'}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/packages/${pkg._id}`)}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        Voir détails
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne droite (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statut du paiement */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Statut du paiement
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      payment.status === 'payé'
                        ? 'bg-green-500'
                        : payment.status === 'en attente'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {payment.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(payment.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {payment.status === 'en attente' && (
                  <button className="w-full btn-primary mt-4">
                    Marquer comme payé
                  </button>
                )}
              </div>
            </div>

            {/* Détails du moyen de paiement */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Détails de paiement
              </h3>
              <div className="space-y-3">
                {payment.method === 'carte' && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Numéro de carte</p>
                      <p className="text-gray-900">
                        **** **** **** {payment.cardLast4}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiration</p>
                      <p className="text-gray-900">{payment.cardExpiry}</p>
                    </div>
                  </>
                )}
                {payment.method === 'virement' && (
                  <div>
                    <p className="text-sm text-gray-500">IBAN</p>
                    <p className="text-gray-900">{payment.iban || '-'}</p>
                  </div>
                )}
                {payment.method === 'paypal' && (
                  <div>
                    <p className="text-sm text-gray-500">Email PayPal</p>
                    <p className="text-gray-900">{payment.paypalEmail || '-'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Aperçu facture */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Facture
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Facture #{payment.invoiceNumber || payment.reference}
                    </p>
                    <p className="text-sm text-gray-500">PDF - 245 KB</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadInvoice}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <PrinterIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentDetail;