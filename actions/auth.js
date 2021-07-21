import * as api from "../api/index";

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: "AUTH", payload: data });
    console.log("signed In");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", payload: data });
    console.log("signed Up");
    return data;
  } catch (error) {
    console.log(error);
    // dispatch({ type: "ADD_ERROR", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    console.log(data);

    // dispatch({ type: "LOGOUT", payload: data });
    console.log("logged out");
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const { data } = await api.getProfile();

    dispatch({ type: "READ_PROFILE", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (form) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(form);

    dispatch({ type: "UPDATE_PROFILE", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    const { data } = await api.deleteAccount();

    dispatch({ type: "DELETE_ACCOUNT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({ type: "GET_PROFILE", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadAvatar = (imageData) => async (dispatch) => {
  try {
    const { data } = await api.uploadAvatar(imageData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
