import * as api from "../api/index";

export const getFormations = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormations(id);

    dispatch({ type: "FETCH_ALL", data });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postFormation = (formData) => async (dispatch) => {
  try {
    const data = api.postFormation(formData).then((data) => {
      return data.data;
    });
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
export const updateFormation = (id) => async (dispatch) => {
  try {
    const { data } = api.updateFormation(id);
    dispatch({ type: "UPDATE_FORMATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postImage = (imageData) => async (dispatch) => {
  try {
    const { data } = await api.postImage(imageData);
    dispatch({ type: "POST_IMAGE", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscrits = (id) => async (dispatch) => {
  try {
    const { data } = api.getInscrits(id);
    dispatch({ type: "GET_INSCRITS", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
