import api from "./axios";

const employeeService = {

  // GET /api/employees
  getAll: (params = {}) =>
    api.get("/employees", { params }),

  // GET /api/employees/stats
  getStats: () =>
    api.get("/employees/stats"),

  // GET /api/employees/:id
  getById: (id) =>
    api.get(`/employees/${id}`),

  // POST /api/employees
  create: (data) =>
    api.post("/employees", data),

  // PUT /api/employees/:id
  update: (id, data) =>
    api.put(`/employees/${id}`, data),

  // DELETE /api/employees/:id
  delete: (id) =>
    api.delete(`/employees/${id}`),
};

export default employeeService;