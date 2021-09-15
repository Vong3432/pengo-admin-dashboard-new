import axios from 'axios';

export const axiosFetcher = {
    get: async (url) => axios.get(url, {
        headers: {
            "Authorization": `Bearer MTc4.A_UcqxunGPSHvld9CwAbWAn9BzN8h9mqOLGsuPEwlMy3mOwBJnsEu24tnV20`,
        }
    }),
    post: async (url, data) => axios.post(url, data, {
        headers: {
            "Authorization": `Bearer MTc4.A_UcqxunGPSHvld9CwAbWAn9BzN8h9mqOLGsuPEwlMy3mOwBJnsEu24tnV20`,
        }
    })
};
