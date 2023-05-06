import apiClient from "./services";

export default {
    getAll() {
        return apiClient("/users");
    }
}