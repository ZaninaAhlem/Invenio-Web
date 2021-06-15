import * as api from "../api/index";

export const getFormations = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormations(id);

    dispatch({ type: "FETCH_ALL", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFormation = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormation(id);
    dispatch({ type: "FETCH_ALL", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postFormation = (formData) => async (dispatch) => {
  try {
    const { data } = await api.postFormation(formData);
    dispatch({ type: "CREATE", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFormation = (id) => async (dispatch) => {
  try {
    const { data } = api.deleteFormation(id);
    dispatch({ type: "DELETE_FORMATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateFormation = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateFormation(id, formData);
    dispatch({ type: "UPDATE_FORMATION", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postImage = (imageData) => async (dispatch) => {
  try {
    const { data } = await api.postImage(imageData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getImage = (id) => async (dispatch) => {
  try {
    const { data } = await api.getImage(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscrits = () => async (dispatch) => {
  try {
    const { data } = await api.getInscrits();
    dispatch({ type: "GET_INSCRITS", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addInscriptionForm = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addInscriptionForm(formData);
    dispatch({ type: "ADD_FORM", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscriptionForm = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInscriptionForm(id);
    dispatch({ type: "GET_FORM", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscDemands = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInscDemands(id);
    dispatch({ type: "GET_INSC_DEMAND", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const responseInscDemands = (id, resData) => async (dispatch) => {
  try {
    const { data } = await api.responseInscDemands(id, resData);
    dispatch({ type: "RESPONSE_INSC_DEMAND", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
