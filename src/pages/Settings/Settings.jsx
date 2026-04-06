// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   BellIcon,
//   LockClosedIcon,
//   GlobeAltIcon,
//   PaintBrushIcon,
//   DevicePhoneMobileIcon,
//   EnvelopeIcon,
// } from '@heroicons/react/24/outline';
// import { toast } from 'react-toastify';
// import axios from '../../api/axios';

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const [settings, setSettings] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     try {
//       const response = await axios.get('/settings');
//       setSettings(response.data);
//       reset(response.data);
//     } catch (error) {
//       toast.error('Erreur lors du chargement des paramètres');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       await axios.put('/settings', data);
//       toast.success('Paramètres mis à jour avec succès');
//     } catch (error) {
//       toast.error('Erreur lors de la mise à jour');
//     }
//   };

//   const tabs = [
//     { id: 'general', name: 'Général', icon: GlobeAltIcon },
//     { id: 'notifications', name: 'Notifications', icon: BellIcon },
//     { id: 'security', name: 'Sécurité', icon: LockClosedIcon },
//     { id: 'appearance', name: 'Apparence', icon: PaintBrushIcon },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
//         <p className="text-gray-600">Gérez vos préférences et configurations</p>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
//                 activeTab === tab.id
//                   ? 'border-primary-600 text-primary-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               <span>{tab.name}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Content */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {activeTab === 'general' && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres généraux</h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Langue
//                 </label>
//                 <select {...register('language')} className="input-field">
//                   <option value="fr">Français</option>
//                   <option value="en">English</option>
//                   <option value="es">Español</option>
//                   <option value="de">Deutsch</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Fuseau horaire
//                 </label>
//                 <select {...register('timezone')} className="input-field">
//                   <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
//                   <option value="Europe/London">Europe/London (GMT+0)</option>
//                   <option value="America/New_York">America/New_York (GMT-5)</option>
//                   <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Format de date
//                 </label>
//                 <select {...register('dateFormat')} className="input-field">
//                   <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                   <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                   <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Devise par défaut
//                 </label>
//                 <select {...register('currency')} className="input-field">
//                   <option value="EUR">Euro (€)</option>
//                   <option value="USD">Dollar ($)</option>
//                   <option value="GBP">Livre (£)</option>
//                   <option value="CHF">Franc suisse (CHF)</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'notifications' && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-900">Notifications email</p>
//                   <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input type="checkbox" {...register('emailNotifications')} className="sr-only peer" />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-900">Notifications SMS</p>
//                   <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input type="checkbox" {...register('smsNotifications')} className="sr-only peer" />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
//                 </label>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-medium text-gray-900">Notifications push</p>
//                   <p className="text-sm text-gray-500">Recevoir les notifications dans le navigateur</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input type="checkbox" {...register('pushNotifications')} className="sr-only peer" />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
//                 </label>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Notifications à recevoir</h4>
                
//                 <div className="space-y-2">
//                   <label className="flex items-center space-x-3">
//                     <input type="checkbox" {...register('notifyNewPackage')} className="h-4 w-4 text-primary-600 rounded" />
//                     <span className="text-sm text-gray-700">Nouveau colis créé</span>
//                   </label>
//                   <label className="flex items-center space-x-3">
//                     <input type="checkbox" {...register('notifyStatusUpdate')} className="h-4 w-4 text-primary-600 rounded" />
//                     <span className="text-sm text-gray-700">Mise à jour de statut</span>
//                   </label>
//                   <label className="flex items-center space-x-3">
//                     <input type="checkbox" {...register('notifyPayment')} className="h-4 w-4 text-primary-600 rounded" />
//                     <span className="text-sm text-gray-700">Paiement reçu</span>
//                   </label>
//                   <label className="flex items-center space-x-3">
//                     <input type="checkbox" {...register('notifyMarketplace')} className="h-4 w-4 text-primary-600 rounded" />
//                     <span className="text-sm text-gray-700">Activité marketplace</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'security' && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mot de passe actuel
//                 </label>
//                 <input
//                   type="password"
//                   {...register('currentPassword')}
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Nouveau mot de passe
//                 </label>
//                 <input
//                   type="password"
//                   {...register('newPassword')}
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirmer le nouveau mot de passe
//                 </label>
//                 <input
//                   type="password"
//                   {...register('confirmPassword')}
//                   className="input-field"
//                 />
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
//                     <p className="text-sm text-gray-500">Sécuriser votre compte avec 2FA</p>
//                   </div>
//                   <button type="button" className="btn-secondary text-sm">
//                     Activer
//                   </button>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Sessions actives</h4>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Chrome • Paris, France</p>
//                       <p className="text-sm text-gray-500">Dernière activité: il y a 2 minutes</p>
//                     </div>
//                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                       Actuelle
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Firefox • Lyon, France</p>
//                       <p className="text-sm text-gray-500">Dernière activité: il y a 2 jours</p>
//                     </div>
//                     <button type="button" className="text-red-600 hover:text-red-800 text-sm">
//                       Déconnecter
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'appearance' && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Apparence</h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Thème
//                 </label>
//                 <select {...register('theme')} className="input-field">
//                   <option value="light">Clair</option>
//                   <option value="dark">Sombre</option>
//                   <option value="system">Système</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Taille de police
//                 </label>
//                 <select {...register('fontSize')} className="input-field">
//                   <option value="small">Petite</option>
//                   <option value="medium">Moyenne</option>
//                   <option value="large">Grande</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Densité d'affichage
//                 </label>
//                 <select {...register('density')} className="input-field">
//                   <option value="comfortable">Confortable</option>
//                   <option value="compact">Compact</option>
//                 </select>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <h4 className="font-medium text-gray-900 mb-3">Couleurs</h4>
//                 <div className="grid grid-cols-4 gap-3">
//                   {['primary', 'success', 'warning', 'danger'].map((color) => (
//                     <button
//                       key={color}
//                       type="button"
//                       className={`h-10 rounded-lg border-2 ${
//                         settings?.themeColor === color
//                           ? 'border-gray-900'
//                           : 'border-transparent'
//                       }`}
//                       style={{
//                         backgroundColor: 
//                           color === 'primary' ? '#3b82f6' :
//                           color === 'success' ? '#10b981' :
//                           color === 'warning' ? '#f59e0b' : '#ef4444'
//                       }}
//                       onClick={() => {/* Update color */}}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Save Button */}
//         <div className="flex justify-end">
//           <button type="submit" className="btn-primary">
//             Enregistrer les modifications
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Settings;





















import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  BellIcon,
  LockClosedIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/settings');
      setSettings(response.data);
      reset(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put('/settings', data);
      toast.success('Paramètres mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const tabs = [
    { id: 'general', name: 'Général', icon: GlobeAltIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Sécurité', icon: LockClosedIcon },
    { id: 'appearance', name: 'Apparence', icon: PaintBrushIcon },
  ];

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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
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
            <span className="text-sm font-medium tracking-wider uppercase">Paramètres</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Personnalisez votre espace
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              gérez vos préférences
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Modifiez les paramètres généraux, les notifications, la sécurité et l’apparence.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-12 relative z-10 space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Gérez vos préférences et configurations</p>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Général */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paramètres généraux</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select {...register('language')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuseau horaire</label>
                  <select {...register('timezone')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="America/New_York">America/New_York (GMT-5)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format de date</label>
                  <select {...register('dateFormat')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Devise par défaut</label>
                  <select {...register('currency')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollar ($)</option>
                    <option value="GBP">Livre (£)</option>
                    <option value="CHF">Franc suisse (CHF)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications email</p>
                    <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('emailNotifications')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications SMS</p>
                    <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('smsNotifications')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications push</p>
                    <p className="text-sm text-gray-500">Recevoir les notifications dans le navigateur</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('pushNotifications')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Notifications à recevoir</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register('notifyNewPackage')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Nouveau colis créé</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register('notifyStatusUpdate')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Mise à jour de statut</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register('notifyPayment')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Paiement reçu</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" {...register('notifyMarketplace')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Activité marketplace</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sécurité</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                  <input type="password" {...register('currentPassword')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input type="password" {...register('newPassword')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                  <input type="password" {...register('confirmPassword')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
                      <p className="text-sm text-gray-500">Sécuriser votre compte avec 2FA</p>
                    </div>
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition">Activer</button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Sessions actives</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Chrome • Paris, France</p>
                        <p className="text-sm text-gray-500">Dernière activité : il y a 2 minutes</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actuelle</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Firefox • Lyon, France</p>
                        <p className="text-sm text-gray-500">Dernière activité : il y a 2 jours</p>
                      </div>
                      <button type="button" className="text-red-600 hover:text-red-800 text-sm">Déconnecter</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Apparence */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Apparence</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thème</label>
                  <select {...register('theme')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="system">Système</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taille de police</label>
                  <select {...register('fontSize')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="small">Petite</option>
                    <option value="medium">Moyenne</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Densité d'affichage</label>
                  <select {...register('density')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                    <option value="comfortable">Confortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Couleurs</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {['primary', 'success', 'warning', 'danger'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`h-10 rounded-lg border-2 transition ${
                          settings?.themeColor === color ? 'border-gray-900' : 'border-transparent'
                        }`}
                        style={{
                          backgroundColor:
                            color === 'primary' ? '#3b82f6' :
                            color === 'success' ? '#10b981' :
                            color === 'warning' ? '#f59e0b' : '#ef4444'
                        }}
                        onClick={() => {/* à implémenter */}}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bouton d'enregistrement */}
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;