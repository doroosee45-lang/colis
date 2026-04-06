import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar'; // Import du Navbar
import Footer from '../../components/Layout/Footer'
import {
    ChevronRightIcon,
    PlayIcon,
    CheckIcon,
    GlobeAltIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    CubeIcon,
    TruckIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ArrowUpIcon
} from '@heroicons/react/24/outline';

const Home = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const stats = [
        { value: '150K+', label: 'Colis livrés', icon: CubeIcon },
        { value: '25K+', label: 'Clients satisfaits', icon: UserGroupIcon },
        { value: '50+', label: 'Pays desservis', icon: GlobeAltIcon },
        { value: '99.9%', label: 'Taux de livraison', icon: ShieldCheckIcon },
    ];

    const features = [
        {
            icon: RocketLaunchIcon,
            title: 'Livraison Express',
            description: 'Livraison en 24-48h dans le monde entier avec suivi en temps réel',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Sécurité Garantie',
            description: 'Assurance incluse et protection optimale pour tous vos colis',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            icon: ChartBarIcon,
            title: 'Analytics Avancés',
            description: 'Tableaux de bord détaillés pour optimiser votre logistique',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Prix Compétitifs',
            description: 'Tarifs transparents et adaptés à tous les volumes',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: GlobeAltIcon,
            title: 'Couverture Internationale',
            description: 'Réseau de partenaires dans plus de 50 pays',
            color: 'from-indigo-500 to-blue-500',
        },
        {
            icon: TruckIcon,
            title: 'Flotte Moderne',
            description: 'Véhicules adaptés à tous types de marchandises',
            color: 'from-amber-500 to-yellow-500',
        },
    ];

    const testimonials = [
        {
            name: 'Sophie Martin',
            role: 'Directrice Logistique, TechCorp',
            content: 'CargoSphere a transformé notre gestion logistique. Le suivi en temps réel et la marketplace de kilos nous ont fait économiser 30% sur nos coûts.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
        },
        {
            name: 'Thomas Dubois',
            role: 'Fondateur, EcoMarket',
            content: 'La plateforme est incroyablement intuitive. L\'intégration avec notre système existant s\'est faite en quelques jours seulement.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
        },
        {
            name: 'Marie Lambert',
            role: 'Responsable Export, LuxeGroup',
            content: 'Le service client est exceptionnel et les analytics nous aident à prendre les bonnes décisions au bon moment.',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            rating: 5,
        },
    ];

    const partners = [
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/DHL_Logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/6/69/Logo_FedEx.svg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/UPS_Logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/Uber_logo_2018.svg',
    ];

    const footerLinks = {
        company: [
            { name: 'À propos', href: '/about' },
            { name: 'Carrières', href: '/careers' },
            { name: 'Blog', href: '/blog' },
            { name: 'Presse', href: '/press' },
        ],
        solutions: [
            { name: 'Expédition', href: '/shipping' },
            { name: 'Tracking', href: '/tracking' },
            { name: 'Marketplace', href: '/marketplace' },
            { name: 'Analytics', href: '/analytics' },
        ],
        support: [
            { name: "Centre d'aide", href: '/help' },
            { name: 'Contact', href: '/contact' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Conditions', href: '/terms' },
        ],
    };

    // Icônes sociales personnalisées
    const SocialIcon = ({ type }) => {
        switch (type) {
            case 'facebook':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                );
            case 'twitter':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const socialLinks = [
        { type: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
        { type: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
        { type: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
        { type: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
    ];

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">

            {/* ========== NAVBAR IMPORTÉ ========== */}
            <Navbar />

            {/* ========== HERO SECTION AVEC IMAGES EN ARRIÈRE-PLAN ========== */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* PREMIÈRE IMAGE DE FOND - AVION (ZOOM LENT) - PLUS CLAIRE */}
                <div className="absolute inset-0 w-full h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')",
                            filter: "brightness(0.85)"
                        }}
                    />
                </div>

                {/* DEUXIÈME IMAGE - PERSONNE (ZOOM PLUS RAPIDE) avec opacité - PLUS CLAIRE */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom-fast opacity-40 mix-blend-overlay"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                        }}
                    />
                </div>

                {/* OVERLAY GRADIENT - PLUS LÉGER */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />

                {/* PARTICLES DE LUMIÈRE - PLUS SUBTILES */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse animation-delay-1000" />
                </div>

                {/* Contenu Hero */}
                <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
                    <div
                        className="transform transition-transform duration-700"
                        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 
                                    border border-white/20 animate-float">
                            <span className="text-sm font-medium tracking-wider">
                                🚀 Plus de 150 000 colis livrés
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            CargoSphere ERP
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                Votre partenaire logistique
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            La plateforme tout-en-un pour gérer vos expéditions, suivre vos colis
                            et optimiser votre chaîne logistique en temps réel.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/agenciesList"
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                                         rounded-xl text-white font-medium text-lg overflow-hidden
                                         transform hover:scale-105 transition-all duration-300
                                         shadow-2xl hover:shadow-blue-500/25"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Commencer maintenant
                                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 
                                              opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link
                                to="/packages/add"
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 
                                         rounded-xl text-white font-medium text-lg overflow-hidden
                                         transform hover:scale-105 transition-all duration-300
                                         shadow-2xl hover:shadow-blue-500/25"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Expedir un colis
                                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 
                                              opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>





                            <Link
                                to="/demo"
                                className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md 
           rounded-xl text-white font-medium border border-white/20
           hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center
                group-hover:bg-white/30 transition-colors">
                                    <PlayIcon className="w-5 h-5 text-white" />
                                </div>
                                Voir la démo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2" />
                    </div>
                </div>
            </section>

            {/* ========== STATISTIQUES ========== */}
            <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            CargoSphere en chiffres
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Des résultats concrets pour nos clients
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group text-center transform hover:scale-105 transition-all duration-500"
                            >
                                <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 
                                              rounded-2xl mb-4 shadow-lg group-hover:shadow-xl 
                                              transform group-hover:rotate-3 transition-all duration-300">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 
                                              group-hover:text-blue-600 transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FEATURES ========== */}
            <section id="solutions" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                            Fonctionnalités
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Une solution complète pour votre logistique
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Découvrez toutes les fonctionnalités qui font de CargoSphere
                            le choix n°1 des professionnels
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                                         transition-all duration-500 border border-slate-100
                                         transform hover:scale-105 hover:-translate-y-2"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                                               group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />

                                <div className={`inline-block p-4 bg-gradient-to-br ${feature.color} 
                                              rounded-xl text-white mb-6 transform group-hover:scale-110 
                                              group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 
                                             transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                <Link
                                    to="/solutions"
                                    className="mt-6 inline-flex items-center text-blue-600 font-semibold 
                                               opacity-0 group-hover:opacity-100 
                                               transform translate-y-2 group-hover:translate-y-0 
                                               transition-all duration-500 hover:text-blue-700"
                                >
                                    <span>En savoir plus</span>
                                    <ChevronRightIcon
                                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 
                                                   transition-transform duration-300"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ========== IMAGE SECTION ========== */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                                Interface intuitive
                            </span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Une plateforme intuitive et puissante
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Gérez l'intégralité de votre chaîne logistique depuis un seul endroit.
                                De la création d'expédition à la livraison finale, en passant par
                                la marketplace de kilos et les analytics avancés.
                            </p>

                            <div className="space-y-4">
                                {[
                                    'Suivi en temps réel de tous vos colis',
                                    'Marketplace collaborative pour acheter/vendre des kilos',
                                    'Génération automatique de factures PDF',
                                    'Notifications SMS et Email automatiques',
                                    'Tableaux de bord analytics personnalisables',
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center
                                                      group-hover:scale-110 transition-transform">
                                            <CheckIcon className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex gap-4">
                                <Link
                                    to="/marketplace/products"
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium
                                             hover:bg-slate-800 transform hover:scale-105 
                                             transition-all duration-300 shadow-lg"
                                >
                                    Commencer gratuitement
                                </Link>
                                <Link
                                    to="/marketplace/kilos"
                                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl 
                                             font-medium hover:bg-slate-100 transform hover:scale-105 
                                             transition-all duration-300"
                                >
                                    Vendre tes kilos
                                </Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-500/20 rounded-full 
                                            blur-3xl group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-cyan-500/20 rounded-full 
                                            blur-3xl group-hover:scale-110 transition-transform duration-700" />

                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Dashboard CargoSphere"
                                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 
                                         group-hover:rotate-1 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== MARKETPLACE KILOS ========== */}
            <section id="tarifs" className="relative py-24 overflow-hidden">
                {/* IMAGE DE FOND */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                            filter: "brightness(0.85) contrast(1.05)"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-800/80" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12">
                    <div className="text-center lg:text-left lg:max-w-lg flex flex-col items-center lg:items-start">
                        <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20 animate-float">
                            <span className="text-sm font-medium tracking-wider text-white">
                                ✨ Nous achetons vos Kilos
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
                            Marketplace de Kilos
                        </h2>

                        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-md">
                            Achetez et vendez des kilos d'espace de transport entre expéditeurs.
                            Optimisez vos coûts et maximisez vos profits.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10 text-center">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors">-30%</div>
                                <div className="text-sm text-gray-200">Réduction moyenne</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">+45%</div>
                                <div className="text-sm text-gray-200">Optimisation</div>
                            </div>
                        </div>

                        <Link
                            to="/marketplace/kilos"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Découvrir la marketplace
                                <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== TESTIMONIALS ========== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
                            Témoignages
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Ils nous font confiance
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Rejoignez les milliers d'entreprises qui optimisent leur logistique avec CargoSphere
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group bg-slate-50 rounded-2xl p-8 hover:shadow-2xl 
                                         transition-all duration-500 transform hover:scale-105 
                                         hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br 
                                              from-blue-500/10 to-cyan-500/10 rounded-bl-full 
                                              group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-white 
                                                     shadow-lg group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div>
                                            <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                            <p className="text-sm text-slate-600">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current 
                                                                transform group-hover:scale-110 transition-transform 
                                                                group-hover:rotate-12"
                                                style={{ transitionDelay: `${i * 50}ms` }}
                                                viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-slate-700 italic leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== PARTENAIRES ========== */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-slate-600 mb-10 text-lg">
                        Ils nous font confiance
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
                        {partners.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt={`Partner ${index + 1}`}
                                className="h-12 object-contain opacity-50 hover:opacity-100 
                                         transform hover:scale-110 transition-all duration-300 
                                         grayscale hover:grayscale-0 cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA FINAL ========== */}
            <section className="relative py-24 overflow-hidden">
                {/* IMAGE DE FOND */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
                        style={{
                            backgroundImage: "url('https://www.toulouse.aeroport.fr/sites/default/files/styles/atb_large/public/png/Fret_M.png?itok=lDW8IgEC')",
                            filter: "brightness(0.85) contrast(1.05)"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-800/80" />
                </div>

                {/* Éléments décoratifs animés */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-slate-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-400/10 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />

                {/* Contenu principal */}
                <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
                    <div className="transform hover:scale-105 transition-transform duration-700">

                        {/* Badge */}
                        <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
                            <span className="text-sm font-medium tracking-wider text-white">
                                🚀 Plus de 150 000 entreprises nous font confiance
                            </span>
                        </div>

                        {/* Titre */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
                            Prêt à révolutionner
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                votre logistique ?
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Rejoignez des milliers d'entreprises qui optimisent déjà leurs expéditions
                            avec CargoSphere et bénéficiez d'une solution complète et intuitive.
                        </p>

                        {/* Boutons CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg
                                         hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 
                                         transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Créer un compte gratuit
                                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <Link
                                to="/contact"
                                className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl 
                                         font-bold text-lg hover:bg-white/10 transform hover:scale-105 hover:-translate-y-1 
                                         transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Contacter les ventes
                                    <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>

                        {/* Avantages */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="flex flex-col items-center gap-2 text-gray-200">
                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">Sans engagement</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-gray-200">
                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">Annulation à tout moment</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-gray-200">
                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">Support 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 
                           to-cyan-600 rounded-xl text-white shadow-lg hover:shadow-xl 
                           transform hover:scale-110 transition-all duration-300 z-50
                           ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <ArrowUpIcon className="w-6 h-6 mx-auto" />
            </button>

            <Footer />
        </div>
    );
};

export default Home;