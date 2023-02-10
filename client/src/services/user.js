import axios from "axios"


export const login = (userData) => {
    return axios.post("http://localhost:3300/login", userData)
}