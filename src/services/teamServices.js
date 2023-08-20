import apiClient from "./services";

export default {
  getTeam(id) {
    return apiClient.get(`/teams/${id}`);
  },
  getAllTeams() {
    return apiClient.get("/teams/");
  },
  addTeam(team) {
    return apiClient.post("/teams/", team);
  },
  updateTeam(id, team) {
    return apiClient.put(`/teams/${id}`, team);
  },
  deleteTeam(id) {
    return apiClient.delete(`/teams/${id}`);
  },
  search(filter, pageSize, page) {
    return apiClient.get(
      `/teams?filter=${filter}&pageSize=${pageSize}&page=${page}`
    );
  },
};
