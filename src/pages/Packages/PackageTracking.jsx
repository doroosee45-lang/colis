import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import WebSocketService from '../../services/websocket';

const PackageTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [package_, setPackage] = useState(null);
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrackingData();
    
    // WebSocket connection for real-time updates
    WebSocketService.connect();
    WebSocketService.on('tracking_update', handleTrackingUpdate);

    return () => {
      WebSocketService.off('tracking_update', handleTrackingUpdate);
    };
  }, [id]);

  const fetchTrackingData = async () => {
    try {
      const [packageRes, trackingRes] = await Promise.all([
        axios.get(`/packages/${id}`),
        axios.get(`/packages/${id}/tracking`),
      ]);

      setPackage(packageRes.data);
      setTracking(trackingRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      navigate('/packages');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackingUpdate = (data) => {
    if (data.packageId === id) {
      setTracking(prev => [data, ...prev]);
      toast.info('Mise à jour du suivi en temps réel');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pris en charge':
        return '📦';
      case 'en transit':
        return '🚚';
      case 'arrivé au hub':
        return '🏢';
      case 'en livraison':
        return '🚛';
      case 'livré':
        return '✅';
      default:
        return '📍';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'livré':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en transit':
      case 'en livraison':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'retardé':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Suivi du colis {package_.trackingNumber}
          </h1>
          <p className="text-gray-600">
            Statut actuel : <span className="font-medium">{package_.status}</span>
          </p>
        </div>
        <button
          onClick={() => navigate(`/packages/${id}`)}
          className="btn-secondary"
        >
          Retour aux détails
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(tracking.filter(t => t.status === 'livré').length > 0 ? 100 : 
                     tracking.filter(t => t.status === 'en livraison').length > 0 ? 75 :
                     tracking.filter(t => t.status === 'en transit').length > 0 ? 50 : 25)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Prise en charge</span>
            <span>En transit</span>
            <span>Hub</span>
            <span>Livraison</span>
            <span>Livré</span>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Historique de suivi
        </h3>
        
        <div className="space-y-6">
          {tracking.map((event, index) => (
            <div key={event._id || index} className="relative pl-8 pb-6 last:pb-0">
              {/* Timeline line */}
              {index < tracking.length - 1 && (
                <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center
                            ${event.status === 'livré' ? 'bg-green-100' : 
                              event.status === 'en transit' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <span className="text-sm">{getStatusIcon(event.status)}</span>
              </div>

              {/* Content */}
              <div className="ml-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-medium text-gray-900">
                    {event.status}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                {event.description && (
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {event.location && (
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tracking.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucune information de suivi disponible
            </div>
          )}
        </div>
      </div>

      {/* Estimated Delivery */}
      {package_.estimatedDelivery && (
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-medium">
                Livraison estimée
              </p>
              <p className="text-2xl font-bold text-primary-900">
                {new Date(package_.estimatedDelivery).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>
      )}

      {/* Share Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Partager le suivi
        </h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/tracking/${package_.trackingNumber}`}
            className="input-field flex-1"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/tracking/${package_.trackingNumber}`);
              toast.success('Lien copié !');
            }}
            className="btn-primary"
          >
            Copier
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Ce lien permet à vos clients de suivre leur colis en temps réel
        </p>
      </div>
    </div>
  );
};

export default PackageTracking;