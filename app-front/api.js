import axios from "axios";

export default axios.create({
    baseURL: "localhost:3000",
    header: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Acces-Control-Allow-Origin": "*",
    },
    withCredentials: true,
});