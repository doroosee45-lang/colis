import api from "./axios";

const agencyService = {

  // GET /api/agencies
  getAll: (params = {}) =>
    api.get("/agencies", { params }),

  // GET /api/agencies/stats
  getStats: () =>
    api.get("/agencies/stats"),

  // GET /api/agencies/:id
  getById: (id) =>
    api.get(`/agencies/${id}`),

  // POST /api/agencies
  create: (data) =>
    api.post("/agencies", data),

  // PUT /api/agencies/:id
  update: (id, data) =>
    api.put(`/agencies/${id}`, data),

  // DELETE /api/agencies/:id
  delete: (id) =>
    api.delete(`/agencies/${id}`),
};

export default agencyService;