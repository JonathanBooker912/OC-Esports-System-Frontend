import apiClient from "./services";

export default {
  getAll() {
    return apiClient.get("/user");
  },
  get(id) {
    return apiClient.get("/user/" + id);
  },
};
