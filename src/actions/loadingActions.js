const LOADING = "LOADING";
const LOADED = "LOADED";

const loading = (payload) => {
  return {
    type: LOADING
  }
}

const loaded = (payload) => {
  return {
    type: LOADED
  }
}

export {
  loading,
  loaded
}