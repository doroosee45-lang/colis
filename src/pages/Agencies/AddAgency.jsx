// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import axios from '../../api/axios';

// const AddAgency = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       name: '',
//       code: '',
//       address: {
//         street: '',
//         city: '',
//         postalCode: '',
//         country: 'FR',
//       },
//       phone: '',
//       email: '',
//       manager: '',
//       status: 'actif',
//       openingHours: {
//         monday: '09:00-18:00',
//         tuesday: '09:00-18:00',
//         wednesday: '09:00-18:00',
//         thursday: '09:00-18:00',
//         friday: '09:00-18:00',
//         saturday: '09:00-12:00',
//         sunday: 'Fermé',
//       },
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await axios.post('/agencies', data);
//       toast.success('Agence créée avec succès');
//       navigate('/agencies');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Erreur lors de la création');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Nouvelle agence</h1>
//         <p className="text-gray-600">Créez une nouvelle agence ou succursale</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Nom de l'agence *
//               </label>
//               <input
//                 type="text"
//                 {...register('name', { required: 'Le nom est requis' })}
//                 className="input-field"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Code agence *
//               </label>
//               <input
//                 type="text"
//                 {...register('code', { 
//                   required: 'Le code est requis',
//                   pattern: {
//                     value: /^[A-Z0-9]{3,10}$/,
//                     message: 'Le code doit contenir 3-10 caractères majuscules ou chiffres'
//                   }
//                 })}
//                 className="input-field"
//                 placeholder="EX: PAR01"
//               />
//               {errors.code && (
//                 <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Téléphone
//               </label>
//               <input
//                 type="tel"
//                 {...register('phone')}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...register('email', {
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: 'Email invalide',
//                   },
//                 })}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Statut
//               </label>
//               <select {...register('status')} className="input-field">
//                 <option value="actif">Actif</option>
//                 <option value="inactif">Inactif</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Address */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Rue *
//               </label>
//               <input
//                 type="text"
//                 {...register('address.street', { required: "L'adresse est requise" })}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Ville *
//               </label>
//               <input
//                 type="text"
//                 {...register('address.city', { required: "La ville est requise" })}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Code postal *
//               </label>
//               <input
//                 type="text"
//                 {...register('address.postalCode', { required: "Le code postal est requis" })}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pays *
//               </label>
//               <select
//                 {...register('address.country', { required: "Le pays est requis" })}
//                 className="input-field"
//               >
//                 <option value="FR">France</option>
//                 <option value="BE">Belgique</option>
//                 <option value="CH">Suisse</option>
//                 <option value="LU">Luxembourg</option>
//                 <option value="CA">Canada</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Opening Hours */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
//           <div className="space-y-4">
//             {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
//               <div key={day} className="grid grid-cols-3 gap-4 items-center">
//                 <label className="text-sm font-medium text-gray-700 capitalize">
//                   {day === 'monday' ? 'Lundi' :
//                    day === 'tuesday' ? 'Mardi' :
//                    day === 'wednesday' ? 'Mercredi' :
//                    day === 'thursday' ? 'Jeudi' :
//                    day === 'friday' ? 'Vendredi' :
//                    day === 'saturday' ? 'Samedi' : 'Dimanche'}
//                 </label>
//                 <div className="col-span-2">
//                   <input
//                     type="text"
//                     {...register(`openingHours.${day}`)}
//                     className="input-field"
//                     placeholder="09:00-18:00 ou Fermé"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={() => navigate('/agencies')}
//             className="btn-secondary"
//           >
//             Annuler
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="btn-primary"
//           >
//             {loading ? 'Création...' : 'Créer l\'agence'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddAgency;







import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import agencyService from '../../services/Agencyservice';

const DAYS = [
  { key: 'monday',    label: 'Lundi'    },
  { key: 'tuesday',   label: 'Mardi'    },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday',  label: 'Jeudi'    },
  { key: 'friday',    label: 'Vendredi' },
  { key: 'saturday',  label: 'Samedi'   },
  { key: 'sunday',    label: 'Dimanche' },
];

const AddAgency = () => {
  const navigate   = useNavigate();
  const { id }     = useParams();          // présent si mode édition
  const isEdit     = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      address: { street: '', city: '', country: 'RDC' },
      phone:  '',
      email:  '',
      status: 'actif',
      openingHours: {
        monday: '09:00-18:00', tuesday: '09:00-18:00',
        wednesday: '09:00-18:00', thursday: '09:00-18:00',
        friday: '09:00-18:00', saturday: '09:00-12:00', sunday: 'Fermé',
      },
    },
  });

  // ── Charger les données en mode édition ──
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await agencyService.getById(id);
        reset(res.data.data);
      } catch {
        toast.error('Agence introuvable');
        navigate('/app/agencies');
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  // ── Soumission ──
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await agencyService.update(id, data);
        toast.success('Agence mise à jour avec succès');
      } else {
        await agencyService.create(data);
        toast.success('Agence créée avec succès');
      }
      navigate('/app/agencies');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/app/agencies')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              {isEdit ? 'Modifier l\'agence' : 'Nouvelle agence'}
            </h1>
            <p className="text-sm text-slate-500">
              {isEdit ? 'Mettez à jour les informations' : 'Créez une nouvelle agence ou succursale'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Formulaire ── */}
      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Informations générales */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-5">Informations générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Nom de l'agence <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Le nom est requis' })}
                  placeholder="Ex: LogiTrack Kinshasa"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+243 81 000 0000"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                  })}
                  placeholder="agence@logitrack.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors appearance-none cursor-pointer"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>

            </div>
          </div>

          {/* Adresse */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-5">Adresse</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Rue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('address.street', { required: "L'adresse est requise" })}
                  placeholder="123 Avenue Principale"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                />
                {errors.address?.street && <p className="mt-1 text-xs text-red-500">{errors.address.street.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('address.city', { required: 'La ville est requise' })}
                  placeholder="Kinshasa"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                />
                {errors.address?.city && <p className="mt-1 text-xs text-red-500">{errors.address.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Pays <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('address.country', { required: 'Le pays est requis' })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors appearance-none cursor-pointer"
                >
                  <option value="RDC">RDC</option>
                  <option value="Canada">Canada</option>
                  <option value="Cameroun">Cameroun</option>
                  <option value="Benin">Bénin</option>
                  <option value="Brazzaville">Brazzaville</option>
                </select>
              </div>

            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-5">Horaires d'ouverture</h3>
            <div className="space-y-3">
              {DAYS.map(({ key, label }) => (
                <div key={key} className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-slate-600">{label}</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      {...register(`openingHours.${key}`)}
                      placeholder="09:00-18:00 ou Fermé"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-6">
            <button
              type="button"
              onClick={() => navigate('/app/agencies')}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading
                ? (isEdit ? 'Mise à jour...' : 'Création...')
                : (isEdit ? 'Enregistrer les modifications' : 'Créer l\'agence')
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddAgency;


