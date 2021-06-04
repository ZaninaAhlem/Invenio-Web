const formation = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.data };
    case "CREATE":
      return [...state, action.data];
    case "UPDATE_FORMATION":
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE_FORMATION":
      return state.filter((post) => post._id !== action.payload);
    case "GET_INSCRITS":
      return { ...state, inscrits: action.payload };
    default:
      return state;
  }
};

export default formation;
