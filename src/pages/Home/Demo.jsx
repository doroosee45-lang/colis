import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer'
import {
    PlayIcon,
    PauseIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    XMarkIcon,
    ChevronRightIcon,
    SparklesIcon,
    CubeIcon,
    TruckIcon,
    GlobeAltIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

const Demo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const controlsTimeout = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cacher les contrôles après 3 secondes d'inactivité
    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleSeek = (e) => {
        if (videoRef.current && videoRef.current.duration) {
            const rect = e.target.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const handleFullscreen = () => {
        if (videoContainerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoContainerRef.current.requestFullscreen();
            }
        }
    };

    const openFeatureModal = (feature) => {
        setSelectedFeature(feature);
        setShowModal(true);
    };

    const features = [
        {
            icon: CubeIcon,
            title: 'Gestion des colis',
            description: 'Créez, suivez et gérez tous vos colis en temps réel',
            time: '0:45',
            color: 'from-blue-500 to-cyan-500',
            details: [
                'Création rapide de colis',
                'Génération automatique d\'étiquettes',
                'Suivi GPS en direct',
                'Historique complet'
            ]
        },
        {
            icon: TruckIcon,
            title: 'Tracking en temps réel',
            description: 'Suivez vos livraisons minute par minute',
            time: '1:20',
            color: 'from-emerald-500 to-teal-500',
            details: [
                'Géolocalisation précise',
                'Notifications automatiques',
                'Preuve de livraison',
                'Photos des étapes'
            ]
        },
        {
            icon: GlobeAltIcon,
            title: 'Marketplace de kilos',
            description: 'Achetez et vendez des kilos d\'espace',
            time: '2:05',
            color: 'from-purple-500 to-pink-500',
            details: [
                'Optimisation des coûts',
                'Transactions sécurisées',
                'Négociation intégrée',
                'Évaluations vendeurs'
            ]
        },
        {
            icon: ChartBarIcon,
            title: 'Analytics avancés',
            description: 'Visualisez vos performances en temps réel',
            time: '1:50',
            color: 'from-orange-500 to-red-500',
            details: [
                'Tableaux de bord interactifs',
                'Rapports exportables',
                'Indicateurs clés',
                'Prévisions IA'
            ]
        },
        {
            icon: ShieldCheckIcon,
            title: 'Sécurité & Assurance',
            description: 'Protection optimale pour tous vos colis',
            time: '0:55',
            color: 'from-indigo-500 to-blue-500',
            details: [
                'Assurance incluse',
                'Suivi sécurisé',
                'Signature électronique',
                'Conformité RGPD'
            ]
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Paiements intégrés',
            description: 'Solutions de paiement multiples et sécurisées',
            time: '1:15',
            color: 'from-amber-500 to-yellow-500',
            details: [
                'Carte bancaire',
                'Virement',
                'PayPal',
                'Facturation auto'
            ]
        }
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
                            <span className="text-xs sm:text-sm font-medium tracking-wider">Découvrez CargoSphere en action</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                            Une plateforme logistique
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mt-2">
                                pensée pour votre réussite
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2">
                            Regardez notre vidéo de démonstration pour découvrir comment CargoSphere
                            peut transformer votre gestion logistique.
                        </p>
                    </div>
                </div>

                {/* Stats flottantes - OPTIMISÉES POUR MOBILE */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">

                </div>

                {/* Wave effect en bas */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* ========== VIDÉO PLAYER AVEC FOND ========== */}
            <section className="pb-16 relative overflow-hidden">
                {/* Image d'arrière-plan avec zoom - NETTE */}
                <div className="absolute inset-0 w-full h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Découvrez CargoSphere en action
                        </h3>
                        <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                            Une plateforme complète pour gérer toute votre logistique
                        </p>
                    </div>

                    <div
                        ref={videoContainerRef}
                        className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/30 backdrop-blur-sm aspect-video group border border-white/10"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => isPlaying && setShowControls(false)}
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster="https://www.menkoraviation.com/wp-content/uploads/2020/09/Airbus_A300-600ST_Beluga_Super_Transporter_Cargo.jpeg"
                            onTimeUpdate={handleTimeUpdate}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src={`${process.env.PUBLIC_URL}/videos/Demo.mp4`} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture vidéo.
                        </video>

                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <button
                                    onClick={handlePlayPause}
                                    className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full 
                           flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                                >
                                    <PlayIcon className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        )}

                        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4
                            transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>

                            <div
                                className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                                onClick={handleSeek}
                            >
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <button
                                        onClick={handlePlayPause}
                                        className="text-white hover:text-blue-400 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <PauseIcon className="w-5 h-5 md:w-6 md:h-6" />
                                        ) : (
                                            <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
                                        )}
                                    </button>

                                    <button
                                        onClick={handleMute}
                                        className="text-white hover:text-blue-400 transition-colors"
                                    >
                                        {isMuted ? (
                                            <SpeakerXMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
                                        ) : (
                                            <SpeakerWaveIcon className="w-5 h-5 md:w-6 md:h-6" />
                                        )}
                                    </button>

                                    <span className="text-white text-xs md:text-sm">
                                        {videoRef.current ? (
                                            `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')} / 
                       ${Math.floor(videoRef.current.duration / 60)}:${Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0')}`
                                        ) : '0:00 / 6:30'}
                                    </span>
                                </div>

                                <button
                                    onClick={handleFullscreen}
                                    className="text-white hover:text-blue-400 transition-colors"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ✅ highlights est maintenant défini et utilisable */}
                    </div>
                </div>
            </section>

            {/* ========== FONCTIONNALITÉS DE LA VIDÉO ========== */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                            Ce que vous allez découvrir
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Cliquez sur chaque fonctionnalité pour en savoir plus
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => openFeatureModal(feature)}
                                    className="group bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl 
                           transform hover:scale-105 hover:-translate-y-2 
                           transition-all duration-500 border border-slate-100
                           cursor-pointer relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                                 group-hover:opacity-5 transition-opacity duration-500`} />

                                    <div className="flex items-start gap-3">
                                        <div className={`p-2.5 bg-gradient-to-br ${feature.color} rounded-xl text-white shadow-lg
                                    group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.title}</h3>
                                            <p className="text-xs text-slate-600">{feature.description}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                                    ⏱️ {feature.time}
                                                </span>
                                                <span className="text-xs text-blue-600 group-hover:translate-x-1 transition-transform">
                                                    En savoir plus
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========== AVANTAGES ========== */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                                Pourquoi regarder cette démo ?
                            </h2>
                            <div className="space-y-3">
                                {[
                                    'Découvrez l\'interface intuitive en action',
                                    'Comprenez comment optimiser votre logistique',
                                    'Voyez des cas concrets d\'utilisation',
                                    'Apprenez à utiliser toutes les fonctionnalités'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                            <CheckIcon className="w-3 h-3 text-green-600" />
                                        </div>
                                        <p className="text-sm text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium
                           hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    Commencer gratuitement
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl text-sm font-medium
                           hover:bg-slate-100 transition-colors"
                                >
                                    Contacter un expert
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Équipe"
                                className="rounded-xl shadow-2xl"
                            />
                            <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 shadow-lg">
                                <div className="flex items-center gap-2">
                                    <PlayIcon className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-xs font-semibold">6:30 minutes</p>
                                        <p className="text-xs text-slate-500">Vidéo démo complète</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* ========== MODAL FONCTIONNALITÉ ========== */}
            {showModal && selectedFeature && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />

                    <div className="relative min-h-screen flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full">
                            {/* Header */}
                            <div className={`p-5 bg-gradient-to-r ${selectedFeature.color} rounded-t-2xl`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <selectedFeature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{selectedFeature.title}</h3>
                                        <p className="text-xs text-white/80">{selectedFeature.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-3">
                                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Fonctionnalités détaillées :</h4>
                                    <ul className="space-y-1.5">
                                        {selectedFeature.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-xs text-slate-600">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                    <p className="text-xs text-slate-600">
                                        ⏱️ Cette fonctionnalité est présentée à {selectedFeature.time} dans la vidéo
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const seconds = parseInt(selectedFeature.time.split(':')[0]) * 60 + parseInt(selectedFeature.time.split(':')[1]);
                                            if (videoRef.current) {
                                                videoRef.current.currentTime = seconds;
                                                videoRef.current.play();
                                                setIsPlaying(true);
                                            }
                                            setShowModal(false);
                                        }}
                                        className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium
                             hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        Voir dans la vidéo
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium
                             hover:bg-slate-50 transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            <Footer />
        </div>

    );
};

export default Demo;