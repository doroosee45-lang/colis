// import React, { useState, useEffect } from 'react';
// import {
//   CurrencyDollarIcon, CubeIcon, UserGroupIcon, TruckIcon,
//   ArrowUpIcon, ArrowDownIcon, CalendarIcon, BellIcon,
//   MagnifyingGlassIcon, ChevronRightIcon,
// } from '@heroicons/react/24/outline';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement,
//   LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler,
// } from 'chart.js';
// import { Line, Doughnut } from 'react-chartjs-2';
// import axios from '../../api/axios';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
//   BarElement, ArcElement, Title, Tooltip, Legend, Filler);

// const toArray = (res, ...keys) => {
//   const d = res?.data;
//   for (const k of keys) {
//     if (Array.isArray(d?.data?.[k])) return d.data[k];
//     if (Array.isArray(d?.[k])) return d[k];
//   }
//   if (Array.isArray(d?.data)) return d.data;
//   if (Array.isArray(d)) return d;
//   return [];
// };
// const fmt = (n) => Number(n || 0).toLocaleString('fr-FR');

// // ── Status badge ──────────────────────────────────────────────────────────────
// const Badge = ({ status }) => {
//   const map = {
//     'livré':       { bg:'#e8f9f0', color:'#1a9e5c', border:'#b7eacf' },
//     'en transit':  { bg:'#fff8e6', color:'#b87a00', border:'#ffe09c' },
//     'en attente':  { bg:'#e8f0ff', color:'#1a4fbf', border:'#b3caff' },
//     'payé':        { bg:'#e8f9f0', color:'#1a9e5c', border:'#b7eacf' },
//     'en attente de paiement': { bg:'#fff2e8', color:'#b85c00', border:'#ffd4a3' },
//     'annulé':      { bg:'#ffeaea', color:'#c0392b', border:'#ffb3b3' },
//   };
//   const s = map[status] || { bg:'#f3f4f6', color:'#6b7280', border:'#e5e7eb' };
//   return (
//     <span style={{ display:'inline-flex', alignItems:'center', gap:5,
//       padding:'3px 10px', borderRadius:20, fontSize:'0.68rem', fontWeight:600,
//       background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
//       <span style={{ width:5, height:5, borderRadius:'50%', background:s.color }} />
//       {status}
//     </span>
//   );
// };

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// const StatCard = ({ title, value, icon: Icon, sub, accent, bg, iconBg }) => (
//   <div style={{ background:'#fff', borderRadius:14, padding:'18px 20px',
//     boxShadow:'0 2px 12px rgba(0,0,0,0.06)', border:'1px solid #f0f0f0',
//     display:'flex', alignItems:'center', gap:16, position:'relative', overflow:'hidden' }}>
//     <div style={{ width:52, height:52, borderRadius:12,
//       background:iconBg, display:'flex', alignItems:'center', justifyContent:'center',
//       flexShrink:0 }}>
//       <Icon style={{ width:24, height:24, color:accent }} />
//     </div>
//     <div style={{ flex:1 }}>
//       <p style={{ fontSize:'0.72rem', color:'#9ca3af', fontWeight:500,
//         textTransform:'uppercase', letterSpacing:'0.05em', margin:0 }}>{title}</p>
//       <p style={{ fontSize:'1.65rem', fontWeight:700, color:'#1e2d5e',
//         margin:'3px 0 2px', lineHeight:1, fontFamily:"'Poppins',sans-serif" }}>{value}</p>
//       {sub && <p style={{ fontSize:'0.7rem', color:'#9ca3af', margin:0 }}>{sub}</p>}
//     </div>
//     {/* decorative corner */}
//     <div style={{ position:'absolute', right:-18, top:-18, width:70, height:70,
//       borderRadius:'50%', background:iconBg, opacity:0.5 }} />
//   </div>
// );

// // ── Upcoming exam row ────────────────────────────────────────────────────────
// const UpcomingRow = ({ subject, date, type }) => (
//   <div style={{ display:'flex', alignItems:'center', gap:14, padding:'11px 0',
//     borderBottom:'1px solid #f3f4f6' }}>
//     <div style={{ width:36, height:36, borderRadius:9, background:'#e8f0ff',
//       display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
//       <CalendarIcon style={{ width:18, height:18, color:'#1a4fbf' }} />
//     </div>
//     <div style={{ flex:1 }}>
//       <p style={{ margin:0, fontSize:'0.8rem', fontWeight:600, color:'#1e2d5e' }}>{subject}</p>
//       <p style={{ margin:0, fontSize:'0.7rem', color:'#9ca3af' }}>{type}</p>
//     </div>
//     <div style={{ textAlign:'right' }}>
//       <p style={{ margin:0, fontSize:'0.72rem', fontWeight:600, color:'#1a4fbf' }}>{date}</p>
//     </div>
//     <ChevronRightIcon style={{ width:15, height:15, color:'#d1d5db' }} />
//   </div>
// );

