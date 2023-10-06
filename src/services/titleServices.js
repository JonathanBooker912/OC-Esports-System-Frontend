import apiClient from "./services";

export default {
  getTitle(titleId) {
    return apiClient.get(`/titles/${titleId}`);
  },
  updateTitle(titleId, updatedTitle) {
    return apiClient.put(`/titles/${titleId}`, updatedTitle);
  },
  deleteTitle(titleId) {
    return apiClient.delete(`/titles/${titleId}`);
  },
  getTitles() {
    return apiClient.get("/titles/");
  },
  addTitle(title) {
    return apiClient.post("/titles/", title);
  },
};
