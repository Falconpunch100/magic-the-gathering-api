import axios from "axios"
let baseURL = "http://localhost:3000"
let backEndAPI = axios.create({
    baseURL
})
export default backEndAPI;