import axios from "axios";
import { URL } from "./Url";

export function addMessage(data) {
    return axios.post(`${URL}addmessage`, data);
}

export function getUserMessages(id) {
    return axios.get(`${URL}messages/${id}`);
}
