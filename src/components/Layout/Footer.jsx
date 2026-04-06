import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, ChevronRight, Send, CheckCircle, Shield, Bell } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000); }
  };

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80', alt: 'Entrepôt logistique', category: 'Logistique' },
    { id: 2, src: 'https://thumbs.dreamstime.com/b/concept-global-de-fret-a%C3%A9rien-colis-avec-le-globe-d-avion-et-terre-rendu-la-livraison-150837703.jpg', alt: 'Colis en transit', category: 'Expédition' },
    { id: 3, src: 'https://s.rfi.fr/media/display/ed364aac-0f9e-11ea-9052-005056a99247/w:1024/p:16x9/2010-10-31T143833Z_1255739308_BM2E6AV179601_RTRMADP_3_USA-YEMEN-GERMANY_0.JPG', alt: 'Camion de livraison', category: 'Transport' },
    { id: 4, src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=300&q=80', alt: 'Équipe CargoSphere', category: 'Équipe' },
  ];

  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Caractéristiques', href: '/caracteristiques' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Démo', href: '/demo' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Mentions légales', href: '/legal' },
    { name: 'Politique de confidentialité', href: '/privacy' },
    { name: 'Conditions générales', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Faqs', href: '/help' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-800)', borderTop: '1px solid rgba(14,165,233,0.12)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(14,165,233,0.04)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(14,165,233,0.03)' }} />

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      {/* Top separator line with glow */}
      <div className="relative w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* ── Main grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', boxShadow: '0 0 16px rgba(14,165,233,0.3)' }}>
                <Truck size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
                Cargo<span style={{ background: 'linear-gradient(135deg,#0ea5e9,#38bdf8,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sphere</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>
              La plateforme logistique nouvelle génération qui connecte expéditeurs, transporteurs et destinataires pour une gestion optimale de vos envois.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              {[
                { icon: Mail, text: 'contact@cargosphere.com', href: 'mailto:contact@cargosphere.com' },
                { icon: Phone, text: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
                { icon: MapPin, text: '123 Rue de la Logistique, 75001 Paris', href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)' }}>
                    <item.icon size={13} style={{ color: '#0ea5e9' }} />
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm transition-colors duration-200"
                      style={{ color: '#64748b' }}
                      onMouseEnter={e => e.target.style.color = '#94a3b8'}
                      onMouseLeave={e => e.target.style.color = '#64748b'}>
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: '#64748b' }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Sora, sans-serif', color: '#475569' }}>
              Liens rapides
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href}
                    className="flex items-center gap-1.5 text-sm transition-all duration-200 group"
                    style={{ color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.paddingLeft = '0'; }}>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Sora, sans-serif', color: '#475569' }}>
              Informations légales
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href}
                    className="flex items-center gap-1.5 text-sm transition-all duration-200 group"
                    style={{ color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.paddingLeft = '0'; }}>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color: '#0ea5e9' }} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Sora, sans-serif', color: '#475569' }}>
              Galerie CargoSphere
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {galleryImages.map(img => (
                <div key={img.id}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid rgba(14,165,233,0.1)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.35)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,165,233,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <img src={img.src} alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 flex items-end p-1.5 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(10,15,26,0.85), transparent)' }}>
                    <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(14,165,233,0.3)', border: '1px solid rgba(14,165,233,0.4)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}>
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: '#475569' }}>
              Découvrez notre activité en images
            </p>
          </div>
        </div>

        {/* ── Newsletter & Social ──────────────────────────────────── */}
        <div className="mb-8 rounded-2xl p-6"
          style={{ background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.1)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-white mb-1 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                Restez informé
              </h4>
              <p className="text-xs mb-3" style={{ color: '#64748b' }}>
                Recevez nos dernières actualités et offres exclusives
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(17,29,51,0.8)',
                    border: '1px solid rgba(14,165,233,0.2)',
                    color: '#e2e8f0',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(14,165,233,0.2)'}
                />
                <button type="submit"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: subscribed ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#0ea5e9,#0284c7)',
                    boxShadow: subscribed ? '0 4px 16px rgba(16,185,129,0.3)' : '0 4px 16px rgba(14,165,233,0.25)',
                    fontFamily: 'Sora, sans-serif',
                    minWidth: '80px',
                  }}>
                  {subscribed ? (
                    <><CheckCircle size={14} /> OK !</>
                  ) : (
                    <><Send size={14} /> S'inscrire</>
                  )}
                </button>
              </form>
            </div>

            {/* Social */}
            <div className="flex flex-col lg:items-end">
              <h4 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                Suivez-nous
              </h4>
              <div className="flex gap-2.5">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.name}
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1 group"
                    style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)', color: '#64748b' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.18)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(14,165,233,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.08)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.15)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {s.icon}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                      style={{ background: 'rgba(13,21,38,0.95)', color: '#94a3b8', border: '1px solid rgba(14,165,233,0.2)' }}>
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(14,165,233,0.08)' }}>
          <p className="text-xs" style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
            © {currentYear} CargoSphere.
            <span className="mx-2" style={{ color: '#1e2d4f' }}></span>
            Tous droits réservés.
            <span className="mx-2" style={{ color: '#1e2d4f' }}></span>
          </p>

          <div className="flex items-center gap-5">
            {[
              { icon: CheckCircle, label: 'Certifié', color: '#10b981' },
              { icon: Bell, label: 'Support 24/7', color: '#0ea5e9' },
              { icon: Shield, label: 'Paiement sécurisé', color: '#8b5cf6' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: '#475569' }}>
                <badge.icon size={14} style={{ color: badge.color }} />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;