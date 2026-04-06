// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeftIcon,
//   PencilIcon,
//   PrinterIcon,
//   TruckIcon,
//   DocumentTextIcon,
// } from '@heroicons/react/24/outline';
// import { toast } from 'react-toastify';
// import axios from '../../api/axios';
// import Timeline from '../../components/Common/Timeline';
// import Modal from '../../components/Common/Modal';

// const PackageDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [package_, setPackage] = useState(null);
//   const [tracking, setTracking] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [newStatus, setNewStatus] = useState({
//     status: '',
//     location: '',
//     description: '',
//   });

//   useEffect(() => {
//     fetchPackageData();
//   }, [id]);

//   const fetchPackageData = async () => {
//     try {
//       const [packageRes, trackingRes] = await Promise.all([
//         axios.get(`/packages/${id}`),
//         axios.get(`/packages/${id}/tracking`),
//       ]);

//       setPackage(packageRes.data);
//       setTracking(trackingRes.data);
//     } catch (error) {
//       toast.error('Erreur lors du chargement des données');
//       navigate('/packages');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`/packages/${id}/tracking`, newStatus);
//       toast.success('Statut mis à jour avec succès');
//       setShowStatusModal(false);
//       fetchPackageData();
//       setNewStatus({ status: '', location: '', description: '' });
//     } catch (error) {
//       toast.error('Erreur lors de la mise à jour');
//     }
//   };

//   const handleGenerateLabel = async () => {
//     try {
//       const response = await axios.get(`/packages/${id}/label`, {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `etiquette-${package_.trackingNumber}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       toast.error('Erreur lors de la génération de l\'étiquette');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       'en attente': 'badge-warning',
//       'en transit': 'badge-info',
//       'livré': 'badge-success',
//       'retardé': 'badge-danger',
//       'annulé': 'badge-danger',
//     };
//     return statusConfig[status] || 'badge-info';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => navigate('/packages')}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Colis {package_.trackingNumber}
//             </h1>
//             <p className="text-gray-600">
//               Créé le {new Date(package_.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//           <span className={getStatusBadge(package_.status)}>
//             {package_.status}
//           </span>
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={handleGenerateLabel}
//             className="btn-secondary flex items-center space-x-2"
//           >
//             <PrinterIcon className="w-4 h-4" />
//             <span>Étiquette</span>
//           </button>
//           <button
//             onClick={() => setShowStatusModal(true)}
//             className="btn-primary flex items-center space-x-2"
//           >
//             <TruckIcon className="w-4 h-4" />
//             <span>Mettre à jour statut</span>
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left column - Package info */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Package details */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Détails du colis
//             </h3>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-gray-500">Poids</p>
//                 <p className="text-lg font-medium">{package_.weight} kg</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Dimensions</p>
//                 <p className="text-lg font-medium">
//                   {package_.dimensions?.length} x {package_.dimensions?.width} x {package_.dimensions?.height} cm
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Valeur déclarée</p>
//                 <p className="text-lg font-medium">{package_.declaredValue} €</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Frais d'expédition</p>
//                 <p className="text-lg font-medium">{package_.shippingCost} €</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm text-gray-500">Description</p>
//                 <p className="text-gray-900">{package_.description || 'Aucune description'}</p>
//               </div>
//             </div>
//           </div>

