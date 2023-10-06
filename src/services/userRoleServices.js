import apiClient from "./services.js";

export default {
  createRole(userrole) {
    return apiClient.post("userrole", userrole);
  },
  getAllRoles() {
    return apiClient.get("userrole");
  },
  getRole(id) {
    return apiClient.get("userrole/" + id);
  },
  updateRole(id, userrole) {
    return apiClient.put("userrole/" + id, userrole);
  },
  deleteRole(id) {
    return apiClient.delete("userrole/" + id);
  },
};
