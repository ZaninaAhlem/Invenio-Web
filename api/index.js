import axios from "axios";

const API = axios.create({ baseURL: "https://343135c03e98.ngrok.io" });

export const signIn = (formData) => API.post("/centers/login", formData);
export const signUp = (formData) => API.post("/centers", formData);
export const logout = () =>
  API.post(
    "/centers/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

export const getProfile = () =>
  API.get(`centers/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const updateProfile = (formData) =>
  API.patch(`/centers/me`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const deleteAccount = () =>
  API.delete("/centers/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

export const getFormations = (id) =>
  API.get(`/center/formations/${id}?sortBy=createdAt_desc`);
export const postFormation = (formData) =>
  API.post(`/formations`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const deleteFormation = (id) =>
  API.delete(`/formations/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const updateFormation = (id, formData) =>
  API.patch(`/formations/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const postImage = (imageData) => API.post("upload", imageData);
export const getInscrits = (id) => API.get(`/formations/inscriptions/${id}`);

export const getMessages = (room) => API.get(`/centers/${room}`);
export const getRooms = (id) => API.get(`/rooms/${id}`);
export const getUser = (id) => API.get(`/room/users/${id}`);
