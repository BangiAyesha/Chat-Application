import axios from "axios";
import { URL } from "./Url";

export function registerUser(data) {
    return axios.post(`${URL}register`, data);
}

export function loginUser(data) {
    return axios.post(`${URL}login`, data);
}

export function getUser(id) {
    return axios.get(`${URL}getuser/${id}`);
}
