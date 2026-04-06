import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  CurrencyDollarIcon,
  CubeIcon,
  UserGroupIcon,
  TruckIcon,
  ShoppingBagIcon,
  ScaleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import StatCard from '../../components/Common/StatCard';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/analytics?period=${period}`);
      setData(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des analytics');
    } finally {
      setLoading(false);
    }
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { callback: (value) => value + ' €' },
      },
    },
  };

  const revenueChartData = {
    labels: data?.revenueByMonth?.map((item) => item.month) || [],
    datasets: [
      {
        label: 'Revenus',
        data: data?.revenueByMonth?.map((item) => item.value) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const packagesChartData = {
    labels: data?.packagesByStatus?.map((item) => item.status) || [],
    datasets: [
      {
        data: data?.packagesByStatus?.map((item) => item.count) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const topDestinationsData = {
    labels: data?.topDestinations?.map((item) => item.city) || [],
    datasets: [
      {
        label: 'Nombre de colis',
        data: data?.topDestinations?.map((item) => item.count) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  const marketplaceData = {
    labels: ['Produits', 'Kilos', 'Services'],
    datasets: [
      {
        data: [
          data?.marketplaceStats?.products || 0,
          data?.marketplaceStats?.kilos || 0,
          data?.marketplaceStats?.services || 0,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
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
            <span className="text-sm font-medium tracking-wider uppercase">ANALYTICS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Tableau de bord
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              analysez vos performances
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Suivez l’évolution de votre activité, vos revenus, et les indicateurs clés.
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
        {/* En-tête et période */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Visualisez les performances de votre activité</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                period === 'week'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                period === 'month'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                period === 'year'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Année
            </button>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Revenus totaux"
            value={`${(data?.totalRevenue || 0).toLocaleString()} €`}
            icon={CurrencyDollarIcon}
            trend="up"
            trendValue={`+${data?.revenueGrowth || 0}%`}
            color="primary"
          />
          <StatCard
            title="Colis traités"
            value={data?.totalPackages || 0}
            icon={CubeIcon}
            trend="up"
            trendValue={`+${data?.packagesGrowth || 0}`}
            color="success"
          />
          <StatCard
            title="Clients actifs"
            value={data?.activeClients || 0}
            icon={UserGroupIcon}
            color="info"
          />
          <StatCard
            title="Livraisons"
            value={data?.deliveries || 0}
            icon={TruckIcon}
            color="warning"
          />
        </div>

        {/* Grille des graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Évolution des revenus */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Évolution des revenus</h3>
            <div className="h-80">
              <Line options={revenueChartOptions} data={revenueChartData} />
            </div>
          </div>

          {/* Colis par statut */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Colis par statut</h3>
            <div className="h-80 flex items-center justify-center">
              <Doughnut
                data={packagesChartData}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>

          {/* Destinations principales */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Destinations principales</h3>
            <div className="h-80">
              <Bar
                data={topDestinationsData}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
              />
            </div>
          </div>

          {/* Répartition Marketplace */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition Marketplace</h3>
            <div className="h-80 flex items-center justify-center">
              <Doughnut
                data={marketplaceData}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
              />
            </div>
          </div>
        </div>

        {/* Indicateurs supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Indicateurs de performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Indicateurs de performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Taux de livraison</span>
                  <span className="text-sm font-medium text-gray-900">{data?.deliveryRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: `${data?.deliveryRate || 0}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Satisfaction client</span>
                  <span className="text-sm font-medium text-gray-900">{data?.satisfactionRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: `${data?.satisfactionRate || 0}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Délai moyen</span>
                  <span className="text-sm font-medium text-gray-900">{data?.avgDeliveryTime || 0} jours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Produits les plus vendus */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Produits les plus vendus</h3>
            <div className="space-y-3">
              {data?.topProducts?.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-900">{product.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.sales} ventes</span>
                </div>
              ))}
              {(!data?.topProducts || data.topProducts.length === 0) && (
                <p className="text-gray-500 text-sm">Aucune donnée disponible</p>
              )}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h3>
            <div className="space-y-3">
              {data?.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              {(!data?.recentActivity || data.recentActivity.length === 0) && (
                <p className="text-gray-500 text-sm">Aucune activité récente</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;