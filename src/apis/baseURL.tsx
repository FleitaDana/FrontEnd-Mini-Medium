import axios from "axios";

const baseURL = axios.create({

    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

//Los interceptores son funciones que se ejecutan antes de que una solicitud se envíe o después de que se reciba una respuesta.
baseURL.interceptors.request.use(
    (config) => {
        const token = window.sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default baseURL;