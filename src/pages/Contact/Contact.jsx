import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar'; 
import Footer from '../../components/Layout/Footer'
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ChevronRightIcon, SparklesIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    const contactInfo = [
        { icon: EnvelopeIcon, title: 'Email', details: ['contact@cargosphere.com', 'support@cargosphere.com'], action: 'mailto:contact@cargosphere.com', color: 'from-blue-500 to-cyan-500' },
        { icon: PhoneIcon, title: 'Téléphone', details: ['+243 81 23 45 679', '+1 6 98 76 54 32'], action: 'tel:+2438123456789', color: 'from-emerald-500 to-teal-500' },
        { icon: MapPinIcon, title: 'Adresse', details: ['123 Rue de la Logistique', '75001 Kinshasa'], color: 'from-purple-500 to-pink-500' },
        { icon: ClockIcon, title: 'Horaires', details: ['Lun - Ven: 9h00 - 19h00', 'Sam: 10h00 - 16h00'], color: 'from-orange-500 to-red-500' }
    ];

    const faqs = [
        { question: "Comment puis-je suivre mon colis ?", answer: "Suivez votre colis depuis votre tableau de bord ou avec votre numéro de suivi." },
        { question: "Quels sont les délais de livraison ?", answer: "24-48h France, 3-5 jours Europe, 5-7 jours international." },
        { question: "Comment créer un compte professionnel ?", answer: "Inscrivez-vous sur notre page et choisissez 'Professionnel'. Validation sous 24h." }
    ];

    return (
             <div className="min-h-screen bg-white overflow-x-hidden">
               <Navbar />
  {/* ========== HERO SECTION AVEC STATISTIQUES ========== */}
  <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
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
    <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
      
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
          <SparklesIcon className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-medium tracking-wider">envoi un message</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Parlons de vos
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                projets logistiques
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
         Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
        </p>
      </div>

    {/* Wave effect en bas */}
    <div className="absolute bottom-0 left-0 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
        <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
      </svg>
    </div>
  </section>









            {/* CONTACT INFO CARDS */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 p-8 border border-slate-100 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                <div className={`inline-block p-4 bg-gradient-to-br ${info.color} rounded-xl text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <info.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{info.title}</h3>
                                {info.details.map((d, i) => <p key={i} className="text-slate-600 mb-1 text-sm">{d}</p>)}
                                {info.action && (
                                    <a href={info.action} className="mt-4 inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                        Nous contacter <ChevronRightIcon className="w-4 h-4 ml-1" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT FORM */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Envoyez-nous un message</h2>
                            <p className="text-slate-600 mb-6">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>

                            {isSubmitted && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
                                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                    <p className="text-green-700">Message envoyé avec succès ! Nous vous répondrons rapidement.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {['name', 'email', 'subject'].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            {field === 'name' ? 'Nom complet' : field.charAt(0).toUpperCase() + field.slice(1)}
                                        </label>
                                        <div className="relative group">
                                            {field === 'name' && <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />}
                                            {field === 'email' && <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />}
                                            {field === 'subject' && <ChatBubbleLeftRightIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />}
                                            <input
                                                type={field === 'email' ? 'email' : 'text'}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                required
                                                placeholder={field === 'name' ? 'ecrire votre nom' : field === 'email' ? 'votre e-mail' : 'Sujet de votre message'}
                                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Bonjour, j'aimerais des informations sur..."
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                    />
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group">
                                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span>Envoyer le message</span>}
                                    {!loading && <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>
                        </div>

                        {/* MAP + FAQ */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="h-64 bg-slate-200 relative">
                                    <iframe
                                        title="Carte CargoSphere"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674806!3d48.85837360866264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647899745678!5m2!1sfr!2sfr"
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Notre siège social</h3>
                                    <p className="text-slate-600 mb-4">123 Rue de la Logistique,DRC</p>
                                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group">
                                        Voir sur Google Maps <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                                    Questions fréquentes
                                </h3>

                                <div className="space-y-4">
                                    {faqs.map((faq, idx) => (
                                        <div
                                            key={idx}
                                            className="border-b border-slate-100 last:border-0 pb-4 last:pb-0 group transition-colors duration-300 hover:bg-slate-50 rounded-lg px-2"
                                        >
                                            <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                                {faq.question}
                                            </h4>
                                            <p className="text-sm text-slate-600">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/help"
                                    className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 group"
                                >
                                    Voir toutes les FAQs
                                    <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            {/* SUPPORT SECTION */}{/* SUPPORT SECTION */}
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

export default Contact;