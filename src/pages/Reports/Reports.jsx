









import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CubeIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import DataTable from '../../components/Common/DataTable';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/reports');
      setReports(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des rapports');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      const response = await axios.post('/reports/generate', {
        type: reportType,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
      setReports((prev) => [response.data, ...prev]);
      toast.success('Rapport généré avec succès');
    } catch (error) {
      toast.error('Erreur lors de la génération du rapport');
    } finally {
      setGenerating(false);
    }
  };

  const downloadReport = async (id) => {
    try {
      const response = await axios.get(`/reports/${id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rapport-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Nom du rapport',
      render: (val, row) => (
        <div>
          <div className="font-medium text-gray-900">{val}</div>
          <div className="text-sm text-gray-500 capitalize">{row.type}</div>
        </div>
      ),
    },
    {
      key: 'period',
      label: 'Période',
      render: (_, row) => (
        <div>
          <div>{new Date(row.startDate).toLocaleDateString()}</div>
          <div className="text-sm text-gray-500">au {new Date(row.endDate).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      key: 'generatedAt',
      label: 'Généré le',
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      key: 'size',
      label: 'Taille',
      render: (val) => val || '-',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => downloadReport(row._id)}
          className="text-blue-600 hover:text-blue-800"
          title="Télécharger"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
        </button>
      ),
    },
  ];

  const reportTypes = [
    { id: 'financial', name: 'Rapport financier', icon: CurrencyDollarIcon },
    { id: 'packages', name: 'Rapport colis', icon: CubeIcon },
    { id: 'clients', name: 'Rapport clients', icon: UserGroupIcon },
    { id: 'activity', name: "Rapport d'activité", icon: DocumentTextIcon },
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
            <span className="text-sm font-medium tracking-wider uppercase">RAPPORTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Analysez vos données
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              grâce à des rapports détaillés
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Générez et téléchargez des rapports financiers, colis, clients ou d’activité.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 relative z-10 space-y-8">
        {/* En-tête */}
        {/* Carte de génération */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Générer un rapport</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Types de rapport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de rapport
              </label>
              <div className="grid grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setReportType(type.id)}
                    className={`p-4 border rounded-xl text-left transition ${
                      reportType === type.id
                        ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <type.icon
                      className={`w-6 h-6 mb-2 ${
                        reportType === type.id ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        reportType === type.id ? 'text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      {type.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Période */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date de début</label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={generateReport}
              disabled={generating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Génération...
                </span>
              ) : (
                'Générer le rapport'
              )}
            </button>
          </div>
        </div>

        {/* Liste des rapports */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rapports générés</h3>
          <DataTable columns={columns} data={reports} loading={loading} />

          {!loading && reports.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun rapport généré
              </h3>
              <p className="text-gray-600">
                Générez votre premier rapport en utilisant le formulaire ci-dessus.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reports;