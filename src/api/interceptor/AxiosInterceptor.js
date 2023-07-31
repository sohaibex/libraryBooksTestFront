import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const message = error.message || 'An unexpected error has occurred';
        const code = error.response ? error.response.status : 500;

        Swal.fire({
            icon: 'error',
            title: `Error: ${code}`,
            text: message,
        });

        return Promise.reject(error);
    }
);

export default axiosInstance;
