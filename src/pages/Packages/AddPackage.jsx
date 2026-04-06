import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import {
  UserIcon,
  CubeIcon,
  MapPinIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  PhotoIcon,
  CurrencyEuroIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  PrinterIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

/* ── Composants UI réutilisables ── */
const FieldLabel = ({ children }) => (
  <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
    {children}
  </label>
);

const inputBase =
  'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-300 transition-all';

const SectionBlock = ({ icon: Icon, iconColor = 'text-blue-500', title, children }) => (
  <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
    <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-100">
      <span className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</span>
    </div>
    <div className="p-5 space-y-3 bg-white">{children}</div>
  </div>
);

/* ── Composant principal ── */
const AddPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [clients, setClients] = useState([]);
  const [searchClient, setSearchClient] = useState('');
  const [showClientSearch, setShowClientSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [packageImage, setPackageImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [createdPackage, setCreatedPackage] = useState(null);
  const fileInputRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, setValue, formState: { errors }, trigger, watch } = useForm({
    defaultValues: {
      client: location.state?.clientId || '',
      weight: '',
      declaredValue: '',
      description: '',
      origin: { address: '', city: '', postalCode: '', country: 'FR' },
      destination: { address: '', city: '', postalCode: '', country: 'FR' },
      service: 'standard',
      insurance: false,
      totalAmount: '',
      paymentCondition: 'surplace',
      amountPaid: '',
      expeditionDate: today,
      senderPhone: '',
      senderEmail: '',
      recipientPhone: '',
      recipientEmail: '',
    },
  });

  const paymentCondition = watch('paymentCondition');
  const totalAmount = watch('totalAmount');
  const amountPaid = watch('amountPaid');
  const service = watch('service');

  const remainingAmount = totalAmount && amountPaid
    ? Math.max(0, parseFloat(totalAmount) - parseFloat(amountPaid)).toFixed(2)
    : '0.00';

  const getEstimatedArrival = () => {
    const todayDate = new Date();
    let daysToAdd = 5;
    if (service === 'express') daysToAdd = 2;
    if (service === 'premium') daysToAdd = 1;
    const estimatedDate = new Date(todayDate);
    estimatedDate.setDate(todayDate.getDate() + daysToAdd);
    return estimatedDate.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const estimatedArrival = getEstimatedArrival();

  const steps = [
    { id: 0, name: 'Client',    icon: UserIcon,   fields: ['client'] },
    { id: 1, name: 'Colis',     icon: CubeIcon,   fields: ['weight', 'declaredValue', 'description'] },
    { id: 2, name: 'Adresses',  icon: MapPinIcon, fields: [
        'origin.address', 'origin.city', 'origin.postalCode',
        'destination.address', 'destination.city', 'destination.postalCode',
        'senderPhone', 'senderEmail', 'recipientPhone', 'recipientEmail'
      ]},
    { id: 3, name: 'Expédition', icon: TruckIcon,  fields: ['service', 'totalAmount', 'paymentCondition', 'expeditionDate'] },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setPackageImage(event.target.result);
      reader.readAsDataURL(file);
    } else {
      toast.error('Veuillez sélectionner une image valide (JPG/PNG)');
    }
  };

  const removeImage = () => {
    setPackageImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const searchClients = async () => {
    try {
      const response = await axios.get(`/clients?search=${searchClient}&limit=5`);
      const clientsData = response.data?.data || response.data?.clients || response.data || [];
      setClients(Array.isArray(clientsData) ? clientsData : []);
    } catch (error) {
      console.error('Error searching clients:', error);
      setClients([]);
    }
  };

  useEffect(() => {
    if (searchClient.length > 2) searchClients();
  }, [searchClient]);

  const selectClient = (client) => {
    setValue('client', client._id);
    setSearchClient(`${client.firstName} ${client.lastName}`);
    setShowClientSearch(false);
    trigger('client');
  };

  const nextStep = async () => {
    const isValid = await trigger(steps[currentStep].fields);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const trackingNumber = `CS${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const formData = new FormData();
      formData.append('trackingNumber', trackingNumber);
      formData.append('status', 'en attente');
      formData.append('createdAt', new Date().toISOString());
      formData.append('estimatedArrival', estimatedArrival);
      Object.keys(data).forEach(key => {
        if (['origin', 'destination'].includes(key)) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      if (imageFile) formData.append('packageImage', imageFile);
      const response = await axios.post('/packages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const created = response.data?.data || response.data;
      setCreatedPackage({
        trackingNumber, ...data, estimatedArrival,
        packageImageUrl: packageImage,
        _id: created._id || null,
      });
      setSubmitted(true);
      toast.success('Colis créé avec succès !');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Suivi de colis',
        text: `Votre colis ${createdPackage.trackingNumber} a été enregistré.`,
        url: `${window.location.origin}/tracking/${createdPackage.trackingNumber}`,
      }).catch(() => toast.info('Partage annulé'));
    } else {
      const link = `${window.location.origin}/tracking/${createdPackage.trackingNumber}`;
      navigator.clipboard.writeText(link);
      toast.success('Lien de suivi copié !');
    }
  };

  const handlePrint = () => window.print();
  const goToTracking = () => navigate(`/tracking/${createdPackage.trackingNumber}`);

  /* ════════════════════════════════
     ÉCRAN DE CONFIRMATION
  ════════════════════════════════ */
  if (submitted && createdPackage) {
    const recapData = createdPackage;
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 py-12 px-4 print:bg-white">
          <div className="max-w-3xl mx-auto space-y-5">

            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-2xl print:shadow-none">
              <div className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: 'radial-gradient(circle at 15% 60%, #3b82f6 0%, transparent 45%), radial-gradient(circle at 85% 20%, #10b981 0%, transparent 40%)' }} />
              <div className="relative px-8 py-7 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1 mb-3">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">Enregistrement confirmé</span>
                  </div>
                  <h1 className="text-xl font-bold mb-1">Colis enregistré avec succès</h1>
                  <p className="text-slate-400 text-xs mb-0.5">Numéro de suivi</p>
                  <p className="font-mono text-lg font-bold text-blue-300 tracking-widest">{recapData.trackingNumber}</p>
                </div>
                <div className="flex gap-2 shrink-0 print:hidden">
                  <button onClick={handleShare}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                  <button onClick={handlePrint}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                    <PrinterIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Photo */}
            {recapData.packageImageUrl && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex justify-center">
                <img src={recapData.packageImageUrl} alt="Colis" className="max-h-52 rounded-xl object-contain" />
              </div>
            )}

            {/* Grille */}
            <div className="grid md:grid-cols-2 gap-4">

              <RecapCard icon={UserIcon} iconColor="text-blue-500" title="Client">
                <p className="text-sm text-slate-700">
                  {recapData.client
                    ? (clients.find(c => c._id === recapData.client)?.firstName + ' ' + clients.find(c => c._id === recapData.client)?.lastName)
                    : 'Non spécifié'}
                </p>
              </RecapCard>

              <RecapCard icon={CubeIcon} iconColor="text-blue-500" title="Détails du colis">
                <RecapRow label="Poids"           value={`${recapData.weight} kg`} />
                <RecapRow label="Valeur déclarée" value={`${recapData.declaredValue || '—'} €`} />
                <RecapRow label="Description"     value={recapData.description || '—'} />
              </RecapCard>

              <RecapCard icon={MapPinIcon} iconColor="text-blue-500" title="Expéditeur">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {recapData.origin.address}, {recapData.origin.city} {recapData.origin.postalCode}, {recapData.origin.country}
                </p>
                <RecapRow label="Tél"   value={recapData.senderPhone} />
                <RecapRow label="Email" value={recapData.senderEmail} />
              </RecapCard>

              <RecapCard icon={TruckIcon} iconColor="text-emerald-500" title="Destinataire">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {recapData.destination.address}, {recapData.destination.city} {recapData.destination.postalCode}, {recapData.destination.country}
                </p>
                <RecapRow label="Tél"   value={recapData.recipientPhone} />
                <RecapRow label="Email" value={recapData.recipientEmail} />
              </RecapCard>

              <RecapCard icon={CurrencyEuroIcon} iconColor="text-blue-500" title="Expédition & Paiement" full>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <RecapRow label="Service"           value={<span className="capitalize font-semibold">{recapData.service}</span>} />
                    <RecapRow label="Date d'expédition" value={new Date(recapData.expeditionDate).toLocaleDateString('fr-FR')} />
                    <RecapRow label="Arrivée estimée"   value={<span className="text-emerald-600 font-semibold">{recapData.estimatedArrival}</span>} />
                  </div>
                  <div className="space-y-2">
                    <RecapRow label="Montant total" value={`${recapData.totalAmount} €`} />
                    <RecapRow label="Condition"     value={recapData.paymentCondition === 'surplace' ? 'Paiement sur place' : 'Paiement à destination'} />
                    {recapData.paymentCondition === 'surplace' && (
                      <RecapRow label="Déjà payé" value={`${recapData.amountPaid || 0} €`} />
                    )}
                    {recapData.paymentCondition === 'surplace' && recapData.totalAmount && (
                      <RecapRow label="Reste à payer"
                        value={<span className="font-bold text-emerald-600">{remainingAmount} €</span>} />
                    )}
                    <RecapRow label="Assurance" value={recapData.insurance ? 'Oui' : 'Non'} />
                  </div>
                </div>
              </RecapCard>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
              <button onClick={goToTracking}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-md shadow-blue-100">
                Suivre mon colis →
              </button>
              <button onClick={() => navigate('/')}
                className="flex-1 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-sm font-medium transition">
                Retour à l'accueil
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 print:hidden">
              Un email de confirmation a été envoyé à l'expéditeur et au destinataire.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ════════════════════════════════
     FORMULAIRE
  ════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{ backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/65 via-slate-800/55 to-white" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-7 border border-white/20 animate-float">
            <SparklesIcon className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Expédition de colis</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
            Expédiez votre colis
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              en toute simplicité
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Remplissez les informations étape par étape. Notre équipe se charge du reste.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Card formulaire */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 pb-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

          {/* ── Stepper ── */}
          <div className="px-8 py-6 bg-slate-50/80 border-b border-slate-100">
            <div className="relative flex justify-between">
              <div className="absolute top-5 left-[7%] right-[7%] h-px bg-slate-200 -z-10">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
              </div>
              {steps.map((step, idx) => {
                const done   = idx < currentStep;
                const active = idx === currentStep;
                return (
                  <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${done   ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                               : active ? 'bg-white border-blue-600 text-blue-600 shadow-md ring-4 ring-blue-50'
                               : 'bg-white border-slate-200 text-slate-400'}`}>
                      {done ? <CheckCircleIcon className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[11px] font-semibold tracking-wide
                      ${active ? 'text-blue-600' : done ? 'text-slate-600' : 'text-slate-400'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* ── Sidebar ── */}
              <div className="hidden lg:flex lg:col-span-4 items-start">
                <div className="sticky top-8 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center">
                    <div className="w-28 h-28 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                      <img src="https://cdn-icons-png.flaticon.com/512/2942/2942709.png"
                        alt="Colis" className="w-20 h-20 object-contain drop-shadow-lg" />
                    </div>
                    <p className="text-white font-bold text-sm">Étape {currentStep + 1} / {steps.length}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{steps[currentStep].name}</p>
                  </div>
                  <div className="bg-white p-4 space-y-1.5">
                    {steps.map((s, i) => (
                      <div key={s.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition
                        ${i === currentStep ? 'bg-blue-50 border border-blue-100' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                          ${i < currentStep  ? 'bg-emerald-500 text-white'
                          : i === currentStep ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-400'}`}>
                          {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs font-medium
                          ${i === currentStep ? 'text-blue-700'
                          : i < currentStep   ? 'text-slate-600'
                          : 'text-slate-400'}`}>
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Contenu ── */}
              <div className="lg:col-span-8 space-y-8">

                {/* ÉTAPE 0 — Client */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Sélection du client</h2>
                      <p className="text-sm text-slate-500 mt-1">Recherchez un client existant dans votre base de données.</p>
                    </div>
                    <div className="relative">
                      <FieldLabel>Nom ou email du client</FieldLabel>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Rechercher un client..."
                          value={searchClient}
                          onChange={(e) => setSearchClient(e.target.value)}
                          onFocus={() => setShowClientSearch(true)}
                          className={`${inputBase} pl-11 ${errors.client ? 'border-red-400 bg-red-50' : ''}`}
                        />
                      </div>
                      {showClientSearch && searchClient.length > 1 && (
                        <div className="absolute z-20 mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                          {clients.length > 0
                            ? clients.map(client => (
                              <button key={client._id} type="button" onClick={() => selectClient(client)}
                                className="w-full text-left px-5 py-3.5 hover:bg-blue-50 border-b border-slate-100 last:border-none flex items-center gap-3 transition">
                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                                  {client.firstName?.[0]}{client.lastName?.[0]}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-slate-800">{client.firstName} {client.lastName}</p>
                                  <p className="text-xs text-slate-500">{client.email} · {client.phone}</p>
                                </div>
                              </button>
                            ))
                            : <div className="px-5 py-6 text-center text-sm text-slate-400">Aucun client trouvé</div>
                          }
                        </div>
                      )}
                      {errors.client && (
                        <p className="text-xs text-red-500 font-medium mt-1.5">Veuillez sélectionner un client</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ÉTAPE 1 — Colis */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Détails du colis</h2>
                      <p className="text-sm text-slate-500 mt-1">Renseignez les caractéristiques du colis à expédier.</p>
                    </div>

                    <div>
                      <FieldLabel>Photo du colis <span className="normal-case text-slate-400 font-normal">(recommandée)</span></FieldLabel>
                      <div className={`border-2 border-dashed rounded-2xl transition
                        ${packageImage ? 'border-slate-200 p-4' : 'border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/30 p-10 text-center'}`}>
                        {packageImage ? (
                          <div className="relative inline-flex">
                            <img src={packageImage} alt="Colis" className="max-h-52 rounded-xl shadow-md border border-slate-100" />
                            <button type="button" onClick={removeImage}
                              className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center shadow transition">
                              ✕
                            </button>
                          </div>
                        ) : (
                          <>
                            <PhotoIcon className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                            <p className="text-sm text-slate-500 mb-3">Ajoutez une photo de votre colis</p>
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-blue-100">
                              Choisir une photo
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>Poids (kg) *</FieldLabel>
                        <input type="number" step="0.01" placeholder="ex: 2.5"
                          {...register('weight', { required: true, min: 0.1 })}
                          className={`${inputBase} ${errors.weight ? 'border-red-400 bg-red-50' : ''}`} />
                        {errors.weight && <p className="text-xs text-red-500 mt-1">Requis</p>}
                      </div>
                      <div>
                        <FieldLabel>Valeur déclarée (€)</FieldLabel>
                        <input type="number" step="0.01" placeholder="ex: 120.00"
                          {...register('declaredValue')} className={inputBase} />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Description du contenu</FieldLabel>
                      <textarea rows={4} placeholder="Décrivez le contenu du colis..."
                        {...register('description')}
                        className={`${inputBase} resize-none`} />
                    </div>
                  </div>
                )}

                {/* ÉTAPE 2 — Adresses & Contacts */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Adresses & Contacts</h2>
                      <p className="text-sm text-slate-500 mt-1">Renseignez les adresses d'expédition et de livraison.</p>
                    </div>

                    <SectionBlock icon={MapPinIcon} title="Expéditeur — personne qui dépose">
                      <input type="text" placeholder="Adresse complète"
                        {...register('origin.address', { required: true })}
                        className={`${inputBase} ${errors.origin?.address ? 'border-red-400 bg-red-50' : ''}`} />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Ville"
                          {...register('origin.city', { required: true })}
                          className={`${inputBase} ${errors.origin?.city ? 'border-red-400 bg-red-50' : ''}`} />
                        <input type="text" placeholder="Code postal"
                          {...register('origin.postalCode', { required: true })}
                          className={`${inputBase} ${errors.origin?.postalCode ? 'border-red-400 bg-red-50' : ''}`} />
                      </div>
                      <select {...register('origin.country')} className={inputBase}>
                        <option value="FR">France</option>
                        <option value="BE">Belgique</option>
                        <option value="CH">Suisse</option>
                      </select>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" placeholder="Téléphone expéditeur"
                            {...register('senderPhone', { required: true })}
                            className={`${inputBase} pl-11 ${errors.senderPhone ? 'border-red-400 bg-red-50' : ''}`} />
                        </div>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" placeholder="Email expéditeur"
                            {...register('senderEmail', { required: true })}
                            className={`${inputBase} pl-11 ${errors.senderEmail ? 'border-red-400 bg-red-50' : ''}`} />
                        </div>
                      </div>
                    </SectionBlock>

                    <SectionBlock icon={TruckIcon} iconColor="text-emerald-500" title="Destinataire — personne qui récupère">
                      <input type="text" placeholder="Adresse complète"
                        {...register('destination.address', { required: true })}
                        className={`${inputBase} ${errors.destination?.address ? 'border-red-400 bg-red-50' : ''}`} />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Ville"
                          {...register('destination.city', { required: true })}
                          className={`${inputBase} ${errors.destination?.city ? 'border-red-400 bg-red-50' : ''}`} />
                        <input type="text" placeholder="Code postal"
                          {...register('destination.postalCode', { required: true })}
                          className={`${inputBase} ${errors.destination?.postalCode ? 'border-red-400 bg-red-50' : ''}`} />
                      </div>
                      <select {...register('destination.country')} className={inputBase}>
                        <option value="FR">France</option>
                        <option value="BE">Belgique</option>
                        <option value="CH">Suisse</option>
                      </select>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" placeholder="Téléphone destinataire"
                            {...register('recipientPhone', { required: true })}
                            className={`${inputBase} pl-11 ${errors.recipientPhone ? 'border-red-400 bg-red-50' : ''}`} />
                        </div>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" placeholder="Email destinataire"
                            {...register('recipientEmail', { required: true })}
                            className={`${inputBase} pl-11 ${errors.recipientEmail ? 'border-red-400 bg-red-50' : ''}`} />
                        </div>
                      </div>
                    </SectionBlock>
                  </div>
                )}

                {/* ÉTAPE 3 — Expédition & Paiement */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Expédition & Paiement</h2>
                      <p className="text-sm text-slate-500 mt-1">Choisissez le service et configurez le paiement.</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4">
                      <CalendarIcon className="w-7 h-7 text-blue-500 shrink-0" />
                      <div className="flex-1">
                        <FieldLabel>Date d'expédition *</FieldLabel>
                        <input type="date" {...register('expeditionDate', { required: true })}
                          className={`${inputBase} ${errors.expeditionDate ? 'border-red-400 bg-red-50' : ''}`} />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <FieldLabel>Type de service</FieldLabel>
                      <div className="grid grid-cols-3 gap-3">
                        {['standard', 'express', 'premium'].map(type => (
                          <label key={type}
                            className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all
                              ${service === type
                                ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                                : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                            <input type="radio" value={type} {...register('service')} className="sr-only" />
                            <p className="font-bold text-sm capitalize text-slate-800">{type}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {type === 'standard' && '3–5 jours'}
                              {type === 'express'  && '24–48 h'}
                              {type === 'premium'  && 'Jour même'}
                            </p>
                            {service === type && (
                              <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">✓</span>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Arrivée estimée */}
                    <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                      <CalendarIcon className="w-7 h-7 text-blue-500 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-0.5">Arrivée estimée</p>
                        <p className="text-sm font-bold text-blue-800 capitalize">{estimatedArrival}</p>
                      </div>
                    </div>

                    {/* Montant */}
                    <div>
                      <FieldLabel>Montant total à payer (€) *</FieldLabel>
                      <div className="relative">
                        <CurrencyEuroIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="number" step="0.01" placeholder="Ex: 45.50"
                          {...register('totalAmount', { required: true, min: 0 })}
                          className={`${inputBase} pl-11 ${errors.totalAmount ? 'border-red-400 bg-red-50' : ''}`} />
                      </div>
                    </div>

                    {/* Condition paiement */}
                    <div>
                      <FieldLabel>Condition de paiement</FieldLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'surplace',    label: 'Paiement sur place' },
                          { value: 'destination', label: 'Paiement à destination' },
                        ].map(opt => (
                          <label key={opt.value}
                            className={`cursor-pointer rounded-xl border-2 px-4 py-3.5 text-center text-sm font-semibold transition
                              ${paymentCondition === opt.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                            <input type="radio" value={opt.value} {...register('paymentCondition')} className="sr-only" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Détail surplace */}
                    {paymentCondition === 'surplace' && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-4">
                        <div>
                          <FieldLabel>Montant déjà payé (€)</FieldLabel>
                          <input type="number" step="0.01" placeholder="0.00"
                            {...register('amountPaid')} className={inputBase} />
                        </div>
                        {totalAmount && (
                          <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden text-sm">
                            <div className="flex justify-between px-5 py-3 border-b border-slate-100">
                              <span className="text-slate-500">Total</span>
                              <span className="font-semibold">{totalAmount} €</span>
                            </div>
                            <div className="flex justify-between px-5 py-3 border-b border-slate-100">
                              <span className="text-slate-500">Déjà payé</span>
                              <span className="font-semibold text-blue-600">{amountPaid || '0.00'} €</span>
                            </div>
                            <div className="flex justify-between px-5 py-3 font-bold text-emerald-700">
                              <span>Reste</span>
                              <span>{remainingAmount} €</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Assurance */}
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition">
                      <input type="checkbox" {...register('insurance')} className="w-4 h-4 accent-blue-600 rounded" />
                      <span className="text-sm font-medium text-slate-700">Ajouter une assurance transport</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* ── Navigation ── */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
              <button type="button" onClick={prevStep}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition
                  ${currentStep === 0 ? 'invisible' : ''}`}>
                <ArrowLeftIcon className="w-4 h-4" /> Précédent
              </button>

              {currentStep < steps.length - 1
                ? (
                  <button type="button" onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition shadow-md shadow-blue-100">
                    Suivant <ArrowRightIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={loading}
                    className="flex items-center gap-2 px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition shadow-md shadow-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</>
                      : <><TruckIcon className="w-4 h-4" /> Confirmer l'envoi</>
                    }
                  </button>
                )
              }
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ── Helpers récap ── */
const RecapCard = ({ icon: Icon, iconColor, title, children, full }) => (
  <div className={`bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden ${full ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</span>
    </div>
    <div className="px-5 py-4 space-y-2">{children}</div>
  </div>
);

const RecapRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-slate-400">{label}</span>
    <span className="text-xs font-semibold text-slate-700">{value}</span>
  </div>
);

export default AddPackage;