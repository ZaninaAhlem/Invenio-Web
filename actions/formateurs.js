import * as api from "../api";

export const addFormateur = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addFormateur(formData);
    dispatch({ type: "ADD_FORMATEUR", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFormateur = () => async (dispatch) => {
  try {
    const { data } = await api.getFormateur();
    dispatch({ type: "GET_FORMATEUR", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFormateur = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFormateur(id);
    dispatch({ type: "DELETE_FORMATEUR", payload: data });
  } catch (error) {
    console.log(error);
  }
};
