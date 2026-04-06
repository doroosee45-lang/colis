import api from "./axios";

const marketplaceService = {

  // ── PRODUITS ──────────────────────────────

  // GET /api/marketplace/products
  getProducts: (params = {}) =>
    api.get("/marketplace/products", { params }),

  // GET /api/marketplace/products/my-sales
  getMySales: () =>
    api.get("/marketplace/products/my-sales"),

  // GET /api/marketplace/products/:id
  getProduct: (id) =>
    api.get(`/marketplace/products/${id}`),

  // POST /api/marketplace/products  (avec images)
  createProduct: (data) => {
    const isFormData = data instanceof FormData;
    return api.post("/marketplace/products", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  // PUT /api/marketplace/products/:id
  updateProduct: (id, data) =>
    api.put(`/marketplace/products/${id}`, data),

  // PUT /api/marketplace/products/:id/buy
  buyProduct: (id) =>
    api.put(`/marketplace/products/${id}/buy`),

  // DELETE /api/marketplace/products/:id
  deleteProduct: (id) =>
    api.delete(`/marketplace/products/${id}`),

  // ── KILOS ────────────────────────────────

  // GET /api/marketplace/kilos
  getKiloOffers: (params = {}) =>
    api.get("/marketplace/kilos", { params }),

  // GET /api/marketplace/kilos/my-offers
  getMyKiloOffers: () =>
    api.get("/marketplace/kilos/my-offers"),

  // GET /api/marketplace/kilos/my-orders
  getMyKiloOrders: () =>
    api.get("/marketplace/kilos/my-orders"),

  // GET /api/marketplace/kilos/:id
  getKiloOffer: (id) =>
    api.get(`/marketplace/kilos/${id}`),

  // POST /api/marketplace/kilos
  createKiloOffer: (data) =>
    api.post("/marketplace/kilos", data),

  // POST /api/marketplace/kilos/:id/reserve
  reserveKilos: (id, reservedWeight, notes = "") =>
    api.post(`/marketplace/kilos/${id}/reserve`, { reservedWeight, notes }),

  // PUT /api/marketplace/kilos/:id
  updateKiloOffer: (id, data) =>
    api.put(`/marketplace/kilos/${id}`, data),

  // DELETE /api/marketplace/kilos/:id
  deleteKiloOffer: (id) =>
    api.delete(`/marketplace/kilos/${id}`),
};

export default marketplaceService;