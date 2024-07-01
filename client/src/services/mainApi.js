import axios from "axios";

const todoApi = axios.create({
    baseURL: "http://localhost:3001"
});

export default todoApi;