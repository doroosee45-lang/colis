import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    agency: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, [filters]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`/employees?${params}`);
      setEmployees(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des employés');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/employees/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await axios.delete(`/employees/${id}`);
        toast.success('Employé supprimé avec succès');
        fetchEmployees();
        fetchStats();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const getRoleBadge = (role) => {
    const roles = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-yellow-100 text-yellow-800',
      agent: 'bg-blue-100 text-blue-800',
      driver: 'bg-green-100 text-green-800',
    };
    return roles[role] || 'bg-gray-100 text-gray-800';
  };

  const columns = [
    {
      key: 'name',
      label: 'Employé',
      render: (_, row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-gray-600">
              {row.firstName?.[0]}{row.lastName?.[0]}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {row.firstName} {row.lastName}
            </div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    { key: 'position', label: 'Poste', render: (val) => val || '-' },
    { key: 'department', label: 'Département', render: (val) => val || '-' },
    { key: 'agency', label: 'Agence', render: (val) => val?.name || '-' },
    {
      key: 'role',
      label: 'Rôle',
      render: (val) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(val)}`}>{val}</span>,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'actif' ? 'bg-green-100 text-green-800' : val === 'congé' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
          {val === 'actif' ? 'Actif' : val === 'congé' ? 'En congé' : 'Inactif'}
        </span>
      ),
    },
    {
      key: 'hireDate',
      label: "Date d'embauche",
      render: (val) => (val ? new Date(val).toLocaleDateString() : '-'),
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/employees/${row._id}/edit`);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="text-red-600 hover:text-red-900"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

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
            <span className="text-sm font-medium tracking-wider uppercase">GESTION DES EMPLOYÉS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Gérez vos employés
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              en toute simplicité
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Consultez, ajoutez, modifiez ou supprimez les membres de votre équipe.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 relative z-10">
        {/* En-tête + bouton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/employees/add')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition shadow-md"
          >
            <PlusIcon className="w-5 h-5" />
            Nouvel employé
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total employés" value={stats.total || 0} icon={UserGroupIcon} color="primary" />
          <StatCard title="Actifs" value={stats.active || 0} icon={UserGroupIcon} color="success" />
          <StatCard title="En congé" value={stats.onLeave || 0} icon={UserGroupIcon} color="warning" />
          <StatCard title="Départements" value={stats.departments || 0} icon={UserGroupIcon} color="info" />
        </div>

        {/* Filtres modernisés */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher (nom, email...)"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous départements</option>
              <option value="logistique">Logistique</option>
              <option value="administration">Administration</option>
              <option value="commercial">Commercial</option>
              <option value="livraison">Livraison</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
              <option value="congé">En congé</option>
            </select>
            <select
              value={filters.agency}
              onChange={(e) => setFilters({ ...filters, agency: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes agences</option>
              {/* Les options seront chargées dynamiquement depuis l’API si nécessaire */}
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setFilters({ search: '', department: '', status: '', agency: '' })}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Tableau */}
        <DataTable
          columns={columns}
          data={employees}
          onRowClick={(row) => navigate(`/employees/${row._id}`)}
          loading={loading}
        />
      </div>

      <Footer />
    </div>
  );
};

export default EmployeesList;