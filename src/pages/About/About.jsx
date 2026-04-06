import React, { useEffect, useState } from 'react';
import {
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: 'Colis livrés', value: '150K+', icon: RocketLaunchIcon },
    { label: 'Clients satisfaits', value: '25K+', icon: UsersIcon },
    { label: 'Pays desservis', value: '15', icon: GlobeAltIcon },
    { label: 'Agences', value: '12', icon: ShieldCheckIcon },
  ];

  const features = [
    {
      icon: RocketLaunchIcon,
      title: 'Livraison rapide',
      description: 'Optimisation des itinéraires et réseau de transport efficace',
      color: 'blue',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Sécurité garantie',
      description: 'Suivi en temps réel et assurance incluse pour chaque colis',
      color: 'green',
    },
    {
      icon: UsersIcon,
      title: 'Service client',
      description: 'Équipe dédiée disponible 7j/7 pour vous accompagner',
      color: 'purple',
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics avancés',
      description: 'Tableaux de bord détaillés pour suivre votre activité',
      color: 'orange',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Prix compétitifs',
      description: 'Tarifs transparents et adaptés à vos besoins',
      color: 'emerald',
    },
    {
      icon: GlobeAltIcon,
      title: 'Couverture internationale',
      description: 'Réseau de partenaires dans le monde entier',
      color: 'cyan',
    },
  ];

  const team = [
    {
      name: 'Jean Dupont',
      role: 'Fondateur & CEO',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Marie Martin',
      role: 'Directrice des opérations',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Pierre Durand',
      role: 'CTO',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Sophie Bernard',
      role: 'Responsable clientèle',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
            style={{
              backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
        </div>

        {/* Contenu Hero */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mb-12">
          <div
            className="transform transition-transform duration-700"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
              <SparklesIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium tracking-wider uppercase">À PROPOS</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre partenaire logistique
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                de confiance
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              CargoSphere révolutionne la gestion logistique avec une plateforme intégrée
              offrant suivi en temps réel, marketplace collaborative et analytics avancés.
            </p>
          </div>
        </div>

        {/* Stats flottantes */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16 space-y-12">
        {/* Mission */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">Notre mission</h2>
          <p className="text-lg text-primary-800 max-w-3xl mx-auto leading-relaxed">
            Simplifier la logistique pour les entreprises de toutes tailles en offrant
            une plateforme complète, intuitive et fiable qui connecte expéditeurs,
            transporteurs et destinataires.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Pourquoi choisir CargoSphere ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Notre équipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-primary-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers d'entreprises qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Créer un compte
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Contacter les ventes
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;