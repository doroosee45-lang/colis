import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  PhotoIcon,
  XMarkIcon,
  SparklesIcon,
  TagIcon,
  CurrencyEuroIcon,
  MapPinIcon,
  FolderIcon,
  CheckCircleIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';

const AddProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories] = useState([
    'Électronique',
    'Mode',
    'Maison',
    'Sports',
    'Livres',
    'Véhicules',
    'Autre',
  ]);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      sellerName: '',
      sellerEmail: '',
      sellerPhone: '',
      title: '',
      description: '',
      category: '',
      price: '',
      originalPrice: '',
      location: '',
      condition: 'neuf',
      stock: 1,
      featured: false,
    },
  });

  const steps = [
    { id: 0, name: 'Vendeur', fields: ['sellerName', 'sellerEmail', 'sellerPhone'] },
    { id: 1, name: 'Produit', fields: ['title', 'description', 'category', 'price'] },
    { id: 2, name: 'Localisation & état', fields: ['location', 'condition', 'stock'] },
    { id: 3, name: 'Récapitulatif', fields: [] },
  ];

  // Upload local (base64) – solution de contournement fiable
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error('Maximum 5 images autorisées');
      return;
    }

    const validFiles = [];
    const invalidFiles = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(`${file.name} (format non image)`);
      } else if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (>5Mo)`);
      } else {
        validFiles.push(file);
      }
    }

    if (invalidFiles.length) {
      toast.error(`Fichiers ignorés : ${invalidFiles.join(', ')}`);
    }
    if (validFiles.length === 0) return;

    setUploading(true);
    const readers = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result, publicId: `local-${Date.now()}-${Math.random()}` });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
      setUploading(false);
      toast.success(`${newImages.length} image(s) ajoutée(s) avec succès`);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValidStep = await trigger(fieldsToValidate);
    if (isValidStep) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async () => {
    if (images.length === 0) {
      toast.error('Veuillez ajouter au moins une image');
      return;
    }
    setLoading(true);
    const data = getValues();
    try {
      // Envoi des données avec les images en base64 (adaptez selon votre API)
      const productData = {
        ...data,
        images: images.map((img) => ({ url: img.url, publicId: img.publicId })),
        price: parseFloat(data.price),
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
        stock: parseInt(data.stock),
      };
      await axios.post('/marketplace/products', productData);
      toast.success('Produit publié avec succès');
      navigate('/marketplace/products');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Erreur lors de la publication');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-600" />
              Qui êtes-vous ?
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('sellerName', { required: 'Le nom est requis' })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Jean Dupont"
              />
              {errors.sellerName && <p className="mt-1 text-sm text-red-600">{errors.sellerName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <EnvelopeIcon className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('sellerEmail', {
                  required: 'L\'email est requis',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="jean@exemple.com"
              />
              {errors.sellerEmail && <p className="mt-1 text-sm text-red-600">{errors.sellerEmail.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <PhoneIcon className="w-4 h-4" />
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('sellerPhone', { required: 'Le téléphone est requis' })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="+33 6 12 34 56 78"
              />
              {errors.sellerPhone && <p className="mt-1 text-sm text-red-600">{errors.sellerPhone.message}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <TagIcon className="w-5 h-5 text-blue-600" />
              Détails du produit
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title', { required: 'Le titre est requis' })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Ex: iPhone 13 Pro Max 256GB"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description', { required: 'La description est requise' })}
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Décrivez votre produit en détail (état, caractéristiques, etc.)"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <FolderIcon className="w-4 h-4" />
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category', { required: 'La catégorie est requise' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="">Sélectionner...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <CurrencyEuroIcon className="w-4 h-4" />
                  Prix (€) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', {
                    required: 'Le prix est requis',
                    min: { value: 0, message: 'Prix positif requis' },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix d'origine (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('originalPrice')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-blue-600" />
              Localisation & état
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                Localisation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('location', { required: 'La localisation est requise' })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Ville, Pays"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                État <span className="text-red-500">*</span>
              </label>
              <select
                {...register('condition')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="neuf">Neuf</option>
                <option value="comme neuf">Comme neuf</option>
                <option value="bon état">Bon état</option>
                <option value="état correct">État correct</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                {...register('stock')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                min="1"
              />
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Mettre en avant ce produit (option payante – meilleure visibilité)
                </span>
              </label>
            </div>
          </div>
        );

      case 3:
        const data = getValues();
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              Récapitulatif
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Vendeur</h4>
                <p className="text-sm text-gray-600">Nom : {data.sellerName}</p>
                <p className="text-sm text-gray-600">Email : {data.sellerEmail}</p>
                <p className="text-sm text-gray-600">Téléphone : {data.sellerPhone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 flex items-center gap-2"><TagIcon className="w-4 h-4" /> Produit</h4>
                <p className="text-sm text-gray-600">Titre : {data.title}</p>
                <p className="text-sm text-gray-600">Description : {data.description}</p>
                <p className="text-sm text-gray-600">Catégorie : {data.category}</p>
                <p className="text-sm text-gray-600">Prix : {data.price} €</p>
                {data.originalPrice && <p className="text-sm text-gray-600">Prix d'origine : {data.originalPrice} €</p>}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> Localisation & état</h4>
                <p className="text-sm text-gray-600">Localisation : {data.location}</p>
                <p className="text-sm text-gray-600">État : {data.condition}</p>
                <p className="text-sm text-gray-600">Stock : {data.stock}</p>
                <p className="text-sm text-gray-600">Mis en avant : {data.featured ? 'Oui' : 'Non'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 flex items-center gap-2"><PhotoIcon className="w-4 h-4" /> Photos</h4>
                <p className="text-sm text-gray-600">{images.length} photo(s) téléchargée(s)</p>
                {images.length === 0 && <p className="text-red-500 text-sm">Aucune photo !</p>}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center animate-zoom-slow" style={{ backgroundImage: "url('https://topcargointernational.com/assets/plane2.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-float">
            <SparklesIcon className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wider uppercase">Vendre un produit</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Mettez votre article en vente
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">en quelques étapes</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Remplissez les informations ci-dessous. Notre équipe vérifiera votre annonce rapidement.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Stepper */}
      <div className="maxw-4xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 pt-8 pb-4 border-b border-gray-100">
            <div className="flex justify-between relative">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${idx < currentStep ? 'bg-emerald-500 text-white' : idx === currentStep ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-100 text-gray-400'}`}>
                    {idx < currentStep ? <CheckCircleIcon className="w-5 h-5" /> : <span>{idx + 1}</span>}
                  </div>
                  <p className={`mt-2 text-xs font-semibold ${idx <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{step.name}</p>
                  {idx < steps.length - 1 && (
                    <div className="absolute top-5 left-[calc(50%+1rem)] right-0 h-0.5 bg-gray-100 -z-10">
                      <div className={`h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500 ${idx < currentStep ? 'w-full' : 'w-0'}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Upload des photos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <PhotoIcon className="w-5 h-5 text-blue-600" />
                Photos du produit (max 5)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img src={image.url} alt={`produit ${index + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition">
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                    <PhotoIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Ajouter</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {images.length}/5 photos • JPG, PNG max 5MB
                {uploading && <span className="ml-2 text-blue-600">Téléchargement...</span>}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent()}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={prevStep} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition ${currentStep === 0 ? 'invisible' : ''}`}>
                  <ArrowLeftIcon className="w-5 h-5" /> Précédent
                </button>
                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md transition">
                    Suivant <ArrowRightIcon className="w-5 h-5" />
                  </button>
                ) : (
                  <button type="submit" disabled={loading || uploading || images.length === 0} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md transition disabled:opacity-50">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Publication...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        Publier le produit
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddProduct;