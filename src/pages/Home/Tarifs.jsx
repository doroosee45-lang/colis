import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer'
import {
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    CubeIcon,
    RocketLaunchIcon,
    BuildingOfficeIcon,
    GlobeAltIcon,
    PhoneIcon,
    EnvelopeIcon,
    ArrowPathIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon, SparklesIcon
} from '@heroicons/react/24/outline';

const Tarifs = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const plans = [
        {
            name: 'Essentiel',
            description: 'Pour les petites entreprises qui débutent',
            price: { monthly: 29, yearly: 290 },
            features: [
                { name: 'Jusqu\'à 100 colis/mois', included: true },
                { name: 'Suivi en temps réel', included: true },
                { name: 'Gestion clients', included: true },
                { name: 'Support email', included: true },
                { name: 'Marketplace produits', included: false },
                { name: 'Marketplace kilos', included: false },
                { name: 'Analytics avancés', included: false },
                { name: 'API access', included: false },
            ],
            icon: CubeIcon,
            color: 'from-blue-500 to-cyan-500',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200',
            popular: false,
        },
        {
            name: 'Professionnel',
            description: 'Pour les entreprises en croissance',
            price: { monthly: 79, yearly: 790 },
            features: [
                { name: 'Jusqu\'à 500 colis/mois', included: true },
                { name: 'Suivi en temps réel', included: true },
                { name: 'Gestion clients', included: true },
                { name: 'Support prioritaire', included: true },
                { name: 'Marketplace produits', included: true },
                { name: 'Marketplace kilos', included: true },
                { name: 'Analytics avancés', included: false },
                { name: 'API access', included: false },
            ],
            icon: RocketLaunchIcon,
            color: 'from-purple-500 to-pink-500',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600',
            borderColor: 'border-purple-200',
            popular: true,
        },
        {
            name: 'Enterprise',
            description: 'Pour les grandes entreprises',
            price: { monthly: 199, yearly: 1990 },
            features: [
                { name: 'Colis illimités', included: true },
                { name: 'Suivi en temps réel', included: true },
                { name: 'Gestion clients', included: true },
                { name: 'Support dédié 24/7', included: true },
                { name: 'Marketplace produits', included: true },
                { name: 'Marketplace kilos', included: true },
                { name: 'Analytics avancés', included: true },
                { name: 'API access', included: true },
            ],
            icon: BuildingOfficeIcon,
            color: 'from-emerald-500 to-teal-500',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200',
            popular: false,
        },
    ];

    const addons = [
        { name: 'Kilos supplémentaires', price: '0.50 €/kg', description: 'Achetez des kilos en plus de votre forfait' },
        { name: 'Support prioritaire', price: '49 €/mois', description: 'Réponse garantie sous 1 heure' },
        { name: 'API Entreprise', price: '99 €/mois', description: 'Intégration complète avec vos systèmes' },
        { name: 'Formation équipe', price: '590 €', description: 'Session de formation de 2 jours' },
    ];


    const stats = [
        { value: '98%', label: 'Clients satisfaits', icon: ChartBarIcon },
        { value: '24/7', label: 'Support disponible', icon: PhoneIcon },
        { value: '99.9%', label: 'Taux de disponibilité', icon: ShieldCheckIcon },
        { value: '15+', label: 'Pays desservis', icon: GlobeAltIcon },
    ];

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <Navbar />
            {/* ========== HERO SECTION AVEC STATISTIQUES ========== */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
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
                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mb-16">
                    <div
                        className="transform transition-transform duration-700"
                        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
                            <SparklesIcon className="w-4 h-4 text-blue-300" />
                            <span className="text-sm font-medium tracking-wider">💰 Tarifs transparents</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Des tarifs adaptés à
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                                votre croissance
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                            Choisissez le forfait qui correspond à vos besoins. Pas de frais cachés, résiliation sans engagement.
                        </p>
                    </div>
                </div>

                {/* Stats flottantes - MIEUX ESPACÉES */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20
                        transform hover:scale-105 hover:-translate-y-2 transition-all duration-300
                        shadow-lg hover:shadow-xl"
                                >
                                    <Icon className="w-8 h-8 mx-auto text-blue-300 mb-3" />
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-300">{stat.label}</div>
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























































































































            {/* ========== TOGGLE MENSUEL/ANNUEL ========== */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center items-center gap-4">
                        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
                            Mensuel
                        </span>

                        <button
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
                            ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
                        </button>

                        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>
                            Annuel
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                -17%
                            </span>
                        </span>
                    </div>
                </div>
            </section>

            {/* ========== PLANS PRINCIPAUX ========== */}
            <section className="pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => {
                            const Icon = plan.icon;
                            const price = plan.price[billingCycle];

                            return (
                                <div
                                    key={idx}
                                    className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                            transform hover:scale-105 hover:-translate-y-2 
                            transition-all duration-500 border ${plan.borderColor}
                            ${plan.popular ? 'ring-2 ring-blue-500 shadow-blue-100' : ''}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                                🌟 Plus populaire
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-8">
                                        {/* En-tête */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-12 h-12 ${plan.bgLight} rounded-xl flex items-center justify-center`}>
                                                <Icon className={`w-6 h-6 ${plan.textColor}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                                <p className="text-xs text-slate-500">{plan.description}</p>
                                            </div>
                                        </div>

                                        {/* Prix */}
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold text-slate-900">{price} €</span>
                                            <span className="text-slate-500 ml-2">/{billingCycle === 'monthly' ? 'mois' : 'an'}</span>
                                            {billingCycle === 'yearly' && (
                                                <div className="mt-1 text-xs text-green-600">
                                                    Économisez {plan.price.monthly * 12 - price} €
                                                </div>
                                            )}
                                        </div>

                                        {/* Bouton CTA */}
                                        <Link
                                            to="/register"
                                            className={`block w-full py-3 px-4 rounded-xl text-center font-medium
                                bg-gradient-to-r ${plan.color} text-white
                                hover:shadow-lg hover:shadow-blue-500/25
                                transform hover:scale-105 transition-all duration-300
                                mb-6`}
                                        >
                                            Commencer
                                        </Link>

                                        {/* Caractéristiques */}
                                        <div className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    {feature.included ? (
                                                        <CheckIcon className={`w-5 h-5 ${plan.textColor} flex-shrink-0`} />
                                                    ) : (
                                                        <XMarkIcon className="w-5 h-5 text-slate-300 flex-shrink-0" />
                                                    )}
                                                    <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                                                        {feature.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========== IMAGE SECTION ========== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

                {/* IMAGE BACKGROUND */}
                <div
                    className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
                    }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Des tarifs qui évoluent avec vous
                    </h2>

                    <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
                        Changez de forfait à tout moment, résiliez quand vous voulez.
                        Nous croyons en la transparence et la flexibilité pour accompagner
                        votre croissance.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >
                            Contacter les ventes
                        </Link>

                        <Link
                            to="/faq"
                            className="px-6 py-3 border border-white rounded-xl font-semibold hover:bg-white/10 transition"
                        >
                            Voir la FAQ
                        </Link>
                    </div>

                </div>
            </section>



            {/* ========== ADDONS ========== */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Options complémentaires
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Personnalisez votre forfait avec nos options à la carte pour maximiser vos performances logistiques.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {addons.map((addon, idx) => (
                            <div
                                key={idx}
                                className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-md
                     hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-cyan-50/20 to-transparent rounded-2xl pointer-events-none" />

                                <h3 className="font-semibold text-xl text-slate-900 mb-3">
                                    {addon.name}
                                </h3>
                                <p className="text-3xl font-extrabold text-blue-600 mb-3">
                                    {addon.price}
                                </p>
                                <p className="text-sm text-slate-500">{addon.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ========== CTA FINAL ========== */}    {/* SUPPORT SECTION */}{/* SUPPORT SECTION */}
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
                        Besoin d'aide immédiate ?
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        Notre équipe support est disponible 24h/24 et 7j/7 pour vous assister dans vos projets logistiques.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="tel:+33123456789"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg
                   hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-2xl group"
                        >
                            <PhoneIcon className="w-6 h-6" />
                            Appeler maintenant
                        </a>

                        <Link
                            to="/help"
                            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/30 text-white rounded-2xl font-bold text-lg
                   hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm group"
                        >
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            Chat en direct
                        </Link>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full animate-pulse-slow" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full animate-pulse-slow" />
            </section>
            <Footer />
        </div>
    );
};

export default Tarifs;