const GET_IMAGES = "GET_IMAGES";
const ADD_IMAGE = "ADD_IMAGES";
const REMOVE_IMAGE = "REMOVE_IMAGES";
const LOAD_MORE = "LOAD_MORE";

const galleryReducer = (initialState = [], action) => {
  switch (action.type) {
    case GET_IMAGES: 
      return action.payload;
    case ADD_IMAGE:
      return [action.payload, ...initialState];
    case REMOVE_IMAGE:
      return initialState.filter((image) => {
        return image.id !== action.payload.id;
      })
    case LOAD_MORE:
      return [...initialState, ...action.payload];
    default:
      return initialState; 
  }
}

export default galleryReducer;