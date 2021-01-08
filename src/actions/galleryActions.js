const GET_IMAGES = "GET_IMAGES";
const ADD_IMAGE = "ADD_IMAGES";
const REMOVE_IMAGE = "REMOVE_IMAGES";
const LOAD_MORE = "LOAD_MORE";

const SET_PAGINATION = "SET_PAGINATION";

import {firestore, serverTimestamp} from "../utils/firebase";

const getImages = (payload) => {
  return async (dispatch, getState) => {
    const state = getState();
    
    try {
      const snapshot = await firestore.collection("gallery").doc(state.loggedIn.uid)
      .collection("images").orderBy("createdAt", "desc").limit(10).get();

      if (snapshot.size === 10) {
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];                     // get last doc
        dispatch(({type: SET_PAGINATION, payload: lastDoc.id}));                     // set as pagination state  
      } else {
        dispatch(({type: SET_PAGINATION, payload: false}));
      }

      const data = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
  
      if (data) {
        dispatch({type: GET_IMAGES, payload: data});
      }
  
    } catch (err) {
      dispatch({type: GET_IMAGES, payload: []});
    }
  }  
}

const addImage = (payload) => {
  return async (dispatch, getState) => {
     const state = getState();
     const docRef = await firestore.collection("gallery").doc(state.loggedIn.uid).collection("images")
       .add({filename: payload.filename, uid: state.loggedIn.uid, 
        createdAt: serverTimestamp()}).then((doc) => doc);
       
     const doc = await docRef.get();
     
     dispatch({type: ADD_IMAGE, payload: {id: doc.id, ...doc.data()}});
  }
}

const removeImage = (payload) => {
  return async (dispatch, getState) => {
    const state = getState();
    await firestore.collection("gallery").doc(state.loggedIn.uid).collection("images").doc(payload.id).delete();
  
    dispatch({type: REMOVE_IMAGE, payload: payload});
  }
}

const loadMore = (payload) => {
  return async (dispatch, getState) => {
    const state = getState();
    const getDoc = await firestore.collection("gallery").doc(state.loggedIn.uid).collection("images").doc(state.pagination).get();
    const snapshot = await firestore.collection("gallery").doc(state.loggedIn.uid)
    .collection("images").orderBy("createdAt", "desc").startAfter(getDoc).limit(10).get();
   
    const lastDoc = snapshot.docs[snapshot.docs.length -1];
   
    // console.log(lastDoc);
    // console.log(snapshot);
    // console.log(snapshot.empty);
    // console.log(state.pagination);
    
    if (lastDoc) {
      dispatch({type: SET_PAGINATION, payload: lastDoc.id});
    }
    
    if (!snapshot.empty) {
      const data = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
      
      if (data) {
        dispatch({type: LOAD_MORE, payload: data});
      }
    } else {
      dispatch({type: SET_PAGINATION, payload: false});
    }
  }
}

export {
  getImages,
  addImage,
  removeImage,
  loadMore
};