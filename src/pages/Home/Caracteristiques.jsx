import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    SparklesIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    BellIcon,
    CreditCardIcon,
    CameraIcon,
    ArrowPathIcon,
    ClockIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const Caracteristiques = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Empêcher le scroll quand le modal est ouvert
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

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
            stats: { value: '5000+', label: 'Clients gérés' },
            link: '/clients',
            longDescription: 'Notre CRM intégré vous permet de gérer l\'intégralité de vos relations clients. Accédez à l\'historique complet des colis, gérez les contacts, et segmentez votre clientèle pour un suivi personnalisé.'
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
            stats: { value: '200+', label: 'Employés max' },
            link: '/employees',
            longDescription: 'Une gestion complète de vos équipes avec des permissions granulaires, un planning intégré et un suivi des performances en temps réel.'
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
            stats: { value: '50+', label: 'Agences' },
            link: '/agencies',
            longDescription: 'Centralisez la gestion de toutes vos agences avec une vue consolidée, des rapports détaillés et une hiérarchie flexible.'
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
            stats: { value: '99.9%', label: 'Fiabilité' },
            link: '/packages/tracking',
            longDescription: 'Un suivi ultra-précis de vos colis avec géolocalisation en temps réel, notifications automatiques et preuves de livraison électroniques.'
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
            stats: { value: '10K+', label: 'Colis/jour' },
            link: '/packages',
            longDescription: 'Une interface intuitive pour créer et gérer tous vos colis avec calcul automatique des tarifs, génération d\'étiquettes et options pour colis spéciaux.'
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
            stats: { value: '5000+', label: 'Produits' },
            link: '/marketplace/products',
            longDescription: 'Une marketplace B2B complète pour acheter et vendre des produits avec gestion des stocks, upload d\'images et recherche avancée.'
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
            stats: { value: '-30%', label: 'Économies' },
            link: '/marketplace/kilos',
            longDescription: 'Optimisez vos coûts en achetant ou vendant des kilos d\'espace avec d\'autres expéditeurs. Transactions sécurisées et évaluations transparentes.'
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
            stats: { value: '100%', label: 'Sécurisé' },
            link: '/payments',
            longDescription: 'Des solutions de paiement multiples et entièrement sécurisées avec facturation automatique et rapprochement bancaire intégré.'
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
            stats: { value: 'Auto', label: 'Génération' },
            link: '/payments/invoice',
            longDescription: 'Générez automatiquement des factures professionnelles au format PDF, avec envoi automatique et archivage légal conforme.'
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
            stats: { value: '24/7', label: 'Notifications' },
            link: '/notifications',
            longDescription: 'Un système de notification multicanal (email, SMS, push) pour tenir vos clients informés à chaque étape du processus.'
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
            stats: { value: '4K', label: 'Max pixels' },
            link: '/marketplace/products/add',
            longDescription: 'Une interface d\'upload d\'images intuitive avec compression automatique, recadrage intégré et galerie produits.'
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
            stats: { value: '+45%', label: 'Performance' },
            link: '/analytics',
            longDescription: 'Un dashboard analytics complet avec graphiques interactifs, indicateurs clés en temps réel et rapports exportables.'
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

    const openModal = (feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFeature(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <Navbar />
            {/* ========== HERO SECTION AVEC STATISTIQUES ========== */}
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
                            <span className="text-xs sm:text-sm font-medium tracking-wider">Fonctionnalités avancées</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                            Tout ce dont vous avez besoin
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
                                en un seul endroit
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2">
                            Découvrez l'ensemble des fonctionnalités qui font de CargoSphere
                            la plateforme logistique préférée des professionnels.
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
                                            <div className="flex gap-2">
                                                {/* Bouton Modal */}
                                                <button
                                                    onClick={() => openModal(feature)}
                                                    className={`text-sm font-medium ${feature.textColor} hover:opacity-80 transition-opacity
                                    flex items-center gap-1 group-hover:gap-2 transition-all`}
                                                >
                                                    Détails
                                                    <ChevronRightIcon className="w-4 h-4" />
                                                </button>

                                                {/* Bouton Navigation */}
                                                <button
                                                    onClick={() => handleNavigation(feature.link)}
                                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 
                                   transition-colors flex items-center gap-1"
                                                    title="Accéder à la page"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========== MODAL ========== */}
            {isModalOpen && selectedFeature && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={closeModal}
                    />

                    {/* Modal Content */}
                    <div className="relative min-h-screen flex items-center justify-center p-4">
                        <div
                            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
                         transform transition-all duration-300 scale-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header avec image */}
                            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                <div className={`absolute inset-0 bg-gradient-to-r ${selectedFeature.color} opacity-90`} />
                                <img
                                    src={selectedFeature.image}
                                    alt={selectedFeature.title}
                                    className="w-full h-full object-cover mix-blend-overlay"
                                />
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2
                           hover:bg-white/30 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Contenu */}
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-14 h-14 ${selectedFeature.bgLight} rounded-xl flex items-center justify-center`}>
                                        <selectedFeature.icon className={`w-7 h-7 ${selectedFeature.textColor}`} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedFeature.title}</h2>
                                        <p className="text-sm text-slate-500">{selectedFeature.category}</p>
                                    </div>
                                </div>

                                <p className="text-slate-700 mb-6 leading-relaxed">
                                    {selectedFeature.longDescription}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Fonctionnalités détaillées :</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedFeature.details.map((detail, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckIcon className={`w-4 h-4 ${selectedFeature.textColor} flex-shrink-0 mt-0.5`} />
                                                <span className="text-sm text-slate-600">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">Statistique clé :</span>
                                        <span className="text-lg font-bold text-slate-900">{selectedFeature.stats.value}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{selectedFeature.stats.label}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to={selectedFeature.link}
                                        className={`flex-1 py-3 bg-gradient-to-r ${selectedFeature.color} text-white 
                               rounded-xl font-medium text-center hover:shadow-lg 
                               transform hover:scale-105 transition-all duration-300`}
                                        onClick={closeModal}
                                    >
                                        Accéder à la fonctionnalité
                                    </Link>
                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl 
                             font-medium hover:bg-slate-50 transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== SECTION AVANTAGES ========== */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT CONTENT */}
                        <div>

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 shadow-sm">
                                <ClockIcon className="w-4 h-4" />
                                <span className="text-sm font-semibold tracking-wide">
                                    Mise à jour continue
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Des fonctionnalités qui évoluent
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    avec votre entreprise
                                </span>
                            </h2>

                            {/* Description */}
                            <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-xl">
                                Notre équipe développe constamment de nouvelles fonctionnalités
                                pour répondre à vos besoins. Chaque mois, des améliorations sont
                                déployées pour vous offrir une expérience toujours plus performante.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    'Mises à jour mensuelles',
                                    'Fonctionnalités votées par les clients',
                                    'Roadmap transparente',
                                    'Accès bêta exclusif',
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                        </div>

                                        <span className="text-slate-700 font-medium text-sm">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative group">

                            {/* glow background */}
                            <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl 
                                group-hover:scale-110 transition-transform duration-700" />

                            <img
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Équipe CargoSphere"
                                className="relative rounded-3xl shadow-2xl transform 
                               group-hover:scale-105 transition duration-700"
                            />

                        </div>

                    </div>
                </div>
            </section>


            {/* ========== CTA FINAL ========== */}
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

                    <p className="mt-6 flex flex-wrap justify-center items-center gap-3 
              text-sm text-white/80 font-medium tracking-wide">

                        <span className="flex items-center gap-1">
                            ✅ Sans engagement
                        </span>

                        <span className="w-1 h-1 bg-white/40 rounded-full"></span>

                        <span className="flex items-center gap-1">
                            🎁 Essai gratuit 14 jours
                        </span>

                        <span className="w-1 h-1 bg-white/40 rounded-full"></span>

                        <span className="flex items-center gap-1">
                            🛟 Support 24/7
                        </span>

                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Caracteristiques;










