import apiClient from "./services";

export default {
  /*-- General User Information --*/
  updateUser(userId, user) {
    console.log(user);
    return apiClient.put("user/" + userId, user);
  },
  getUser(userId) {
    return apiClient.get("user/" + userId);
  },
  getClassifications() {
    return apiClient.get("user/classifications");
  },

  /*-- Emergency Contacts --*/
  addEmergencyContact(contact) {
    return apiClient.post(`/user/${userId}/emergencyContacts/`, contact);
  },
  getEmergencyContacts(userId) {
    return apiClient.get(`/user/${userId}/emergencyContacts/`);
  },

  /*-- Aliases --*/
  getPrimaryAlias(userId) {
    return apiClient.get(`user/${userId}/alias?type=primary`);
  },
  addAlias(userId, alias) {
    return apiClient.post(`user/${userId}/alias`, alias);
  },
  updateAlias(userId, aliasId, alias) {
    return apiClient.put(`user/${userId}/alias/${aliasId}`, alias);
  },
};