// // ── Bulletin row ─────────────────────────────────────────────────────────────
// const BulletinRow = ({ tracking, client, status, time }) => (
//   <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0',
//     borderBottom:'1px solid #f3f4f6' }}>
//     <div style={{ width:8, height:8, borderRadius:'50%',
//       background: status === 'livré' ? '#1a9e5c' : status === 'en transit' ? '#d4af37' : '#3b82f6',
//       flexShrink:0 }} />
//     <div style={{ flex:1, minWidth:0 }}>
//       <p style={{ margin:0, fontSize:'0.78rem', fontWeight:500, color:'#374151',
//         whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tracking}</p>
//       <p style={{ margin:0, fontSize:'0.68rem', color:'#9ca3af' }}>{client}</p>
//     </div>
//     <span style={{ fontSize:'0.68rem', color:'#9ca3af', flexShrink:0 }}>{time}</span>
//     <Badge status={status} />
//   </div>
// );

// // ── Dashboard ─────────────────────────────────────────────────────────────────
// const Dashboard = () => {
//   const [stats, setStats] = useState({ revenue:0, revenueTrend:0, packages:0, packagesTrend:0, clients:0, deliveries:0 });
//   const [recentPackages, setRecentPackages] = useState([]);
//   const [recentPayments, setRecentPayments] = useState([]);
//   const [chartData, setChartData] = useState({ revenueByMonth:[], packagesByStatus:[] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     setLoading(true); setError(null);
//     try {
//       const [statsRes, pkgRes, payRes, chartRes] = await Promise.all([
//         axios.get('/dashboard/stats'),
//         axios.get('/packages?limit=5&sort=-createdAt'),
//         axios.get('/payments?limit=5&sort=-createdAt'),
//         axios.get('/dashboard/charts'),
//       ]);
//       const s = statsRes.data?.data ?? statsRes.data ?? {};
//       setStats({
//         revenue: Number(s.revenue ?? 0), revenueTrend: Number(s.revenueTrend ?? 0),
//         packages: Number(s.packages ?? 0), packagesTrend: Number(s.packagesTrend ?? 0),
//         clients: Number(s.clients ?? 0), deliveries: Number(s.deliveries ?? 0),
//       });
//       setRecentPackages(toArray(pkgRes, 'packages', 'items'));
//       setRecentPayments(toArray(payRes, 'payments', 'items'));
//       const cd = chartRes.data?.data ?? chartRes.data ?? {};
//       setChartData({
//         revenueByMonth: Array.isArray(cd.revenueByMonth) ? cd.revenueByMonth : [],
//         packagesByStatus: Array.isArray(cd.packagesByStatus) ? cd.packagesByStatus : [],
//       });
//     } catch (err) {
//       setError('Impossible de charger les données.');
//     } finally { setLoading(false); }
//   };

//   const now = new Date();
//   const userName = 'Admin';

//   // Charts
//   const lineData = {
//     labels: chartData.revenueByMonth.map(i => i.month),
//     datasets: [
//       {
//         label: 'Revenus',
//         data: chartData.revenueByMonth.map(i => i.value),
//         borderColor: '#1a3a8f', backgroundColor: 'rgba(26,58,143,0.08)',
//         tension: 0.45, fill: true, borderWidth: 2.5,
//         pointBackgroundColor: '#1a3a8f', pointRadius: 3, pointHoverRadius: 5,
//       },
//       {
//         label: 'Colis',
//         data: chartData.revenueByMonth.map(i => Math.round((i.value || 0) * 0.6 + Math.random() * 2000)),
//         borderColor: '#d4af37', backgroundColor: 'rgba(212,175,55,0.06)',
//         tension: 0.45, fill: true, borderWidth: 2.5,
//         pointBackgroundColor: '#d4af37', pointRadius: 3, pointHoverRadius: 5,
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true, maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: 'top',
//         labels: { color:'#6b7280', font:{ size:11, family:"'Poppins',sans-serif" },
//           boxWidth:10, padding:16, usePointStyle:true, pointStyleWidth:10 } },
//       tooltip: { backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1,
//         titleColor:'#1e2d5e', bodyColor:'#6b7280', padding:12, cornerRadius:8,
//         boxShadow:'0 4px 24px rgba(0,0,0,0.12)' },
//     },
//     scales: {
//       y: { beginAtZero:true, grid:{ color:'rgba(0,0,0,0.04)' },
//         ticks:{ color:'#9ca3af', font:{ size:11 } } },
//       x: { grid:{ display:false }, ticks:{ color:'#9ca3af', font:{ size:11 } } },
//     },
//   };

//   const donutData = {
//     labels: chartData.packagesByStatus.length > 0
//       ? chartData.packagesByStatus.map(i => i.status)
//       : ['Reçus', 'Restants'],
//     datasets: [{
//       data: chartData.packagesByStatus.length > 0
//         ? chartData.packagesByStatus.map(i => i.count)
//         : [82, 18],
//       backgroundColor: ['#1a3a8f', '#d4af37', '#1a9e5c', '#e05252', '#8b5cf6'],
//       borderWidth: 3, borderColor: '#fff', hoverOffset: 4,
//     }],
//   };

