import api from "./axios";

const paymentService = {

  // GET /api/payments
  getAll: (params = {}) =>
    api.get("/payments", { params }),

  // GET /api/payments/stats
  getStats: () =>
    api.get("/payments/stats"),

  // GET /api/payments/:id
  getById: (id) =>
    api.get(`/payments/${id}`),

  // POST /api/payments
  create: (data) =>
    api.post("/payments", data),

  // PUT /api/payments/:id
  update: (id, data) =>
    api.put(`/payments/${id}`, data),

  // DELETE /api/payments/:id
  delete: (id) =>
    api.delete(`/payments/${id}`),
};

export default paymentService;