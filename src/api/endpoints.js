// Garder le code existant mais ajouter "export" devant
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  
  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  
  // Clients
  CLIENTS: '/clients',
  CLIENT_DETAIL: (id) => `/clients/${id}`,
  CLIENT_STATS: (id) => `/clients/${id}/stats`,
  
  // Colis
  PACKAGES: '/packages',
  PACKAGE_DETAIL: (id) => `/packages/${id}`,
  PACKAGE_TRACKING: (id) => `/packages/${id}/tracking`,
  PACKAGE_STATUS: (id) => `/packages/${id}/status`,
  
  // Agences
  AGENCIES: '/agencies',
  AGENCY_DETAIL: (id) => `/agencies/${id}`,
  
  // Employés
  EMPLOYEES: '/employees',
  EMPLOYEE_DETAIL: (id) => `/employees/${id}`,
  
  // Paiements
  PAYMENTS: '/payments',
  PAYMENT_DETAIL: (id) => `/payments/${id}`,
  PAYMENT_INVOICE: (id) => `/payments/${id}/invoice`,
  
  // Marketplace - Produits
  PRODUCTS: '/marketplace/products',
  PRODUCT_DETAIL: (id) => `/marketplace/products/${id}`,
  PRODUCT_UPLOAD_IMAGE: '/marketplace/products/upload',
  MY_PRODUCTS: '/marketplace/my-products',
  MY_SALES: '/marketplace/my-sales',
  
  // Marketplace - Kilos
  KILOS_LISTINGS: '/marketplace/kilos',
  KILOS_DETAIL: (id) => `/marketplace/kilos/${id}`,
  BUY_KILOS: (id) => `/marketplace/kilos/${id}/buy`,
  MY_KILOS_SOLD: '/marketplace/my-kilos-sold',
  MY_KILOS_BOUGHT: '/marketplace/my-kilos-bought',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_READ: (id) => `/notifications/${id}/read`,
  
  // Profil
  PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update',
  CHANGE_PASSWORD: '/profile/change-password',
};