import axios from "axios"
let baseURL = "https://api.magicthegathering.io/v1/"
let mtgAPI = axios.create({
    baseURL
})
export default mtgAPI;