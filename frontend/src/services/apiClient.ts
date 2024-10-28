import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.smk.dk/api/v1'
});

export default apiClient;