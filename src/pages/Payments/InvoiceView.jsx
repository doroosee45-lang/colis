import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeftIcon, PrinterIcon, EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const InvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoiceData();
  }, [id]);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get(`/payments/${id}`);
      setPayment(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement de la facture');
      navigate('/payments');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `facture-${payment?.reference || id}`,
  });

  const handleSendEmail = async () => {
    if (!payment) return;
    try {
      await axios.post(`/payments/${id}/send-invoice`);
      toast.success('Facture envoyée par email');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi');
    }
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
          <p className="text-red-600">Facture introuvable</p>
          <button onClick={() => navigate('/payments')} className="mt-4 btn-primary">
            Retour aux paiements
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
            <span className="text-sm font-medium tracking-wider uppercase">Facture</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Facture {payment.invoiceNumber || payment.reference}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              {payment.amount?.toLocaleString()} €
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Générée le {new Date(payment.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-12 relative z-10">
        {/* Header avec boutons */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/payments/${id}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Facture {payment.invoiceNumber || payment.reference}
              </h1>
              <p className="text-gray-600">
                Générée le {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSendEmail}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span>Envoyer</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-md"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>Imprimer</span>
            </button>
          </div>
        </div>

        {/* Facture imprimable */}
        <div ref={componentRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* En-tête facture */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="text-xl font-bold text-gray-900">CargoSphere</span>
              </div>
              <p className="text-gray-600">123 Rue de la Logistique</p>
              <p className="text-gray-600">75001 Paris, France</p>
              <p className="text-gray-600">contact@cargosphere.com</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">FACTURE</h2>
              <p className="text-gray-600">N° {payment.invoiceNumber || payment.reference}</p>
              <p className="text-gray-600">Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
              {payment.paymentDate && (
                <p className="text-gray-600">Date d'échéance: {new Date(payment.paymentDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          {/* Client info */}
          {payment.client && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">Facturé à</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">
                  {payment.client.firstName} {payment.client.lastName}
                </p>
                {payment.client.company && <p className="text-gray-600">{payment.client.company}</p>}
                <p className="text-gray-600">{payment.client.email}</p>
                <p className="text-gray-600">{payment.client.phone}</p>
                {payment.client.address && (
                  <p className="text-gray-600">
                    {payment.client.address.street}<br />
                    {payment.client.address.postalCode} {payment.client.address.city}<br />
                    {payment.client.address.country}
                  </p>
                )}
                {payment.client.taxId && <p className="text-gray-600">N° TVA: {payment.client.taxId}</p>}
              </div>
            </div>
          )}

          {/* Tableau des articles */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-900">Description</th>
                  <th className="text-right py-3 text-sm font-semibold text-gray-900">Montant</th>
                </tr>
              </thead>
              <tbody>
                {payment.packages?.map((pkg) => (
                  <tr key={pkg._id} className="border-b border-gray-100">
                    <td className="py-3">
                      <p className="font-medium text-gray-900">Colis {pkg.trackingNumber}</p>
                      <p className="text-sm text-gray-500">
                        {pkg.destination?.city} • Poids: {pkg.weight}kg
                      </p>
                    </td>
                    <td className="py-3 text-right text-gray-900">
                      {pkg.shippingCost?.toLocaleString()} €
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 text-right font-medium text-gray-900">Sous-total</td>
                  <td className="py-3 text-right text-gray-900">
                    {payment.amount?.toLocaleString()} €
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-right font-medium text-gray-900">TVA (20%)</td>
                  <td className="py-3 text-right text-gray-900">
                    {((payment.amount || 0) * 0.2).toLocaleString()} €
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-3 text-right font-bold text-gray-900">Total TTC</td>
                  <td className="py-3 text-right font-bold text-primary-600 text-xl">
                    {((payment.amount || 0) * 1.2).toLocaleString()} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Infos paiement */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Mode de paiement</h4>
                <p className="text-gray-600 capitalize">{payment.method}</p>
                {payment.transactionId && (
                  <p className="text-sm text-gray-500">Transaction: {payment.transactionId}</p>
                )}
              </div>
              <div className="text-right">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Statut</h4>
                <span className={payment.status === 'payé' ? 'badge-success' : 'badge-warning'}>
                  {payment.status === 'payé' ? 'Payée' : 'En attente de paiement'}
                </span>
              </div>
            </div>
          </div>

          {/* Pied de page */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>CargoSphere - Votre partenaire logistique de confiance</p>
            <p className="mt-1">Cette facture est générée automatiquement et fait foi.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvoiceView;