// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeftIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   UserGroupIcon,
//   CubeIcon,
//   PencilIcon,
// } from '@heroicons/react/24/outline';
// import { toast } from 'react-toastify';
// import axios from '../../api/axios';
// import DataTable from '../../components/Common/DataTable';
// import StatCard from '../../components/Common/StatCard';

// const AgencyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [agency, setAgency] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [stats, setStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('info');

//   useEffect(() => {
//     fetchAgencyData();
//   }, [id]);

//   const fetchAgencyData = async () => {
//     try {
//       const [agencyRes, employeesRes, packagesRes, statsRes] = await Promise.all([
//         axios.get(`/agencies/${id}`),
//         axios.get(`/agencies/${id}/employees`),
//         axios.get(`/agencies/${id}/packages`),
//         axios.get(`/agencies/${id}/stats`),
//       ]);

//       setAgency(agencyRes.data);
//       setEmployees(employeesRes.data);
//       setPackages(packagesRes.data);
//       setStats(statsRes.data);
//     } catch (error) {
//       toast.error('Erreur lors du chargement des données');
//       navigate('/agencies');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const employeeColumns = [
//     {
//       key: 'name',
//       label: 'Nom',
//       render: (_, row) => `${row.firstName} ${row.lastName}`,
//     },
//     { key: 'position', label: 'Poste' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Téléphone' },
//     {
//       key: 'status',
//       label: 'Statut',
//       render: (val) => (
//         <span className={val === 'actif' ? 'badge-success' : 'badge-danger'}>
//           {val}
//         </span>
//       ),
//     },
//   ];

//   const packageColumns = [
//     { key: 'trackingNumber', label: 'N° Suivi' },
//     {
//       key: 'status',
//       label: 'Statut',
//       render: (val) => (
//         <span className={`badge-${
//           val === 'livré' ? 'success' : 
//           val === 'en transit' ? 'warning' : 'info'
//         }`}>
//           {val}
//         </span>
//       ),
//     },
//     { key: 'destination', label: 'Destination', render: (val) => val.city },
//     { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
//   ];

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
//             onClick={() => navigate('/agencies')}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//           >
//             <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">{agency.name}</h1>
//             <p className="text-gray-600">Code: {agency.code}</p>
//           </div>
//           <span className={agency.status === 'actif' ? 'badge-success' : 'badge-danger'}>
//             {agency.status}
//           </span>
//         </div>
//         <button
//           onClick={() => navigate(`/agencies/${id}/edit`)}
//           className="btn-primary flex items-center space-x-2"
//         >
//           <PencilIcon className="w-4 h-4" />
//           <span>Modifier</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard
//           title="Employés"
//           value={stats.employeesCount || 0}
//           icon={UserGroupIcon}
//           color="primary"
//         />
//         <StatCard
//           title="Colis traités"
//           value={stats.packagesCount || 0}
//           icon={CubeIcon}
//           color="success"
//         />
//         <StatCard
//           title="Colis en cours"
//           value={stats.pendingPackages || 0}
//           icon={CubeIcon}
//           color="warning"
//         />
//       </div>

//       {/* Agency Info */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div className="flex items-start space-x-3">
//               <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
//               <div>
//                 <p className="text-sm text-gray-500">Adresse</p>
//                 <p className="text-gray-900">
//                   {agency.address?.street}<br />
//                   {agency.address?.postalCode} {agency.address?.city}<br />
//                   {agency.address?.country}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <PhoneIcon className="w-5 h-5 text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500">Téléphone</p>
//                 <a href={`tel:${agency.phone}`} className="text-gray-900 hover:text-primary-600">
//                   {agency.phone}
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <EnvelopeIcon className="w-5 h-5 text-gray-400" />
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <a href={`mailto:${agency.email}`} className="text-gray-900 hover:text-primary-600">
//                   {agency.email}
//                 </a>
//               </div>
//             </div>
//             {agency.manager && (
//               <div className="flex items-center space-x-3">
//                 <UserGroupIcon className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500">Responsable</p>
//                   <p className="text-gray-900">
//                     {agency.manager.firstName} {agency.manager.lastName}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8">
//           <button
//             onClick={() => setActiveTab('employees')}
//             className={`py-2 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'employees'
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Employés ({employees.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('packages')}
//             className={`py-2 px-1 border-b-2 font-medium text-sm ${
//               activeTab === 'packages'
//                 ? 'border-primary-600 text-primary-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             Colis ({packages.length})
//           </button>
//         </nav>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-6">
//         {activeTab === 'employees' && (
//           <DataTable
//             columns={employeeColumns}
//             data={employees}
//             onRowClick={(row) => navigate(`/employees/${row._id}`)}
//           />
//         )}
//         {activeTab === 'packages' && (
//           <DataTable
//             columns={packageColumns}
//             data={packages}
//             onRowClick={(row) => navigate(`/packages/${row._id}`)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AgencyDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon, PhoneIcon, EnvelopeIcon,
  MapPinIcon, UserGroupIcon, CubeIcon, PencilIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import agencyService   from '../../services/Agencyservice';
import employeeService from '../../services/Employeeservice';
import packageService  from '../../services/Packageservice';
import DataTable from '../../components/Common/DataTable';

const AgencyDetail = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const [agency,    setAgency]    = useState(null);
  const [employees, setEmployees] = useState([]);
  const [packages,  setPackages]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('employees');

  useEffect(() => {
    fetchAll();
  }, [id]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      // On récupère l'agence (inclut ses stats dans res.data.data.stats)
      const agencyRes = await agencyService.getById(id);
      setAgency(agencyRes.data.data);

      // Employés filtrés par agence
      const empRes = await employeeService.getAll({ agencyId: id, limit: 100 });
      setEmployees(empRes.data.data || []);

      // Colis filtrés par agence
      const pkgRes = await packageService.getAll({ agency: id, limit: 100 });
      setPackages(pkgRes.data.data || []);

    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      navigate('/app/agencies');
    } finally {
      setLoading(false);
    }
  };

  // ── Colonnes employés ──
  const employeeColumns = [
    {
      key: 'user',
      label: 'Nom',
      render: (val) => val ? `${val.firstName} ${val.lastName}` : '—',
    },
    { key: 'position',   label: 'Poste' },
    { key: 'department', label: 'Département' },
    {
      key: 'user',
      label: 'Email',
      render: (val) => <span className="text-sm text-slate-600">{val?.email || '—'}</span>,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => (
        <span className={
          val === 'actif'
            ? 'px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 border border-red-200'
        }>
          {val}
        </span>
      ),
    },
  ];

  // ── Colonnes colis ──
  const packageColumns = [
    {
      key: 'trackingNumber',
      label: 'N° Suivi',
      render: (val) => <span className="text-sm font-mono font-medium text-orange-600">{val}</span>,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => {
        const colors = {
          registered:       'bg-slate-100 text-slate-700 border-slate-200',
          transit:          'bg-amber-50 text-amber-700 border-amber-200',
          delivered:        'bg-emerald-50 text-emerald-700 border-emerald-200',
          arrived:          'bg-blue-50 text-blue-700 border-blue-200',
          out_for_delivery: 'bg-purple-50 text-purple-700 border-purple-200',
          returned:         'bg-red-50 text-red-600 border-red-200',
        };
        return (
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors[val] || colors.registered}`}>
            {val}
          </span>
        );
      },
    },
    {
      key: 'origin',
      label: 'Trajet',
      render: (val, row) => (
        <span className="text-sm text-slate-600">{val} → {row.destination}</span>
      ),
    },
    {
      key: 'totalPrice',
      label: 'Prix',
      render: (val) => <span className="text-sm font-medium text-slate-800">{val ? `${val} $` : '—'}</span>,
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (val) => <span className="text-sm text-slate-500">{new Date(val).toLocaleDateString('fr-FR')}</span>,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!agency) return null;

  const agencyStats = agency.stats || {};

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/app/agencies')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
            </button>
            <div className="w-11 h-11 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-center">
              <CubeIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-slate-800">{agency.name}</h1>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {agency.code}
                </span>
                <span className={
                  agency.status === 'actif'
                    ? 'px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 border border-red-200'
                }>
                  {agency.status}
                </span>
              </div>
              <p className="text-sm text-slate-500">{agency.address?.city}, {agency.address?.country}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/app/agencies/${id}/edit`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <PencilIcon className="w-4 h-4" />
            Modifier
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
              <UserGroupIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Employés</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">{employees.length}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <CubeIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Colis traités</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">{agencyStats.packagesCount || packages.length}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
              <CubeIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Revenu total</p>
              <p className="text-2xl font-bold text-slate-800 mt-0.5">{agencyStats.totalRevenue || 0} $</p>
            </div>
          </div>
        </div>

        {/* ── Infos ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-5">Informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Adresse</p>
                  <p className="text-sm text-slate-800">{agency.address?.street}</p>
                  <p className="text-sm text-slate-600">{agency.address?.city}, {agency.address?.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Téléphone</p>
                  <a href={`tel:${agency.phone}`} className="text-sm text-slate-800 hover:text-orange-500 transition-colors">
                    {agency.phone || '—'}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <a href={`mailto:${agency.email}`} className="text-sm text-slate-800 hover:text-orange-500 transition-colors">
                    {agency.email || '—'}
                  </a>
                </div>
              </div>
              {agency.manager && (
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Responsable</p>
                    <p className="text-sm text-slate-800">
                      {agency.manager.firstName} {agency.manager.lastName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex border-b border-slate-200">
            {[
              { key: 'employees', label: `Employés (${employees.length})` },
              { key: 'packages',  label: `Colis (${packages.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div>
            {activeTab === 'employees' && (
              <DataTable
                columns={employeeColumns}
                data={employees}
                onRowClick={(row) => navigate(`/app/employees/${row._id}`)}
                loading={false}
              />
            )}
            {activeTab === 'packages' && (
              <DataTable
                columns={packageColumns}
                data={packages}
                onRowClick={(row) => navigate(`/app/packages/${row._id}`)}
                loading={false}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgencyDetail;