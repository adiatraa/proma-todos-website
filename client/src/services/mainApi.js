import axios from "axios";

const todoApi = axios.create({
    baseURL: "http://localhost:3002"
});

export default todoApi;