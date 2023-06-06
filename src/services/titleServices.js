import apiClient from "./services";

export default {
  getTitles() {
    return apiClient.get("/titles/");
  },
  addTitle(title) {
    return apiClient.post("/titles/", title);
  },
};
