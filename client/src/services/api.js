import axios from "axios";

const todoApi = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'X-Requested-With': 'TodoData'}
});

export default todoApi;