// src/api/apiClient.js
// axios client: withCredentials + accessToken-in-memory + automatic refresh

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send/receive httpOnly cookies (refresh token)
  headers: { Accept: "application/json" },
});

let accessToken = null;

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// queue for concurrent 401 refreshes
let isRefreshing = false;
let subscribers = [];

const onRefreshed = (token) => subscribers.forEach(cb => cb(token));
const addSubscriber = (cb) => subscribers.push(cb);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await api.post("/auth/refreshtoken"); // refresh token via httpOnly cookie
        const newToken = refreshRes.data?.accessToken;
        if (!newToken) throw new Error("No access token from refresh");
        accessToken = newToken;
        onRefreshed(newToken);
        subscribers = [];
        return api(originalRequest);
      } catch (err) {
        subscribers = [];
        accessToken = null;
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* -------------------------
   Auth & basic API helpers
   ------------------------- */

export function setAccessToken(token) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

/** Login (JSON). backend should return accessToken (in body) and set refresh cookie */
export async function loginAPI({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  const token = res.data?.data?.accessToken || res.data?.accessToken;
  if (token) accessToken = token;
  return res.data;
}

/** Register (multipart/form-data). use FormData with avatar file */
export async function registerAPI(formData) {
  const res = await api.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const token = res.data?.data?.accessToken || res.data?.accessToken;
  if (token) accessToken = token;
  return res.data;
}

/** Logout: clears cookie server-side */
export async function logoutAPI() {
  try {
    await api.post("/auth/logout");
  } finally {
    accessToken = null;
  }
}

/** Refresh explicitly */
export async function refreshAPI() {
  const res = await api.post("/auth/refreshtoken");
  const token = res.data?.accessToken;
  if (token) accessToken = token;
  return res.data;
}

/** Get current user (protected) */
export async function getProfileAPI() {
  const res = await api.get("/auth/me");
  return res.data;
}

/** Cart endpoints (buyer) */
export async function fetchCartAPI() {
  const res = await api.get("/cart");
  return res.data;
}
export async function addToCartAPI(payload) { // { productId, quantity }
  const res = await api.post("/cart", payload);
  return res.data;
}
export async function updateCartItemAPI(productId, payload) {
  const res = await api.put(`/cart/${productId}`, payload);
  return res.data;
}
export async function removeFromCartAPI(productId) {
  const res = await api.delete(`/cart/${productId}`);
  return res.data;
}
export async function clearCartAPI() {
  const res = await api.post("/cart/clear");
  return res.data;
}
// add to src/api/apiclient.js (paste near other exports)

export async function getProducts(params = {}) {
    // axiosInstance is already exported in your file; use it to call backend
    // returns axios response (caller expects res.data or res.data.products)
    const res = await axiosInstance.get('/products', { params });
    return res.data;
  }
  
  /** optional: get single product by id */
  export async function getProductById(productId) {
    const res = await axiosInstance.get(`/products/${productId}`);
    return res.data;
  }
  // get a list of artist users (sellers)
// // params: { page, limit, search, ... }
// export async function getArtists(params = {}) {
//     // axiosInstance is already exported in your apiclient file
//     const res = await axiosInstance.get('/users', { params });
//     return res.data;
//   }
  
//   /** optional: get single artist by id or slug */
//   export async function getArtistById(idOrSlug) {
//     const res = await axiosInstance.get(`/users/${idOrSlug}`);
//     return res.data;
//   }
  

/* Export axios instance if needed elsewhere */
export { api as axiosInstance };
