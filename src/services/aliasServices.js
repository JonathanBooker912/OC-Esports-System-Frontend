import apiClient from "./services.js";

export default {
  getAllForUser(userId) {
    return apiClient.get(`/user/${userId}/alias`);
  },
  create(data, userId) {
    return apiClient.post("/user/" + userId + "/alias", data);
  },
  update(data, userId, aliasId) {
    return apiClient.put("/user/" + userId + "/alias/" + aliasId, data);
  },
  deleteOne(userId, aliasId) {
    return apiClient.delete("/user/" + userId + "/alias/" + aliasId);
  },
};
