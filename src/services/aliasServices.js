import apiClient from "./services.js";

export default {
    getAllForUser(userId){
        return apiClient.get('/user/${userId}/alias')
    },
}