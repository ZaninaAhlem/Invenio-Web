const Message = (state = [], action) => {
  switch (action.type) {
    case "ADD-MESSAGE":
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case "GET-MESSAGES":
      return {
        ...state,
        messages: [...action.payload],
      };
    case "GET-ROOMS":
      return {
        ...state,
        rooms: [...action.payload],
      };
    default:
      return state;
  }
};

export default Message;
