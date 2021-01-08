const LOADING = "LOADING";
const LOADED = "LOADED";

const loadingReducer = (initialState = false, action) => {
  switch (action.type) {
    case LOADING:
      return false;
    case LOADED:
      return true;
    default:
      return initialState;
  }
};

export default loadingReducer;