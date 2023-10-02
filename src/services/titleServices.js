import apiClient from "./services";

export default {
  getTitle(titleId) {
    return apiClient.get(`/titles/${titleId}`);
  },
  getTitles() {
    return apiClient.get("/titles/");
  },
  addTitle(title) {
    return apiClient.post("/titles/", title);
  },
};
