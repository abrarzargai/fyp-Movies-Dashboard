import Config from "../config";

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { token }
      } = store.getState();
      config.baseURL = Config.REACT_APP_API_URL;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
