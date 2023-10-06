import apiClient from "./services";

export default {
  getMetric(metricId) {
    return apiClient.get(`/metrics/${metricId}`);
  },
  addMetric(metric) {
    return apiClient.post("/metrics/", metric);
  },
  updateMetric(id, metric) {
    return apiClient.put(`/metrics/${id}`, metric);
  },
  deleteMetric(id) {
    return apiClient.delete(`/metrics/${id}`);
  },
  getMetricsForTitle(titleId) {
    return apiClient.get(`/metrics/title/${titleId}`);
  },
  getMetricTypes() {
    return apiClient.get("/metrics/values/metricTypes");
  },
  getDataTypes() {
    return apiClient.get("/metrics/values/dataTypes");
  },
};