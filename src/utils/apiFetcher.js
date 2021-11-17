import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    console.log("Before request", config)
    const token = localStorage.getItem('token')

    config.headers['authorization'] = `Bearer ${token}`

    return config
}, (err) => {
    return Promise.reject(err)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const axiosFetcher = {
    get: async (url) => axios.get(url, {
        withCredentials: true,
    }),
    post: async (url, data) => axios.post(url, data, {
        withCredentials: true,
    }),
    put: async (url, data) => axios.put(url, data, {
        withCredentials: true,
    }),
    del: async (url, data) => axios.delete(url, data, {
        withCredentials: true,
    }),
};
