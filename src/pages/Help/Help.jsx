import React, { useState } from 'react';
import {
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

// ─── Données ───────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'Comment créer un nouveau colis ?',
    answer: 'Pour créer un nouveau colis, rendez-vous dans la section "Colis" puis cliquez sur "Nouveau colis". Remplissez les informations requises et validez.',
  },
  {
    question: 'Comment suivre un colis ?',
    answer: 'Vous pouvez suivre un colis en entrant son numéro de suivi dans la barre de recherche ou en accédant à la page du colis et en cliquant sur "Tracking".',
  },
  {
    question: 'Comment générer une facture ?',
    answer: 'Les factures sont automatiquement générées pour chaque paiement. Vous pouvez les télécharger depuis la page des paiements ou du colis concerné.',
  },
  {
    question: 'Comment vendre sur la marketplace ?',
    answer: "Pour vendre un produit, allez dans Marketplace > \"Vendre un produit\" et remplissez le formulaire. Pour vendre des kilos, utilisez l'option \"Vendre des kilos\".",
  },
  {
    question: 'Comment contacter le support ?',
    answer: 'Vous pouvez nous contacter par email à support@cargosphere.com ou par téléphone au +33 1 23 45 67 89.',
  },
  {
    question: 'Comment réinitialiser mon mot de passe ?',
    answer: 'Sur la page de connexion, cliquez sur "Mot de passe oublié" et suivez les instructions envoyées à votre adresse email.',
  },
];

const guides = [
  {
    title: 'Guide de démarrage',
    description: 'Maîtrisez CargoSphere en 10 minutes avec notre guide pas-à-pas.',
    icon: BookOpenIcon,
    color: 'blue',
    badge: 'Recommandé',
  },
  {
    title: 'Tutoriels vidéo',
    description: 'Apprenez visuellement avec nos vidéos explicatives détaillées.',
    icon: VideoCameraIcon,
    color: 'red',
    badge: 'Nouveau',
  },
  {
    title: 'Documentation API',
    description: 'Intégrez CargoSphere dans vos systèmes grâce à notre API REST.',
    icon: DocumentTextIcon,
    color: 'purple',
    badge: 'Développeurs',
  },
];

const support = [
  {
    title: 'Chat en direct',
    description: 'Notre équipe répond en moins de 2 minutes.',
    icon: ChatBubbleLeftRightIcon,
    action: 'Démarrer un chat',
    color: 'green',
    available: true,
  },
  {
    title: 'Support email',
    description: 'Réponse garantie sous 24h ouvrées.',
    icon: EnvelopeIcon,
    action: 'support@cargosphere.com',
    color: 'blue',
    available: true,
  },
  {
    title: 'Téléphone',
    description: 'Du lundi au vendredi, 9h–18h.',
    icon: PhoneIcon,
    action: '+33 1 23 45 67 89',
    color: 'purple',
    available: false,
  },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────
const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className={`border rounded-xl overflow-hidden transition-all duration-200
    ${isOpen ? 'border-blue-200 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
    <button
      onClick={onToggle}
      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-900 text-sm leading-snug">{faq.question}</span>
      <ChevronDownIcon className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200
        ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-5 pb-4 pt-3 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
        {faq.answer}
      </div>
    )}
  </div>
);

// ─── Help Page ─────────────────────────────────────────────────────────────
const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq]     = useState(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero — même style que About.jsx ── */}
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
            <span className="text-sm font-medium tracking-wider uppercase">CENTRE D'AIDE</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Comment pouvons-nous
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              vous aider ?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Trouvez des réponses dans notre FAQ, consultez les guides ou contactez directement notre équipe support.
          </p>

          {/* Recherche dans le hero */}
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/15 border border-white/25
                       text-white placeholder-slate-300 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20
                       transition-all backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Wave — identique à About */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* ── Contenu principal — même structure que About ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16 space-y-12">

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '5 min', label: 'Temps de réponse moyen' },
            { value: '98%', label: 'Taux de satisfaction' },
            { value: '24/7', label: 'Disponibilité email' },
            { value: '50+', label: 'Articles d\'aide' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Guides */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Guides & Ressources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <div key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6
                         hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${guide.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <guide.icon className={`w-6 h-6 text-${guide.color}-600`} />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full bg-${guide.color}-50 text-${guide.color}-700`}>
                    {guide.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Questions fréquentes
            </h2>
            {searchQuery && (
              <span className="text-sm text-gray-400">
                {filteredFaqs.length} résultat{filteredFaqs.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  isOpen={activeFaq === i}
                  onToggle={() => setActiveFaq(activeFaq === i ? null : i)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <MagnifyingGlassIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">Aucune question ne correspond à votre recherche.</p>
              <button onClick={() => setSearchQuery('')}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                Effacer la recherche
              </button>
            </div>
          )}
        </div>

        {/* Support */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Contacter le support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {support.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.available && (
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <button className={`text-${item.color}-600 hover:text-${item.color}-800 text-sm font-medium transition-colors`}>
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — même style que About */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vous n'avez pas trouvé de réponse ?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Notre équipe support est disponible pour répondre à toutes vos questions personnalisées.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:support@cargosphere.com"
              className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Envoyer un email
            </a>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Démarrer un chat
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Help;