//   const donutOptions = {
//     responsive: true, maintainAspectRatio: false, cutout: '68%',
//     plugins: {
//       legend: { position: 'bottom', labels: { color:'#6b7280', padding:14,
//         font:{ size:11, family:"'Poppins',sans-serif" }, boxWidth:10,
//         usePointStyle:true, pointStyleWidth:10 } },
//       tooltip: { backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1,
//         titleColor:'#1e2d5e', bodyColor:'#6b7280', padding:10, cornerRadius:8 },
//     },
//   };

//   if (loading) return (
//     <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', background:'#f4f6fb' }}>
//       <div style={{ textAlign:'center' }}>
//         <div style={{ width:40, height:40, border:'3px solid #e5e7eb', borderTop:'3px solid #1a3a8f',
//           borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 14px' }} />
//         <p style={{ color:'#9ca3af', fontSize:'0.82rem', fontFamily:"'Poppins',sans-serif" }}>Chargement…</p>
//       </div>
//       <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
//     </div>
//   );

//   if (error) return (
//     <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
//       height:'60vh', gap:14, background:'#f4f6fb' }}>
//       <p style={{ color:'#e05252', fontSize:'0.85rem' }}>{error}</p>
//       <button onClick={fetchData} style={{ padding:'8px 22px', background:'#1a3a8f', border:'none',
//         borderRadius:'8px', color:'#fff', fontSize:'0.82rem', cursor:'pointer',
//         fontFamily:"'Poppins',sans-serif" }}>Réessayer</button>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//         .dash { font-family:'Poppins',sans-serif; background:#f4f6fb; min-height:100vh; }

//         /* Topbar */
//         .dash-topbar {
//           background:#fff; border-bottom:1px solid #eef0f5;
//           display:flex; align-items:center; gap:16px;
//           padding:0 28px; height:56px; position:sticky; top:0; z-index:10;
//           box-shadow:0 1px 8px rgba(0,0,0,0.05);
//         }
//         .dash-search {
//           display:flex; align-items:center; gap:8px;
//           background:#f4f6fb; border:1px solid #e8eaf0; border-radius:8px;
//           padding:6px 14px; flex:1; max-width:340px;
//         }
//         .dash-search input { border:none; background:none; outline:none;
//           font-size:0.8rem; color:#374151; width:100%; font-family:'Poppins',sans-serif; }
//         .dash-search input::placeholder { color:#b0b7c3; }
//         .topbar-notif {
//           width:36px; height:36px; border-radius:50%; background:#f4f6fb;
//           border:1px solid #e8eaf0; display:flex; align-items:center; justify-content:center;
//           cursor:pointer; position:relative; flex-shrink:0;
//         }
//         .notif-dot { position:absolute; top:6px; right:6px; width:8px; height:8px;
//           border-radius:50%; background:#e05252; border:2px solid #fff; }
//         .topbar-user { display:flex; align-items:center; gap:10px;
//           padding:6px 12px; border-radius:10px; background:#f4f6fb;
//           border:1px solid #e8eaf0; cursor:pointer; }
//         .topbar-av { width:30px; height:30px; border-radius:50%;
//           background:linear-gradient(135deg,#1a3a8f,#3b6fd4);
//           display:flex; align-items:center; justify-content:center;
//           font-size:0.68rem; font-weight:700; color:#fff; }
//         .topbar-uname { font-size:0.78rem; font-weight:600; color:#1e2d5e; }
//         .topbar-urole { font-size:0.63rem; color:#9ca3af; }

//         /* Section header */
//         .sec-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
//         .sec-title { font-size:0.9rem; font-weight:600; color:#1e2d5e; margin:0; }
//         .sec-link { font-size:0.72rem; color:#1a3a8f; font-weight:500; text-decoration:none;
//           display:flex; align-items:center; gap:3px; }
//         .sec-link:hover { color:#0d2270; }

//         /* Card base */
//         .card { background:#fff; border-radius:14px; box-shadow:0 2px 12px rgba(0,0,0,0.06);
//           border:1px solid #f0f0f0; }

//         /* Financial highlight */
//         .fin-row { display:flex; align-items:center; justify-content:space-between;
//           padding:8px 0; border-bottom:1px solid #f3f4f6; }
//         .fin-row:last-child { border:none; }
//         .fin-label { font-size:0.74rem; color:#6b7280; display:flex; align-items:center; gap:7px; }
//         .fin-dot { width:8px; height:8px; border-radius:50%; }
//         .fin-val { font-size:0.82rem; font-weight:700; color:#1e2d5e; }
//       `}</style>

//       <div className="dash">

//         {/* Top bar */}
//         <div className="dash-topbar">
//           <div className="dash-search">
//             <MagnifyingGlassIcon style={{ width:16, height:16, color:'#b0b7c3', flexShrink:0 }} />
//             <input placeholder="Rechercher…" />
//           </div>
//           <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10 }}>
//             <div className="topbar-notif">
//               <BellIcon style={{ width:18, height:18, color:'#6b7280' }} />
//               <div className="notif-dot" />
//             </div>
//             <div className="topbar-user">
//               <div className="topbar-av">AD</div>
//               <div>
//                 <div className="topbar-uname">{userName}</div>
//                 <div className="topbar-urole">Administrateur</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={{ padding:'24px 28px' }}>

