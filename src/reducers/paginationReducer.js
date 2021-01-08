const SET_PAGINATION = "SET_PAGINATION";

const paginationReducer = (initialState = false, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return action.payload;
    default:
      return initialState;
  }
};

export default paginationReducer;