//           {/* Addresses */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Adresses
//             </h3>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm font-medium text-gray-700 mb-2">Adresse d'expédition</p>
//                 <div className="text-gray-600">
//                   <p>{package_.origin.address}</p>
//                   <p>{package_.origin.city}, {package_.origin.postalCode}</p>
//                   <p>{package_.origin.country}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-700 mb-2">Adresse de livraison</p>
//                 <div className="text-gray-600">
//                   <p>{package_.destination.address}</p>
//                   <p>{package_.destination.city}, {package_.destination.postalCode}</p>
//                   <p>{package_.destination.country}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Client info */}
//           {package_.client && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Informations client
//               </h3>
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
//                   <span className="text-primary-600 font-medium text-lg">
//                     {package_.client.firstName?.[0]}{package_.client.lastName?.[0]}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">
//                     {package_.client.firstName} {package_.client.lastName}
//                   </p>
//                   <p className="text-sm text-gray-500">{package_.client.email}</p>
//                   <p className="text-sm text-gray-500">{package_.client.phone}</p>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/clients/${package_.client._id}`)}
//                   className="ml-auto btn-secondary text-sm"
//                 >
//                   Voir profil
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right column - Tracking timeline */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Historique de suivi
//             </h3>
//             <Timeline
//               items={tracking.map(t => ({
//                 title: t.status,
//                 description: t.description,
//                 location: t.location,
//                 date: t.timestamp,
//                 status: t.status === 'livré' ? 'success' : 
//                        t.status === 'en transit' ? 'info' : 'default',
//               }))}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Status Update Modal */}
//       <Modal
//         isOpen={showStatusModal}
//         onClose={() => setShowStatusModal(false)}
//         title="Mettre à jour le statut"
//       >
//         <form onSubmit={handleStatusUpdate} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Nouveau statut
//             </label>
//             <select
//               value={newStatus.status}
//               onChange={(e) => setNewStatus({ ...newStatus, status: e.target.value })}
//               className="input-field"
//               required
//             >
//               <option value="">Sélectionner...</option>
//               <option value="pris en charge">Pris en charge</option>
//               <option value="en transit">En transit</option>
//               <option value="arrivé au hub">Arrivé au hub</option>
//               <option value="en livraison">En livraison</option>
//               <option value="livré">Livré</option>
//               <option value="retardé">Retardé</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Localisation
//             </label>
//             <input
//               type="text"
//               value={newStatus.location}
//               onChange={(e) => setNewStatus({ ...newStatus, location: e.target.value })}
//               className="input-field"
//               placeholder="Ville, pays"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               value={newStatus.description}
//               onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
//               className="input-field"
//               rows="3"
//               placeholder="Détails de la mise à jour..."
//             />
//           </div>
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="btn-secondary"
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="btn-primary"
//             >
//               Mettre à jour
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default PackageDetail;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PrinterIcon, TruckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Timeline from '../../components/Common/Timeline';
import Modal from '../../components/Common/Modal';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [package_, setPackage] = useState(null);
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState({ status: '', location: '', description: '' });

  useEffect(() => {
    fetchPackageData();
  }, [id]);

  const fetchPackageData = async () => {
    try {
      const [packageRes, trackingRes] = await Promise.all([
        axios.get(`/packages/${id}`),
        axios.get(`/packages/${id}/tracking`),
      ]);
      setPackage(packageRes.data);
      setTracking(trackingRes.data);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du chargement des données');
      navigate('/app/packages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/packages/${id}/tracking`, newStatus);
      toast.success('Statut mis à jour');
      setShowStatusModal(false);
      fetchPackageData();
      setNewStatus({ status: '', location: '', description: '' });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleGenerateLabel = async () => {
    if (!package_) return;
    try {
      const response = await axios.get(`/packages/${id}/label`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `etiquette-${package_.trackingNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Erreur lors de la génération de l\'étiquette');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'en attente': 'badge-warning',
      'en transit': 'badge-info',
      'livré': 'badge-success',
      'retardé': 'badge-danger',
      'annulé': 'badge-danger',
    };
    return config[status] || 'badge-info';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!package_) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">Colis non trouvé</p>
        <button onClick={() => navigate('/app/packages')} className="btn-primary mt-4">
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/app/packages')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Colis {package_.trackingNumber}</h1>
            <p className="text-gray-600">Créé le {new Date(package_.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={getStatusBadge(package_.status)}>{package_.status}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleGenerateLabel} className="btn-secondary flex items-center space-x-2">
            <PrinterIcon className="w-4 h-4" />
            <span>Étiquette</span>
          </button>
          <button onClick={() => setShowStatusModal(true)} className="btn-primary flex items-center space-x-2">
            <TruckIcon className="w-4 h-4" />
            <span>Mettre à jour statut</span>
          </button>
        </div>
      </div>

      {/* Détails du colis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du colis</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-sm text-gray-500">Poids</p><p className="text-lg font-medium">{package_.weight} kg</p></div>
              <div><p className="text-sm text-gray-500">Dimensions</p><p className="text-lg font-medium">{package_.dimensions?.length} x {package_.dimensions?.width} x {package_.dimensions?.height} cm</p></div>
              <div><p className="text-sm text-gray-500">Valeur déclarée</p><p className="text-lg font-medium">{package_.declaredValue} €</p></div>
              <div><p className="text-sm text-gray-500">Frais d'expédition</p><p className="text-lg font-medium">{package_.shippingCost} €</p></div>
              <div className="col-span-2"><p className="text-sm text-gray-500">Description</p><p>{package_.description || 'Aucune description'}</p></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresses</h3>
            <div className="grid grid-cols-2 gap-6">
              <div><p className="text-sm font-medium text-gray-700 mb-2">Expédition</p>
                <div className="text-gray-600">
                  <p>{package_.origin?.address}</p>
                  <p>{package_.origin?.city}, {package_.origin?.postalCode}</p>
                  <p>{package_.origin?.country}</p>
                </div>
              </div>
              <div><p className="text-sm font-medium text-gray-700 mb-2">Livraison</p>
                <div className="text-gray-600">
                  <p>{package_.destination?.address}</p>
                  <p>{package_.destination?.city}, {package_.destination?.postalCode}</p>
                  <p>{package_.destination?.country}</p>
                </div>
              </div>
            </div>
          </div>

          {package_.client && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-lg">{package_.client.firstName?.[0]}{package_.client.lastName?.[0]}</span>
                </div>
                <div>
                  <p className="font-medium">{package_.client.firstName} {package_.client.lastName}</p>
                  <p className="text-sm text-gray-500">{package_.client.email}</p>
                </div>
                <button onClick={() => navigate(`/app/clients/${package_.client._id}`)} className="ml-auto btn-secondary text-sm">Voir profil</button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique de suivi</h3>
            <Timeline items={tracking.map(t => ({ title: t.status, description: t.description, location: t.location, date: t.timestamp }))} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} title="Mettre à jour le statut">
        <form onSubmit={handleStatusUpdate} className="space-y-4">
          <select value={newStatus.status} onChange={(e) => setNewStatus({ ...newStatus, status: e.target.value })} className="input-field" required>
            <option value="">Sélectionner...</option>
            <option value="pris en charge">Pris en charge</option>
            <option value="en transit">En transit</option>
            <option value="arrivé au hub">Arrivé au hub</option>
            <option value="en livraison">En livraison</option>
            <option value="livré">Livré</option>
            <option value="retardé">Retardé</option>
          </select>
          <input type="text" placeholder="Localisation" value={newStatus.location} onChange={(e) => setNewStatus({ ...newStatus, location: e.target.value })} className="input-field" required />
          <textarea placeholder="Description" rows="3" value={newStatus.description} onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })} className="input-field" />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setShowStatusModal(false)} className="btn-secondary">Annuler</button>
            <button type="submit" className="btn-primary">Mettre à jour</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PackageDetail;