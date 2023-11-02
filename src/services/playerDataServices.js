import apiClient from "./services.js";

export default {
  createPlayerData(data) {
    return apiClient.post("/playerData", data);
  },
  getPlayerDataById(id) {
    return apiClient.get(`/playerData/${id}`);
  },
  updatePlayerData(id, data) {
    return apiClient.put(`/playerData/${id}`, data);
  },
  deletePlayerData(id) {
    return apiClient.delete(`/playerData/${id}`);
  },
  getAllForParticipant(participantId) {
    return apiClient.get(`/playerData/participant/${participantId}`);
  },
};