//           {/* Greeting */}
//           <div style={{ marginBottom:22 }}>
//             <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:'1.35rem',
//               color:'#1e2d5e', margin:0 }}>
//               Bonjour, {userName} !
//             </h1>
//             <p style={{ fontSize:'0.78rem', color:'#9ca3af', margin:'3px 0 0',
//               textTransform:'capitalize' }}>
//               {now.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
//               {' · '}Tableau de Bord
//             </p>
//           </div>

//           {/* Stat cards */}
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
//             <StatCard title="Clients inscrits" value={fmt(stats.clients)}
//               icon={UserGroupIcon} sub="Total actifs"
//               accent="#1a3a8f" iconBg="#e8f0ff" />
//             <StatCard title="Revenus du Mois" value={`${fmt(stats.revenue)} €`}
//               icon={CurrencyDollarIcon} sub="Paiements reçus"
//               accent="#b87a00" iconBg="#fff8e6" />
//             <StatCard title="Colis en cours" value={fmt(stats.packages)}
//               icon={CubeIcon} sub={`+${stats.packagesTrend} cette semaine`}
//               accent="#0d7a4a" iconBg="#e8f9f0" />
//           </div>

//           {/* Charts row */}
//           <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1fr', gap:14, marginBottom:18 }}>

//             {/* Line chart */}
//             <div className="card" style={{ padding:'20px 22px' }}>
//               <div className="sec-hd">
//                 <div>
//                   <h3 className="sec-title">Progression Académique</h3>
//                   <p style={{ margin:'2px 0 0', fontSize:'0.7rem', color:'#9ca3af' }}>
//                     Moyenne : {stats.packages > 0 ? (stats.revenue / stats.packages).toFixed(1) : '0'} / mois
//                   </p>
//                 </div>
//                 <select style={{ fontSize:'0.72rem', color:'#6b7280', border:'1px solid #e8eaf0',
//                   borderRadius:6, padding:'4px 8px', background:'#f9fafb',
//                   fontFamily:"'Poppins',sans-serif", cursor:'pointer', outline:'none' }}>
//                   <option>6 mois</option><option>12 mois</option><option>Cette année</option>
//                 </select>
//               </div>
//               <div style={{ height:220 }}>
//                 {chartData.revenueByMonth.length > 0
//                   ? <Line options={lineOptions} data={lineData} />
//                   : <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
//                       height:'100%', color:'#d1d5db', fontSize:'0.8rem' }}>
//                       Aucune donnée
//                     </div>
//                 }
//               </div>
//             </div>

//             {/* Donut */}
//             <div className="card" style={{ padding:'20px 22px', display:'flex', flexDirection:'column' }}>
//               <h3 className="sec-title" style={{ marginBottom:4 }}>Statistiques Financières</h3>
//               <p style={{ margin:'0 0 12px', fontSize:'0.7rem', color:'#9ca3af' }}>Répartition des paiements</p>

//               <div style={{ height:160, display:'flex', alignItems:'center', justifyContent:'center' }}>
//                 <Doughnut data={donutData} options={donutOptions} />
//               </div>

//               <div style={{ marginTop:14 }}>
//                 {[
//                   { label:'Recettes', val:`${fmt(stats.revenue)} €`, color:'#1a3a8f' },
//                   { label:'Impayés', val:`${fmt(Math.round(stats.revenue * 0.18))} €`, color:'#d4af37' },
//                 ].map(r => (
//                   <div key={r.label} className="fin-row">
//                     <span className="fin-label">
//                       <span className="fin-dot" style={{ background:r.color }} />{r.label}
//                     </span>
//                     <span className="fin-val" style={{ color:r.color }}>{r.val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Bottom row */}
//           <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>

//             {/* Recent packages */}
//             <div className="card" style={{ padding:'18px 20px' }}>
//               <div className="sec-hd">
//                 <h3 className="sec-title">Derniers Colis</h3>
//                 <a href="/app/packages" className="sec-link">
//                   Voir tout <ChevronRightIcon style={{ width:13, height:13 }} />
//                 </a>
//               </div>
//               {recentPackages.length > 0 ? recentPackages.map((p, i) => (
//                 <BulletinRow key={i}
//                   tracking={p.trackingNumber || `#PKG-${i+1}`}
//                   client={p.client ? `${p.client.firstName} ${p.client.lastName}` : '—'}
//                   status={p.status || 'en attente'}
//                   time={p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : '—'}
//                 />
//               )) : (
//                 <>
//                   <BulletinRow tracking="CS1714000001" client="Ali Ben Salem"    status="livré"      time="Aujourd'hui" />
//                   <BulletinRow tracking="CS1714000002" client="Sonia Trabelsi"   status="en transit" time="Aujourd'hui" />
//                   <BulletinRow tracking="CS1714000003" client="Mohamed Amine"    status="en attente" time="Hier" />
//                 </>
//               )}
//             </div>

