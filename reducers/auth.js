const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("userToken", action.payload.token);
      localStorage.setItem("userId", action.payload.center._id);
      return {
        ...state,
        center: action.payload.center,
      };
    case "LOGOUT":
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      console.log("from reducers");
      return {
        ...state,
        center: {},
      };
    case "READ_PROFILE":
      return {
        ...state,
        center: action.payload,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        center: action.payload,
      };
    case "DELETE_ACCOUNT":
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      return {
        ...state,
        center: {},
      };
    case "GET_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
