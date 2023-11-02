import apiClient from "./services.js";

export default {
  createMatchParticipant(data) {
    return apiClient.post(`/matchParticipant/`, data);
  },
  getMatchParticipantById(id) {
    return apiClient.get(`/matchParticipant/${id}`);
  },
  updateMatchParticipant(id, data) {
    return apiClient.put(`/matchParticipant/${id}`, data);
  },
  deleteMatchParticipant(id) {
    return apiClient.delete(`/matchParticipant/${id}`);
  },
  getAllForMatch(matchId, page, pageSize, filter) {
    return apiClient.get(`/matchParticipant/match/${matchId}?page=${page}&pageSize=${pageSize}&filter=${filter}`);
  },
  getAllForAlias(aliasId) {
    return apiClient.get(`/matchParticipant/alias/${aliasId}`);
  },
};
