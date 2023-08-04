import apiClient from "./services";

export default {
  /*-- General User Information --*/
  createUser(user) {
    console.log(user);
    return apiClient.post("user/", user);
  },
  updateUser(userId, user) {
    return apiClient.put("user/" + userId, user);
  },
  getUser(userId) {
    return apiClient.get("user/" + userId);
  },
  getUserByEmail(email) {
    return apiClient.get("user?email=" + email);
  },
  getClassifications() {
    return apiClient.get("user/classifications");
  },

  /*-- Emergency Contacts --*/
  addEmergencyContact(userId, contact) {
    return apiClient.post(`/user/${userId}/emergencyContacts/`, contact);
  },
  updateEmergencyContact(userId, contact) {
    return apiClient.put(
      `/user/${userId}/emergencyContacts/${contact.id}`,
      contact
    );
  },
  getEmergencyContacts(userId) {
    return apiClient.get(`/user/${userId}/emergencyContacts/`);
  },

  /*-- Aliases --*/
  getPrimaryAlias(userId) {
    return apiClient.get(`user/${userId}/alias?type=primary`);
  },
  getAllAliases(userId) {
    return apiClient.get(`user/${userId}/alias`);
  },
  addAlias(userId, alias) {
    return apiClient.post(`user/${userId}/alias`, alias);
  },
  updateAlias(userId, aliasId, alias) {
    return apiClient.put(`user/${userId}/alias/${aliasId}`, alias);
  },
};
