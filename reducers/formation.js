const formation = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.data };
    case "CREATE":
      return { ...state, posts: action.data };
    case "DELETE_FORMATION":
      return state.filter((post) => post._id !== action.payload);
    case "GET_INSCRITS":
      return { ...state, inscrits: action.payload };
    case "POST_IMAGE":
      return { ...state, imageId: action.payload };
    case "ADD_FORM":
      return { ...state, forms: action.payload };
    case "GET_FORM":
      return { ...state, forms: action.payload };
    default:
      return state;
  }
};

export default formation;
