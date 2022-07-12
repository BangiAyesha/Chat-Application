import axios from "axios";
import { URL } from "./Url";
let token = localStorage.getItem("_token");

export function addConversation(data) {
    return axios.post(`${URL}addconversation`, data);
}

export function getConversation(id) {
    return axios.get(
        `${URL}conversation/${id}`
        //  {
        //     headers: { Authorization: `Bearer ${token}` },
        // }
    );
}

export function getConversationoftwo(ids) {
    return axios.get(`${URL}conversation2/${ids.id1}/${ids.id2}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
