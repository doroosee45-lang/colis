import api from "./axios";

const analyticsService = {

  // GET /api/analytics/dashboard
  getDashboard: () =>
    api.get("/analytics/dashboard"),

  // GET /api/analytics/reports?type=packages&startDate=...&endDate=...
  getReport: (params = {}) =>
    api.get("/analytics/reports", { params }),
};

export default analyticsService;