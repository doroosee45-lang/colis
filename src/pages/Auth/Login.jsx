import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../components/Context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Connexion réussie !');
      // La redirection est gérée par AuthContext selon le rôle
    } catch (error) {
      toast.error(error.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">

      {/* FOND AVION */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-zoom"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/3/30/Airbus_A320-200_Airbus_Industries_%28AIB%29_%22House_colors%22_F-WWBA_-_MSN_001_%2810276181983%29.jpg')",
          filter: "brightness(0.85) contrast(1.1)"
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/65 via-slate-900/55 to-sky-900/45 backdrop-blur-[1px]" />

      {/* CONTENU */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-white/12 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

            {/* LOGO */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl
                            bg-gradient-to-br from-sky-500 to-blue-600
                            text-white text-4xl font-bold shadow-lg
                            transform hover:scale-110 transition-transform duration-300">
                ✈
              </div>
              <h2 className="mt-5 text-3xl font-bold text-white tracking-tight">
                CargoSphere
              </h2>
              <p className="mt-1.5 text-sm text-blue-100/80">
                Connectez-vous à votre espace
              </p>
            </div>

            {/* FORMULAIRE */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-medium text-blue-100 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  {...register('email', {
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalide'
                    }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl
                           bg-white/10 border border-white/25
                           text-white placeholder-blue-200/50 text-sm
                           focus:ring-2 focus:ring-sky-400 focus:border-transparent
                           outline-none transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* MOT DE PASSE */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-blue-100">
                    Mot de passe
                  </label>
                  <Link to="/forgot-password" className="text-xs text-sky-300 hover:text-sky-200 transition-colors">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Le mot de passe est requis' })}
                  className="w-full px-4 py-2.5 rounded-xl
                           bg-white/10 border border-white/25
                           text-white placeholder-blue-200/50 text-sm
                           focus:ring-2 focus:ring-sky-400 focus:border-transparent
                           outline-none transition-all duration-200"
                />
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1.5">{errors.password.message}</p>
                )}
              </div>

              {/* SE SOUVENIR */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/25 bg-white/10 text-sky-500 focus:ring-sky-400"
                />
                <span className="text-xs text-blue-100">Se souvenir de moi</span>
              </label>

              {/* BOUTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm
                         bg-gradient-to-r from-sky-500 to-blue-600
                         hover:from-sky-600 hover:to-blue-700
                         flex justify-center items-center gap-2
                         focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 shadow-lg shadow-sky-500/25 mt-2"
              >
                {loading && (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              {/* LIEN INSCRIPTION */}
              <p className="text-center text-xs text-blue-200/80 pt-1">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-sky-300 hover:text-sky-200 font-semibold transition-colors">
                  Créer un compte
                </Link>
              </p>

            </form>
          </div>

          <p className="text-center text-blue-200/50 text-xs mt-5">
            © 2026 CargoSphere ERP. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;