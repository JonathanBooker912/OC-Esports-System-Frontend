import apiClient from "./services";

export default {
  getAll(pageSize, page) {
    return apiClient.get(`/user?pageSize=${pageSize}&page=${page}`);
  },
  get(id) {
    return apiClient.get("/user/" + id);
  },
  search(filter, pageSize, page) {
    return apiClient.get(
      `/user?filter=${filter}&pageSize=${pageSize}&page=${page}`
    );
  },
};