//             {/* Upcoming deliveries */}
//             <div className="card" style={{ padding:'18px 20px' }}>
//               <div className="sec-hd">
//                 <h3 className="sec-title">Livraisons à venir</h3>
//                 <a href="/app/packages" className="sec-link">
//                   Voir tout <ChevronRightIcon style={{ width:13, height:13 }} />
//                 </a>
//               </div>
//               {recentPayments.length > 0 ? recentPayments.slice(0,4).map((p, i) => (
//                 <UpcomingRow key={i}
//                   subject={`Colis #${p.reference || i+1}`}
//                   date={p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : '—'}
//                   type={p.status || 'En attente'}
//                 />
//               )) : (
//                 <>
//                   <UpcomingRow subject="Livraison Tunis Centre"  date="25 Avr 2026" type="Express" />
//                   <UpcomingRow subject="Livraison Sfax"          date="28 Avr 2026" type="Standard" />
//                   <UpcomingRow subject="Livraison Sousse"        date="30 Avr 2026" type="Premium" />
//                   <UpcomingRow subject="Livraison Gabès"         date="2 Mai 2026"  type="Standard" />
//                 </>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;




















import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon, CubeIcon, UserGroupIcon, TruckIcon,
  CalendarIcon, ArrowPathIcon, ArrowDownTrayIcon, ChevronRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from '../../api/axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const toArray = (res, ...keys) => {
  const d = res?.data;
  for (const k of keys) {
    if (Array.isArray(d?.data?.[k])) return d.data[k];
    if (Array.isArray(d?.[k])) return d[k];
  }
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d)) return d;
  return [];
};
const fmt = (n) => Number(n || 0).toLocaleString('fr-FR');

// ── Status Badge ──────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    'livré':       { bg:'#e6faf4', color:'#059669', border:'#a7f3d0' },
    'en transit':  { bg:'#fefce8', color:'#b45309', border:'#fde68a' },
    'en attente':  { bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe' },
    'payé':        { bg:'#e6faf4', color:'#059669', border:'#a7f3d0' },
    'annulé':      { bg:'#fef2f2', color:'#dc2626', border:'#fecaca' },
  };
  const s = map[status] || { bg:'#f3f4f6', color:'#6b7280', border:'#e5e7eb' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5,
      padding:'3px 10px', borderRadius:20, fontSize:'0.67rem', fontWeight:600,
      background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:s.color }} />
      {status}
    </span>
  );
};

// ── Stat Card (vertical, with colored top bar) ────────────────────────────────
const StatCard = ({ label, value, icon: Icon, accent, iconBg }) => (
  <div style={{
    background:'#fff', borderRadius:12,
    boxShadow:'0 2px 10px rgba(0,0,0,0.06)',
    border:'1px solid #f0f0f0',
    borderTop:`3px solid ${accent}`,
    padding:'18px 16px',
    display:'flex', flexDirection:'column', gap:10,
  }}>
    <div style={{ width:44, height:44, borderRadius:10,
      background:iconBg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Icon style={{ width:22, height:22, color:accent }} />
    </div>
    <div>
      <p style={{ margin:0, fontSize:'1.5rem', fontWeight:700, color:'#1e2d5e',
        fontFamily:"'Poppins',sans-serif", lineHeight:1 }}>
        {value ?? '—'}
      </p>
      <p style={{ margin:'4px 0 0', fontSize:'0.72rem', color:'#9ca3af', fontWeight:500 }}>
        {label}
      </p>
    </div>
  </div>
);

// ── Package row ───────────────────────────────────────────────────────────────
const PkgRow = ({ tracking, client, status, date }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12,
    padding:'10px 0', borderBottom:'1px solid #f3f4f6' }}>
    <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0,
      background: status==='livré' ? '#059669' : status==='en transit' ? '#d97706' : '#3b82f6' }} />
    <div style={{ flex:1, minWidth:0 }}>
      <p style={{ margin:0, fontSize:'0.78rem', fontWeight:500, color:'#374151',
        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tracking}</p>
      <p style={{ margin:0, fontSize:'0.68rem', color:'#9ca3af' }}>{client}</p>
    </div>
    <span style={{ fontSize:'0.67rem', color:'#9ca3af', flexShrink:0 }}>{date}</span>
    <Badge status={status} />
  </div>
);

