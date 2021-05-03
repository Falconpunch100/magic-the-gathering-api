import axios from "axios"
let baseURL = "https://magic-the-gathering-backend.herokuapp.com/"
let backEndAPI = axios.create({
    baseURL
})
export default backEndAPI;