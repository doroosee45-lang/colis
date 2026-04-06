import api from "./axios";

const packageService = {

  // GET /api/packages
  getAll: (params = {}) =>
    api.get("/packages", { params }),

  // GET /api/packages/stats
  getStats: () =>
    api.get("/packages/stats"),

  // GET /api/packages/track/:trackingNumber  (public, sans auth)
  track: (trackingNumber) =>
    api.get(`/packages/track/${trackingNumber}`),

  // GET /api/packages/:id
  getById: (id) =>
    api.get(`/packages/${id}`),

  // POST /api/packages
  create: (data) =>
    api.post("/packages", data),

  // PUT /api/packages/:id
  update: (id, data) =>
    api.put(`/packages/${id}`, data),

  // PUT /api/packages/:id/status
  updateStatus: (id, status, location = "", description = "") =>
    api.put(`/packages/${id}/status`, { status, location, description }),

  // DELETE /api/packages/:id
  delete: (id) =>
    api.delete(`/packages/${id}`),
};

export default packageService;