import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  PencilIcon,
  SparklesIcon,
  UserIcon,
  BriefcaseIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import StatCard from '../../components/Common/StatCard';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      navigate('/employees');
    } finally {
      setLoading(false);
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

  const getStatusBadge = (status) => {
    return status === 'actif'
      ? 'bg-green-100 text-green-800'
      : status === 'congé'
      ? 'bg-orange-100 text-orange-800'
      : 'bg-red-100 text-red-800';
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

  if (!employee) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-600">Employé introuvable</p>
          <button onClick={() => navigate('/employees')} className="mt-4 btn-primary">
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
            <span className="text-sm font-medium tracking-wider uppercase">FICHE EMPLOYÉ</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {employee.firstName} {employee.lastName}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              {employee.position}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {employee.email} • {employee.phone || 'Téléphone non renseigné'}
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
        {/* En-tête avec boutons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/employees')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour à la liste
          </button>
          <button
            onClick={() => navigate(`/employees/${id}/edit`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md transition"
          >
            <PencilIcon className="w-4 h-4" />
            Modifier
          </button>
        </div>

        {/* Cartes statistiques (exemple) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Rôle"
            value={employee.role || 'Non défini'}
            icon={UserIcon}
            color="primary"
          />
          <StatCard
            title="Département"
            value={employee.department || 'Non assigné'}
            icon={BriefcaseIcon}
            color="info"
          />
          <StatCard
            title="Contrat"
            value={employee.contractType || 'CDI'}
            icon={DocumentTextIcon}
            color="success"
          />
        </div>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${employee.email}`} className="text-gray-900 hover:text-blue-600">
                        {employee.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <a href={`tel:${employee.phone}`} className="text-gray-900 hover:text-blue-600">
                        {employee.phone || 'Non renseigné'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date de naissance</p>
                      <p className="text-gray-900">
                        {employee.birthDate ? new Date(employee.birthDate).toLocaleDateString() : 'Non renseignée'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <IdentificationIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">N° Sécurité sociale</p>
                      <p className="text-gray-900">{employee.ssn || 'Non renseigné'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-gray-900">
                        {employee.address?.street || 'Non renseignée'}
                        {employee.address?.city && <>, {employee.address.city}</>}
                        {employee.address?.postalCode && <>, {employee.address.postalCode}</>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations professionnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Département</p>
                  <p className="text-gray-900 font-medium">{employee.department || 'Non assigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date d'embauche</p>
                  <p className="text-gray-900 font-medium">
                    {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'Non renseignée'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Agence</p>
                  <p className="text-gray-900 font-medium">{employee.agency?.name || 'Non assigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Superviseur</p>
                  <p className="text-gray-900 font-medium">
                    {employee.supervisor ? `${employee.supervisor.firstName} ${employee.supervisor.lastName}` : 'Aucun'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salaire annuel</p>
                  <p className="text-gray-900 font-medium">
                    {employee.salary ? `${employee.salary.toLocaleString()} €` : 'Non renseigné'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type de contrat</p>
                  <p className="text-gray-900 font-medium">{employee.contractType || 'Non renseigné'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Badges statut + rôle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Statut</h3>
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(employee.role)}`}>
                  {employee.role}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(employee.status)}`}>
                  {employee.status === 'actif' ? 'Actif' : employee.status === 'congé' ? 'En congé' : 'Inactif'}
                </span>
              </div>
            </div>

            {/* Contact d'urgence */}
            {employee.emergencyContact?.name && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact d'urgence</h3>
                <div className="space-y-3">
                  <p className="text-sm"><span className="text-gray-500">Nom :</span> {employee.emergencyContact.name}</p>
                  <p className="text-sm"><span className="text-gray-500">Lien :</span> {employee.emergencyContact.relationship}</p>
                  <p className="text-sm"><span className="text-gray-500">Tél :</span> {employee.emergencyContact.phone}</p>
                </div>
              </div>
            )}

            {/* Documents (exemple) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700">
                  📄 Contrat de travail
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700">
                  📄 Fiche de paie (Dernière)
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700">
                  📄 CV
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

export default EmployeeDetail;