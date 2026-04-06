// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from '../../api/axios'; // adapte le chemin

// const PackageDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [packageData, setPackageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPackage = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         // Corrige l'URL : utilise l'ID du colis, pas "PackagesList"
//         const response = await axios.get(`/packages/${id}`);
//         // Supposons que la réponse est { data: { ... } } ou directement l'objet
//         const data = response.data?.data || response.data;
//         setPackageData(data);
//       } catch (err) {
//         console.error('Erreur chargement colis:', err);
//         setError("Impossible de charger les détails du colis");
//         toast.error("Erreur lors du chargement du colis");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackage();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center py-10">Chargement...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={() => navigate('/packages')}
//           className="mt-4 btn-primary"
//         >
//           Retour à la liste
//         </button>
//       </div>
//     );
//   }

//   if (!packageData) {
//     return (
//       <div className="text-center py-10">
//         <p>Colis non trouvé</p>
//         <button
//           onClick={() => navigate('/packages')}
//           className="mt-4 btn-primary"
//         >
//           Retour à la liste
//         </button>
//       </div>
//     );
//   }

//   // Maintenant on peut utiliser packageData en toute sécurité
//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Détail du colis</h1>
//         <button
//           onClick={() => navigate('/packages')}
//           className="btn-secondary"
//         >
//           Retour
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">N° de suivi</p>
//             <p className="font-mono font-medium">{packageData.trackingNumber}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Statut</p>
//             <p className="font-medium">{packageData.status}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Client</p>
//             <p>{packageData.client?.firstName} {packageData.client?.lastName}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Destination</p>
//             <p>{packageData.destination?.city}, {packageData.destination?.country}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Poids (kg)</p>
//             <p>{packageData.weight?.toFixed(2)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Date de création</p>
//             <p>{new Date(packageData.createdAt).toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDetail;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, EyeIcon, TruckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import { CubeIcon } from '@heroicons/react/24/outline';

const PackagesList = () => {
  const [packages, setPackages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
    fetchStats();
  }, [filters]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/packages?${params}`);
      setPackages(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des colis');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/packages/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en attente': 'badge-warning',
      'en transit': 'badge-info',
      'livré': 'badge-success',
      'retardé': 'badge-danger',
      'annulé': 'badge-danger',
    };
    return statusConfig[status] || 'badge-info';
  };

  const columns = [
    {
      key: 'trackingNumber',
      label: 'N° Suivi',
      render: (val) => <span className="font-mono text-sm font-medium text-primary-600">{val}</span>,
      sortable: true,
    },
    {
      key: 'client',
      label: 'Client',
      render: (val) => val ? `${val.firstName} ${val.lastName}` : '-',
      sortable: true,
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (val) => (
        <div>
          <div className="font-medium">{val.city}</div>
          <div className="text-xs text-gray-500">{val.country}</div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'weight',
      label: 'Poids (kg)',
      render: (val) => val?.toFixed(2),
      sortable: true,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => <span className={getStatusBadge(val)}>{val}</span>,
      sortable: true,
    },
    {
      key: 'createdAt',
      label: 'Date création',
      render: (val) => new Date(val).toLocaleDateString(),
      sortable: true,
    },
    {
      key: 'estimatedDelivery',
      label: 'Livraison estimée',
      render: (val) => val ? new Date(val).toLocaleDateString() : '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/packages/${row._id}`); // ← préfixe /app
            }}
            className="text-blue-600 hover:text-blue-900"
            title="Voir détails"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/packages/${row._id}/tracking`); // ← préfixe /app
            }}
            className="text-green-600 hover:text-green-900"
            title="Tracking"
          >
            <TruckIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colis</h1>
          <p className="text-gray-600">Gérez tous les colis</p>
        </div>
        <button
          onClick={() => navigate('/app/packages/add')} // ← préfixe /app
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nouveau colis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total colis" value={stats.total || 0} icon={CubeIcon} color="primary" />
        <StatCard title="En transit" value={stats.inTransit || 0} icon={TruckIcon} color="warning" />
        <StatCard title="Livrés" value={stats.delivered || 0} icon={CubeIcon} color="success" />
        <StatCard title="En attente" value={stats.pending || 0} icon={CubeIcon} color="info" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Rechercher..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="input-field" />
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="input-field">
            <option value="">Tous les statuts</option>
            <option value="en attente">En attente</option>
            <option value="en transit">En transit</option>
            <option value="livré">Livré</option>
            <option value="retardé">Retardé</option>
            <option value="annulé">Annulé</option>
          </select>
          <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="input-field" />
          <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="input-field" />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={() => setFilters({ search: '', status: '', destination: '', dateFrom: '', dateTo: '' })} className="btn-secondary">
            Réinitialiser
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={packages} onRowClick={(row) => navigate(`/app/packages/${row._id}`)} loading={loading} />
    </div>
  );
};

export default PackagesList;