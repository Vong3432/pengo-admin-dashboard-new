import axios from "axios";

export function login(token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`
    // document.cookie = `pengo-token=${token}`;
  }
  export function logout() {
    axios.defaults.headers['Authorization'] = `Bearer `
    // document.cookie = "pengo-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  
  