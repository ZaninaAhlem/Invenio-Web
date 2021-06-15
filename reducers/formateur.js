const Formateur = (state = [], action) => {
  switch (action.type) {
    case "GET_FORMATEUR":
      return { ...state, formateurs: action.payload };
    case "ADD_FORMATEUR":
      return { ...state, formateurs: action.payload };
    case "DELETE_FORMATEUR":
      return {
        ...state,
        formateurs: state.formateurs.filter(
          (formateur) => formateur._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default Formateur;
