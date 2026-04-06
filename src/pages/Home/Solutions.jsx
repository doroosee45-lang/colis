import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer'
import {
  CubeIcon,
  RocketLaunchIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Solutions = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('transport');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutions = [
    {
      id: 'transport',
      title: 'Transport & Logistique',
      description: 'Solution complète de gestion de transport pour optimiser vos flux',
      icon: TruckIcon,
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      features: [
        'Suivi en temps réel des colis',
        'Optimisation des itinéraires',
        'Gestion de flotte',
        'Livraison express 24-48h',
        'Transport international',
        'Assurance incluse',
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      stats: [
        { value: '98%', label: 'Livraisons à temps' },
        { value: '150+', label: 'Véhicules' },
        { value: '50+', label: 'Pays' },
      ]
    },
    {
      id: 'marketplace',
      title: 'Marketplace de Kilos',
      description: 'Achetez et vendez des kilos d\'espace entre expéditeurs',
      icon: GlobeAltIcon,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: [
        'Mise en relation expéditeurs',
        'Optimisation des coûts',
        'Transactions sécurisées',
        'Tarifs négociables',
        'Espace de stockage partagé',
        'Flexibilité totale',
      ],
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      stats: [
        { value: '-30%', label: 'Réduction moyenne' },
        { value: '5000+', label: 'Transactions' },
        { value: '24/7', label: 'Disponible' },
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Avancés',
      description: 'Tableaux de bord et rapports détaillés pour piloter votre activité',
      icon: ChartBarIcon,
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      features: [
        'Tableaux de bord personnalisés',
        'Indicateurs clés en temps réel',
        'Rapports automatisés',
        'Prévisions intelligentes',
        'Export PDF/Excel',
        'Partage d\'accès',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      stats: [
        { value: '+45%', label: 'Productivité' },
        { value: '24h', label: 'Mise à jour' },
        { value: '15+', label: 'Métriques' },
      ]
    },
    {
      id: 'gestion',
      title: 'Gestion d\'Entreprise',
      description: 'Gérez vos clients, employés et agences en un seul endroit',
      icon: BuildingOfficeIcon,
      color: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600',
      features: [
        'CRM intégré',
        'Gestion des employés',
        'Multi-agences',
        'Facturation automatisée',
        'Gestion des rôles',
        'Historique complet',
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      stats: [
        { value: '5000+', label: 'Clients' },
        { value: '200+', label: 'Employés' },
        { value: '12', label: 'Agences' },
      ]
    }
  ];

  const industries = [
    {
      name: 'E-commerce',
      icon: CubeIcon,
      description: 'Optimisez vos expéditions et réduisez vos coûts',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      name: 'Industrie',
      icon: BuildingOfficeIcon,
      description: 'Gérez vos flux logistiques complexes',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      name: 'Distribution',
      icon: TruckIcon,
      description: 'Suivez vos livraisons en temps réel',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
    },
    {
      name: 'International',
      icon: GlobeAltIcon,
      description: 'Simplifiez vos expéditions transfrontalières',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  const benefits = [
    {
      icon: RocketLaunchIcon,
      title: 'Rapidité d\'exécution',
      description: 'Traitement instantané de vos demandes et livraisons express',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Sécurité renforcée',
      description: 'Protection optimale de vos données et de vos colis',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Optimisation des coûts',
      description: 'Réduction significative de vos frais logistiques',
    },
    {
      icon: UserGroupIcon,
      title: 'Support dédié',
      description: 'Équipe d\'experts à votre écoute 24h/24 et 7j/7',
    },
  ];

  const stats = [
    { value: '98%', label: 'Clients satisfaits', icon: ChartBarIcon },
    { value: '24/7', label: 'Support disponible', icon: PhoneIcon },
    { value: '50+', label: 'Pays desservis', icon: GlobeAltIcon },
    { value: '15K+', label: 'Colis par jour', icon: TruckIcon },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      {/* nsxcc,ncc */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 sm:py-0">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{
              backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')",
            }}
          />
          {/* Overlay gradient plus léger pour image plus claire */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/50 to-slate-900/60" />
        </div>

        {/* Contenu Hero */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mb-8 md:mb-16">
          <div
            className="transform transition-transform duration-700"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-8 border border-white/20 animate-float">
              <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
              <span className="text-xs sm:text-sm font-medium tracking-wider">Solutions sur mesure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Des solutions adaptées à
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
                votre activités
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2">
              Découvrez comment CargoSphere peut transformer votre logistique
              grâce à des solutions innovantes et personnalisées.
            </p>
          </div>
        </div>

        {/* Stats flottantes - OPTIMISÉES POUR MOBILE */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 text-center border border-white/20
                      transform hover:scale-105 hover:-translate-y-2 transition-all duration-300
                      shadow-lg hover:shadow-xl"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto text-blue-300 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave effect en bas */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>





























































































      {/* ========== SOLUTIONS DÉTAILLÉES ========== */}<section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos solutions principales
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Une gamme complète d'outils pour optimiser chaque aspect de votre logistique
            </p>
          </div>

          {/* Navigation des solutions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {solutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
                      flex items-center gap-2
                      ${activeTab === sol.id
                    ? `bg-gradient-to-r ${sol.color} text-white shadow-lg`
                    : 'bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white/80 hover:shadow-md'}`}
              >
                <sol.icon className="w-4 h-4" />
                {sol.title}
              </button>
            ))}
          </div>

          {/* Solution active */}
          {solutions.filter(s => s.id === activeTab).map((sol, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenu texte */}
              <div>
                <div className={`inline-flex items-center gap-2 ${sol.bgLight} ${sol.textColor} px-4 py-2 rounded-full mb-4`}>
                  <sol.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{sol.title}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {sol.description}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  Une solution complète qui s'adapte à vos besoins spécifiques pour une efficacité maximale.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {sol.stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className={`text-xl font-bold ${sol.textColor}`}>{stat.value}</div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {sol.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full ${sol.bgLight} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <CheckIcon className={`w-3 h-3 ${sol.textColor}`} />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className={`px-6 py-3 bg-gradient-to-r ${sol.color} text-white rounded-xl font-medium
                         hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    Demander une démo
                  </Link>
                  <Link
                    to="/tarifs"
                    className="px-6 py-3 border border-white/30 text-white rounded-xl font-medium
                         hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Voir les tarifs
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative group">
                <div className={`absolute -top-4 -left-4 w-64 h-64 bg-gradient-to-r ${sol.color} opacity-20 
                        rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700`} />
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 
                     group-hover:rotate-1 transition-all duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </section>















      {/* ========== SECTEURS D'ACTIVITÉ ========== */}
      <section className="relative py-20 overflow-hidden">
        {/* Image de fond avec overlay et zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 animate-zoom-slow"
            style={{
              backgroundImage: "url('https://thumbs.dreamstime.com/z/service-de-distribution-de-colis-par-avion-de-transport-42485005.jpg')",
              filter: 'brightness(0.45)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-cyan-900/50 to-blue-900/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solutions par secteur
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-white/80">
              Des solutions adaptées aux spécificités de votre industrie
            </p>
          </div>

          {/* Cartes secteur */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg 
                       hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2
                       transition-all duration-300 border border-white/20"
                >
                  <div className={`w-12 h-12 ${industry.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${industry.textColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{industry.name}</h3>
                  <p className="text-sm text-white/70">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>






      {/* ========== BÉNÉFICES ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi choisir CargoSphere ?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Des avantages concrets pour votre entreprise
            </p>
          </div>

          {/* Cartes bénéfices */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 text-center 
             shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2
             transition-all duration-300 border border-white/20 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl 
                  flex items-center justify-center mx-auto mb-4 
                  group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>








      {/* ========== IMAGE SECTION HARMONISÉE ========== */}
      <section className="relative py-20 overflow-hidden">
        {/* Fond subtil avec overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-cyan-900/70 to-blue-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texte */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
                <ArrowPathIcon className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium tracking-wide">Innovation continue</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Une plateforme en constante évolution
              </h2>

              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Nous améliorons constamment nos solutions pour vous offrir
                les meilleurs outils logistiques du marché. Mises à jour
                régulières, nouvelles fonctionnalités, et à l'écoute de vos besoins.
              </p>

              <div className="space-y-4">
                {[
                  'Mises à jour mensuelles',
                  'Nouvelles fonctionnalités basées sur vos retours',
                  'Roadmap transparente',
                  'Bêta-testeurs privilégiés',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image avec overlays et zoom subtil */}
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Équipe CargoSphere"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            </div>

          </div>
        </div>
      </section>

      {/* ========== CTA FINAL HARMONISÉ ========== */}{/* ========== CTA FINAL HARMONISÉ & COULEUR ADOUCIE ========== */}{/* ========== CTA FINAL HARMONISÉ AVEC IMAGE À DROITE ========== */}
      {/* ========== CTA FINAL HARMONISÉ AVEC IMAGE À DROITE ET COULEUR ADOUCIE ========== */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">

          {/* Texte à gauche */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Prêt à transformer votre logistique ?
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Rejoignez des milliers d'entreprises qui optimisent déjà leurs opérations avec CargoSphere.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-6">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-purple-700 rounded-2xl font-semibold
                     hover:bg-slate-100 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-white/25"
              >
                Commencer gratuitement
              </Link>

              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-2xl font-semibold
                     hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                Parler à un expert
              </Link>
            </div>

            <p className="text-sm text-white/70 font-medium tracking-wide">
              ✅ Sans engagement • 🎯 Démo personnalisée • 🛟 Support 24/7
            </p>
          </div>

          {/* Image à droite */}
          <div className="lg:w-1/2 relative">
            <img
              src="https://cargoavion.com/wp-content/uploads/2020/09/IMG-CARGO-5.jpeg"
              alt="Logistique moderne"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full"
            />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
          </div>

        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Solutions;