import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const httpClient = axios.create({
    baseURL: BASE_URL,

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});

httpClient.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: unknown) => {
        const { response } = error as { response?: { status: number } };

        // Handle 401 Unauthorized errors (token expired or invalid)
        if (response && response.status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const request = async <T>(config: any): Promise<T> => {
  try {
    const response = await httpClient.request<T>(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default httpClient;
