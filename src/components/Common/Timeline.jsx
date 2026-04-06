import React from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  BuildingOfficeIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const Timeline = ({ items }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <TruckIcon className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <HomeIcon className="w-5 h-5 text-green-500" />;
      case 'hub':
        return <BuildingOfficeIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
      case 'delivered':
        return 'bg-green-100 border-green-200';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200';
      case 'info':
      case 'hub':
        return 'bg-blue-100 border-blue-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Succès';
      case 'warning':
        return 'En attente';
      case 'info':
        return 'En transit';
      case 'delivered':
        return 'Livré';
      case 'hub':
        return 'Arrivé au hub';
      default:
        return status || 'Information';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ClockIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {items.map((item, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index < items.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.title || getStatusText(item.status)}
                    </p>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    )}
                    {item.location && (
                      <p className="text-xs text-gray-400 mt-1 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {item.location}
                      </p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;