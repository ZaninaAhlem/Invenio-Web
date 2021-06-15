import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3080" });

//auth
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

//formations
export const getFormations = (id) => API.get(`/center/formations/${id}`);
export const getFormation = (id) => API.get(`/formation/${id}`);
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
export const addInscriptionForm = (formData) =>
  API.post("/inscriptionForm", formData);
export const getInscriptionForm = (id) => API.get(`/inscriptionForm/${id}`);
export const postImage = (imageData) => API.post("upload", imageData);
export const getImage = (id) => API.get(`/image/${id}`);
export const getInscrits = () =>
  API.get(`/formations/inscriptions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const getInscDemands = (id) => API.get(`inscriptiondemand/${id}`);

export const responseInscDemands = (id, data) =>
  API.post(`inscription/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

//messages
export const getMessages = (room) => API.get(`/centers/${room}`);
export const getRooms = (id) => API.get(`/rooms/${id}`);
export const getUser = (id) => API.get(`/room/users/${id}`);

//formateur
export const addFormateur = (formData) =>
  API.post("/formateurs", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const getFormateur = () =>
  API.get(`/formateurs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
export const deleteFormateur = (id) =>
  API.delete(`/formateurs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