// ── Delivery row ──────────────────────────────────────────────────────────────
const DelRow = ({ subject, date, type }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12,
    padding:'10px 0', borderBottom:'1px solid #f3f4f6' }}>
    <div style={{ width:36, height:36, borderRadius:8, background:'#eff6ff',
      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <CalendarIcon style={{ width:18, height:18, color:'#1d4ed8' }} />
    </div>
    <div style={{ flex:1 }}>
      <p style={{ margin:0, fontSize:'0.78rem', fontWeight:600, color:'#1e2d5e' }}>{subject}</p>
      <p style={{ margin:0, fontSize:'0.68rem', color:'#9ca3af' }}>{type}</p>
    </div>
    <span style={{ fontSize:'0.7rem', fontWeight:600, color:'#1d4ed8', flexShrink:0 }}>{date}</span>
    <ChevronRightIcon style={{ width:14, height:14, color:'#d1d5db', flexShrink:0 }} />
  </div>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [stats, setStats] = useState({
    revenue:0, revenueTrend:0, packages:0, packagesTrend:0, clients:0, deliveries:0,
  });
  const [recentPackages, setRecentPackages] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [chartData, setChartData] = useState({ revenueByMonth:[], packagesByStatus:[] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const [statsRes, pkgRes, payRes, chartRes] = await Promise.all([
        axios.get('/dashboard/stats'),
        axios.get('/packages?limit=5&sort=-createdAt'),
        axios.get('/payments?limit=5&sort=-createdAt'),
        axios.get('/dashboard/charts'),
      ]);
      const s = statsRes.data?.data ?? statsRes.data ?? {};
      setStats({
        revenue:       Number(s.revenue       ?? 0),
        revenueTrend:  Number(s.revenueTrend  ?? 0),
        packages:      Number(s.packages      ?? 0),
        packagesTrend: Number(s.packagesTrend ?? 0),
        clients:       Number(s.clients       ?? 0),
        deliveries:    Number(s.deliveries    ?? 0),
      });
      setRecentPackages(toArray(pkgRes, 'packages', 'items'));
      setRecentPayments(toArray(payRes, 'payments', 'items'));
      const cd = chartRes.data?.data ?? chartRes.data ?? {};
      setChartData({
        revenueByMonth:   Array.isArray(cd.revenueByMonth)   ? cd.revenueByMonth   : [],
        packagesByStatus: Array.isArray(cd.packagesByStatus) ? cd.packagesByStatus : [],
      });
    } catch {
      setError('Aucun endpoint du dashboard ne répond. Vérifiez votre API.');
    } finally { setLoading(false); }
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', {
    weekday:'long', day:'numeric', month:'long', year:'numeric',
  });

  // ── Chart configs ──
  const lineData = {
    labels: chartData.revenueByMonth.length > 0
      ? chartData.revenueByMonth.map(i => i.month)
      : ['Jan','Fév','Mar','Avr','Mai','Juin'],
    datasets: [
      {
        label: 'Revenus',
        data: chartData.revenueByMonth.length > 0
          ? chartData.revenueByMonth.map(i => i.value)
          : [12000,18000,14000,22000,19000,28000],
        borderColor: '#1e3a7a',
        backgroundColor: 'rgba(30,58,122,0.07)',
        tension: 0.45, fill: true, borderWidth: 2.5,
        pointBackgroundColor: '#1e3a7a', pointRadius: 3, pointHoverRadius: 5,
      },
      {
        label: 'Colis',
        data: chartData.revenueByMonth.length > 0
          ? chartData.revenueByMonth.map(i => Math.round(i.value * 0.55))
          : [7000,11000,9000,15000,12000,19000],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212,175,55,0.05)',
        tension: 0.45, fill: true, borderWidth: 2.5,
        pointBackgroundColor: '#d4af37', pointRadius: 3, pointHoverRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top',
        labels: { color:'#6b7280', font:{ size:11, family:"'Poppins',sans-serif" },
          boxWidth:10, padding:16, usePointStyle:true } },
      tooltip: { backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1,
        titleColor:'#1e2d5e', bodyColor:'#6b7280', padding:12, cornerRadius:8 },
    },
    scales: {
      y: { beginAtZero:true, grid:{ color:'rgba(0,0,0,0.04)' },
        ticks:{ color:'#9ca3af', font:{ size:11 } } },
      x: { grid:{ display:false }, ticks:{ color:'#9ca3af', font:{ size:11 } } },
    },
  };

  const donutLabels = chartData.packagesByStatus.length > 0
    ? chartData.packagesByStatus.map(i => i.status)
    : ['Payés', 'Partiels', 'Impayés'];
  const donutValues = chartData.packagesByStatus.length > 0
    ? chartData.packagesByStatus.map(i => i.count)
    : [82, 12, 6];

  const donutData = {
    labels: donutLabels,
    datasets: [{
      data: donutValues,
      backgroundColor: ['#059669', '#d4af37', '#ef4444', '#3b82f6', '#8b5cf6'],
      borderWidth: 3, borderColor: '#fff', hoverOffset: 4,
    }],
  };

  const donutOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color:'#374151', padding:14, font:{ size:11, family:"'Poppins',sans-serif" },
          boxWidth:10, usePointStyle:true },
      },
      tooltip: { backgroundColor:'#fff', borderColor:'#e5e7eb', borderWidth:1,
        titleColor:'#1e2d5e', bodyColor:'#6b7280', padding:10, cornerRadius:8 },
    },
  };

  // ── Loading ──
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      height:'100%', background:'#f4f6fb' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid #e5e7eb',
          borderTop:'3px solid #00d4aa', borderRadius:'50%',
          animation:'spin 0.8s linear infinite', margin:'0 auto 14px' }} />
        <p style={{ color:'#9ca3af', fontSize:'0.82rem', fontFamily:"'Poppins',sans-serif" }}>
          Chargement…
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        .dash { font-family:'Poppins',sans-serif; padding:24px 28px;
          background:#f4f6fb; min-height:100%; box-sizing:border-box; }
        .card { background:#fff; border-radius:12px;
          box-shadow:0 2px 10px rgba(0,0,0,0.06); border:1px solid #f0f0f0; }
        .sec-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .sec-title { font-size:0.88rem; font-weight:700; color:#1e2d5e; margin:0; }
        .see-all { font-size:0.7rem; color:#1d4ed8; font-weight:500;
          text-decoration:none; display:flex; align-items:center; gap:3px; }
        .see-all:hover { color:#1e3a8a; }
        .fin-row { display:flex; align-items:center; justify-content:space-between;
          padding:8px 0; border-bottom:1px solid #f3f4f6; }
        .fin-row:last-child { border:none; }
        .fin-pct { font-size:0.78rem; font-weight:700; }
      `}</style>

      <div className="dash">

        {/* ── Hero banner ── */}
        <div style={{
          background: 'linear-gradient(120deg, #0d1f2d 0%, #1e3a7a 55%, #1a5276 100%)',
          borderRadius: 16, padding: '28px 32px', marginBottom: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 24px rgba(13,31,45,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* decorative blobs */}
          <div style={{ position:'absolute', top:-40, right:200, width:200, height:200,
            borderRadius:'50%', background:'rgba(0,212,170,0.07)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-60, right:80, width:260, height:260,
            borderRadius:'50%', background:'rgba(255,255,255,0.03)', pointerEvents:'none' }} />

          <div>
            <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:'1.6rem',
              color:'#fff', margin:'0 0 6px', letterSpacing:'-0.02em' }}>
              Tableau de <span style={{ color:'#00d4aa' }}>Bord</span>
            </h1>
            <p style={{ margin:0, fontSize:'0.8rem', color:'rgba(255,255,255,0.5)' }}>
              Vue d'ensemble complète · Administration CargoSphere
            </p>
          </div>

          {/* Hero buttons */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 14px',
              background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
              borderRadius:8, fontSize:'0.73rem', color:'rgba(255,255,255,0.7)' }}>
              <CalendarIcon style={{ width:15, height:15, color:'rgba(255,255,255,0.5)' }} />
              {dateStr}
            </div>
            <button onClick={() => window.location.reload()} style={{
              display:'flex', alignItems:'center', gap:7, padding:'8px 16px',
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)',
              borderRadius:8, fontSize:'0.73rem', color:'#fff', cursor:'pointer',
              fontFamily:"'Poppins',sans-serif", fontWeight:500,
            }}>
              <ArrowPathIcon style={{ width:14, height:14 }} />
              Actualiser
            </button>
            <button style={{
              display:'flex', alignItems:'center', gap:7, padding:'8px 16px',
              background:'#00d4aa', border:'none', borderRadius:8,
              fontSize:'0.73rem', color:'#0d1f2d', cursor:'pointer',
              fontFamily:"'Poppins',sans-serif", fontWeight:600,
              boxShadow:'0 4px 14px rgba(0,212,170,0.4)',
            }}>
              <ArrowDownTrayIcon style={{ width:14, height:14 }} />
              Rapport complet
            </button>
          </div>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            background:'#fff8f8', border:'1px solid #fecaca', borderRadius:10,
            padding:'12px 18px', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <ExclamationTriangleIcon style={{ width:18, height:18, color:'#dc2626', flexShrink:0 }} />
              <div>
                <p style={{ margin:0, fontSize:'0.8rem', fontWeight:700, color:'#dc2626' }}>
                  Données indisponibles
                </p>
                <p style={{ margin:0, fontSize:'0.73rem', color:'#9ca3af' }}>{error}</p>
              </div>
            </div>
            <button onClick={fetchData} style={{ padding:'7px 18px',
              background:'#dc2626', border:'none', borderRadius:8,
              color:'#fff', fontSize:'0.75rem', fontWeight:600, cursor:'pointer',
              fontFamily:"'Poppins',sans-serif", flexShrink:0 }}>
              Réessayer
            </button>
          </div>
        )}

        {/* ── Stat cards (6 columns) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12, marginBottom:20 }}>
          <StatCard label="Clients"      value={fmt(stats.clients)}    icon={UserGroupIcon}      accent="#6366f1" iconBg="#eef2ff" />
          <StatCard label="Employés"     value={fmt(stats.deliveries)} icon={UserGroupIcon}      accent="#8b5cf6" iconBg="#f5f3ff" />
          <StatCard label="Colis"        value={fmt(stats.packages)}   icon={CubeIcon}           accent="#0891b2" iconBg="#ecfeff" />
          <StatCard label="Revenus"      value={fmt(stats.revenue)}    icon={CurrencyDollarIcon} accent="#059669" iconBg="#ecfdf5" />
          <StatCard label="Livraisons"   value={fmt(stats.deliveries)} icon={TruckIcon}          accent="#d97706" iconBg="#fffbeb" />
          <StatCard label="Paiements"    value={`${fmt(stats.revenue)} €`} icon={CurrencyDollarIcon} accent="#e11d48" iconBg="#fff1f2" />
        </div>

        {/* ── Charts row ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:14, marginBottom:16 }}>

          {/* Line chart */}
          <div className="card" style={{ padding:'20px 22px' }}>
            <div className="sec-hd">
              <div>
                <h3 className="sec-title">Évolution des Revenus</h3>
                <p style={{ margin:'2px 0 0', fontSize:'0.68rem', color:'#9ca3af' }}>
                  Revenus & colis · 6 derniers mois
                </p>
              </div>
              <select style={{ fontSize:'0.7rem', color:'#6b7280', border:'1px solid #e8eaf0',
                borderRadius:6, padding:'4px 8px', background:'#f9fafb', outline:'none',
                fontFamily:"'Poppins',sans-serif", cursor:'pointer' }}>
                <option>6 mois</option><option>12 mois</option><option>Cette année</option>
              </select>
            </div>
            <div style={{ height:230 }}>
              <Line options={lineOptions} data={lineData} />
            </div>
          </div>

          {/* Donut */}
          <div className="card" style={{ padding:'20px 22px', display:'flex', flexDirection:'column' }}>
            <h3 className="sec-title" style={{ marginBottom:4 }}>Frais scolaires</h3>
            <p style={{ margin:'0 0 14px', fontSize:'0.68rem', color:'#9ca3af' }}>
              Répartition des paiements
            </p>

            {/* Center label */}
            <div style={{ position:'relative', height:180, display:'flex',
              alignItems:'center', justifyContent:'center' }}>
              <Doughnut data={donutData} options={donutOptions} />
              <div style={{ position:'absolute', textAlign:'center', pointerEvents:'none' }}>
                <p style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'#1e2d5e',
                  fontFamily:"'Poppins',sans-serif" }}>
                  {donutValues.reduce((a,b) => a+b, 0)}
                </p>
                <p style={{ margin:0, fontSize:'0.6rem', color:'#9ca3af' }}>Total</p>
              </div>
            </div>

            {/* Legend rows */}
            <div style={{ marginTop:12 }}>
              {donutLabels.map((lbl, i) => {
                const colors = ['#059669','#d4af37','#ef4444','#3b82f6','#8b5cf6'];
                const total = donutValues.reduce((a,b) => a+b, 0);
                const pct = total > 0 ? Math.round(donutValues[i]/total*100) : 0;
                return (
                  <div key={lbl} className="fin-row">
                    <span style={{ display:'flex', alignItems:'center', gap:7,
                      fontSize:'0.73rem', color:'#6b7280' }}>
                      <span style={{ width:8, height:8, borderRadius:'50%',
                        background:colors[i], display:'inline-block' }} />
                      {lbl}
                    </span>
                    <span className="fin-pct" style={{ color:colors[i] }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom tables ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>

          {/* Recent packages */}
          <div className="card" style={{ padding:'18px 20px' }}>
            <div className="sec-hd">
              <h3 className="sec-title">Derniers Bulletins</h3>
              <Link to="/app/packages" className="see-all">
                Voir tout <ChevronRightIcon style={{ width:13, height:13 }} />
              </Link>
            </div>
            {recentPackages.length > 0
              ? recentPackages.map((p, i) => (
                  <PkgRow key={i}
                    tracking={p.trackingNumber || `#PKG-${i+1}`}
                    client={p.client ? `${p.client.firstName} ${p.client.lastName}` : '—'}
                    status={p.status || 'en attente'}
                    date={p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : '—'}
                  />
                ))
              : (
                <>
                  <PkgRow tracking="CS1714000001" client="Ali Ben Salem"  status="livré"      date="Aujourd'hui" />
                  <PkgRow tracking="CS1714000002" client="Sonia Trabelsi" status="en transit" date="Aujourd'hui" />
                  <PkgRow tracking="CS1714000003" client="Mohamed Amine"  status="en attente" date="Hier" />
                </>
              )}
          </div>

          {/* Upcoming */}
          <div className="card" style={{ padding:'18px 20px' }}>
            <div className="sec-hd">
              <h3 className="sec-title">Livraisons à venir</h3>
              <Link to="/app/packages" className="see-all">
                Voir tout <ChevronRightIcon style={{ width:13, height:13 }} />
              </Link>
            </div>
            {recentPayments.length > 0
              ? recentPayments.slice(0,4).map((p, i) => (
                  <DelRow key={i}
                    subject={`Colis #${p.reference || i+1}`}
                    date={p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : '—'}
                    type={p.status || 'En attente'}
                  />
                ))
              : (
                <>
                  <DelRow subject="Livraison Tunis Centre" date="25 Avr 2026" type="Express" />
                  <DelRow subject="Livraison Sfax"         date="28 Avr 2026" type="Standard" />
                  <DelRow subject="Livraison Sousse"       date="30 Avr 2026" type="Premium" />
                  <DelRow subject="Livraison Gabès"        date="2 Mai 2026"  type="Standard" />
                </>
              )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;