const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const loggedReducer = (initialState = false, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return false;
    default:
      return initialState;
  }
};

export default loggedReducer;