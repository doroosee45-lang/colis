












import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  SparklesIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  BellIcon,
  CreditCardIcon,
  CameraIcon,
  ArrowPathIcon,
  ClockIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Caracteristiques = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'Toutes', icon: SparklesIcon },
    { id: 'gestion', name: 'Gestion', icon: BuildingOfficeIcon },
    { id: 'suivi', name: 'Suivi & Tracking', icon: MagnifyingGlassIcon },
    { id: 'marketplace', name: 'Marketplace', icon: GlobeAltIcon },
    { id: 'paiements', name: 'Paiements', icon: CreditCardIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
  ];

  const features = [
    {
      id: 1,
      category: 'gestion',
      title: 'Gestion des clients',
      description: 'CRM intégré pour gérer tous vos clients et leur historique',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Fiches clients détaillées',
        'Historique des colis',
        'Gestion des contacts',
        'Import/Export CSV',
        'Segmentation clients',
        'Tags personnalisés',
      ],
      stats: { value: '5000+', label: 'Clients gérés' }
    },
    {
      id: 2,
      category: 'gestion',
      title: 'Gestion des employés',
      description: 'Administrez vos équipes et leurs permissions',
      icon: UserGroupIcon,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Gestion des rôles',
        'Permissions granulaires',
        'Planning des équipes',
        'Suivi des performances',
        'Feuilles de temps',
        'Congés & absences',
      ],
      stats: { value: '200+', label: 'Employés max' }
    },
    {
      id: 3,
      category: 'gestion',
      title: 'Multi-agences',
      description: 'Gérez plusieurs agences depuis une seule interface',
      icon: BuildingOfficeIcon,
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      details: [
        'Vue consolidée',
        'Reporting par agence',
        'Transferts entre agences',
        'Stock centralisé',
        'Indicateurs locaux',
        'Hiérarchie flexible',
      ],
      stats: { value: '50+', label: 'Agences' }
    },
    {
      id: 4,
      category: 'suivi',
      title: 'Tracking en temps réel',
      description: 'Suivez vos colis minute par minute',
      icon: TruckIcon,
      color: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600',
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      details: [
        'Géolocalisation GPS',
        'Notifications push',
        'Historique complet',
        'Photos des étapes',
        'Signature électronique',
        'Preuve de livraison',
      ],
      stats: { value: '99.9%', label: 'Fiabilité' }
    },
    {
      id: 5,
      category: 'suivi',
      title: 'Gestion des colis',
      description: 'Interface complète pour gérer tous vos envois',
      icon: CubeIcon,
      color: 'from-amber-500 to-yellow-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      image: 'https://images.unsplash.com/photo-1566576912325-dcb12f6b1b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      details: [
        'Création rapide',
        'Étiquettes automatiques',
        'Calcul des tarifs',
        'Colis groupés',
        'Colis fragiles',
        'Assurance incluse',
      ],
      stats: { value: '10K+', label: 'Colis/jour' }
    },
    {
      id: 6,
      category: 'marketplace',
      title: 'Marketplace produits',
      description: 'Achetez et vendez des produits entre professionnels',
      icon: GlobeAltIcon,
      color: 'from-indigo-500 to-blue-500',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Catalogue produits',
        'Upload images',
        'Recherche avancée',
        'Filtres par catégorie',
        'Gestion des stocks',
        'Commandes groupées',
      ],
      stats: { value: '5000+', label: 'Produits' }
    },
    {
      id: 7,
      category: 'marketplace',
      title: 'Marketplace de kilos',
      description: 'Optimisez vos coûts en partageant l\'espace',
      icon: CurrencyDollarIcon,
      color: 'from-rose-500 to-pink-500',
      bgLight: 'bg-rose-50',
      textColor: 'text-rose-600',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Achat/vente de kilos',
        'Négociation prix',
        'Contrats sécurisés',
        'Paiements intégrés',
        'Évaluation vendeurs',
        'Litiges gérés',
      ],
      stats: { value: '-30%', label: 'Économies' }
    },
    {
      id: 8,
      category: 'paiements',
      title: 'Paiements intégrés',
      description: 'Solutions de paiement multiples et sécurisées',
      icon: CreditCardIcon,
      color: 'from-cyan-500 to-blue-500',
      bgLight: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Carte bancaire',
        'Virement',
        'PayPal',
        'Paiement différé',
        'Facturation auto',
        'Rapprochement',
      ],
      stats: { value: '100%', label: 'Sécurisé' }
    },
    {
      id: 9,
      category: 'paiements',
      title: 'Génération PDF facture',
      description: 'Factures professionnelles automatiques',
      icon: DocumentTextIcon,
      color: 'from-teal-500 to-emerald-500',
      bgLight: 'bg-teal-50',
      textColor: 'text-teal-600',
      image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Factures personnalisées',
        'Envoi automatique',
        'Format PDF/A',
        'Archivage légal',
        'Duplicata instantané',
        'TVA gérée',
      ],
      stats: { value: 'Auto', label: 'Génération' }
    },
    {
      id: 10,
      category: 'notifications',
      title: 'Notifications email/SMS',
      description: 'Tenez vos clients informés à chaque étape',
      icon: BellIcon,
      color: 'from-violet-500 to-purple-500',
      bgLight: 'bg-violet-50',
      textColor: 'text-violet-600',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      details: [
        'Templates personnalisables',
        'SMS automatiques',
        'Emails transactionnels',
        'Notifications push',
        'Calendrier d\'envoi',
        'Statistiques ouvertures',
      ],
      stats: { value: '24/7', label: 'Notifications' }
    },
    {
      id: 11,
      category: 'upload',
      title: 'Upload images produits',
      description: 'Gérez facilement les photos de vos produits',
      icon: CameraIcon,
      color: 'from-fuchsia-500 to-pink-500',
      bgLight: 'bg-fuchsia-50',
      textColor: 'text-fuchsia-600',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Upload multiple',
        'Compression auto',
        'Recadrage intégré',
        'Galerie produits',
        'Zoom HD',
        'Marque blanche',
      ],
      stats: { value: '4K', label: 'Max pixels' }
    },
    {
      id: 12,
      category: 'analytics',
      title: 'Dashboard analytics',
      description: 'Visualisez vos performances en temps réel',
      icon: ChartBarIcon,
      color: 'from-sky-500 to-blue-500',
      bgLight: 'bg-sky-50',
      textColor: 'text-sky-600',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      details: [
        'Graphiques interactifs',
        'Indicateurs clés',
        'Rapports exportables',
        'Prévisions IA',
        'Comparaisons',
        'Partage d\'accès',
      ],
      stats: { value: '+45%', label: 'Performance' }
    },
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  const stats = [
    { value: '98%', label: 'Clients satisfaits', icon: ChartBarIcon },
    { value: '24/7', label: 'Support disponible', icon: PhoneIcon },
    { value: '50+', label: 'Pays desservis', icon: GlobeAltIcon },
    { value: '15K+', label: 'Colis par jour', icon: TruckIcon },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://teamcdg.com/medias/img/aerien/fret-aerien-chargement-avion.jpg')",
              filter: 'brightness(0.3)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-900/90" />
        </div>

        {/* Contenu Hero */}
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <div 
            className="transform transition-transform duration-700"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/20">
              <SparklesIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium tracking-wide">Fonctionnalités avancées</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Tout ce dont vous avez besoin
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                en un seul endroit
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Découvrez l'ensemble des fonctionnalités qui font de CargoSphere 
              la plateforme logistique préférée des professionnels.
            </p>
          </div>
        </div>

        {/* Stats flottantes */}
        <div className="relative max-w-7xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20
                            transform hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 mx-auto text-blue-300 mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FILTRES PAR CATÉGORIE ========== */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                            flex items-center gap-2
                            ${activeCategory === cat.id 
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== GRILLE DES FONCTIONNALITÉS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                           transform hover:scale-105 hover:-translate-y-2 
                           transition-all duration-500 overflow-hidden border border-slate-100"
                >
                  {/* Image d'en-tête */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-90`} />
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs text-white font-medium">{feature.stats.value}</span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-12 h-12 ${feature.bgLight} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${feature.textColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {feature.details.slice(0, 4).map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckIcon className={`w-4 h-4 ${feature.textColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-xs text-slate-600">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400">{feature.stats.label}</span>
                      <button className={`text-sm font-medium ${feature.textColor} hover:opacity-80 transition-opacity
                                        flex items-center gap-1 group-hover:gap-2 transition-all`}>
                        En savoir plus
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SECTION INTÉGRATIONS ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Intégrations natives
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Connectez CargoSphere à vos outils préférés
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="w-6 h-6 bg-slate-300 rounded" />
                </div>
                <p className="text-xs text-slate-600">Application {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION AVANTAGES ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Mise à jour continue</span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Des fonctionnalités qui évoluent avec vous
              </h2>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                Notre équipe développe constamment de nouvelles fonctionnalités 
                pour répondre à vos besoins. Chaque mois, des améliorations sont 
                déployées pour vous offrir la meilleure expérience possible.
              </p>

              <div className="space-y-4">
                {[
                  'Mises à jour mensuelles',
                  'Nouvelles fonctionnalités votées par les clients',
                  'Roadmap transparente',
                  'Bêta-testeurs privilégiés',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://teamcdg.com/medias/img/aerien/fret-aerien-chargement-avion.jpg"
                alt="Équipe CargoSphere"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à tester toutes ces fonctionnalités ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'entreprises qui utilisent déjà CargoSphere au quotidien
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold
                       hover:bg-slate-100 transform hover:scale-105 transition-all duration-300
                       shadow-2xl hover:shadow-white/25"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold
                       hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Demander une démo
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Sans engagement • Essai gratuit 14 jours • Support 24/7
          </p>
        </div>
      </section>


       <section className="relative py-24 text-white overflow-hidden">
                {/* Background Image with Zoom */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 animate-zoom-slow"
                    style={{
                        backgroundImage: "url('https://papslogistics.com/wp-content/uploads/transport-logistique-conteneurs-cargo-avion-cargo-rendu-illustration-3d_37416-487-1.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    {/* Badge */}
                    <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
                        <span className="text-sm font-medium tracking-wider">🎯 Support prioritaire</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                       Prêt à tester toutes ces fonctionnalités ?
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        Rejoignez des milliers d'entreprises qui utilisent déjà CargoSphere au quotidien
                    </p>

                    {/* Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold
                       hover:bg-slate-100 transform hover:scale-105 transition-all duration-300
                       shadow-2xl hover:shadow-white/25"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold
                       hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Demander une démo
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Sans engagement • Essai gratuit 14 jours • Support 24/7
          </p>
                </div>
            </section>
    </div>
  );
};

export default Caracteristiques;