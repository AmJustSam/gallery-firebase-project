import {createStore, combineReducers, applyMiddleware} from "redux";
import loggedReducer from "./loggedReducer";
import galleryReducer from "./galleryReducer";
import loadingReducer from "./loadingReducer";
import paginationreducer from "./paginationReducer";

import {verifyAuth} from "../actions/loggedActions";

import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";

const appReducer = combineReducers({
   loggedIn: loggedReducer,
   gallery: galleryReducer,
   loading: loadingReducer,
   pagination: paginationreducer
});

const rootReducer = (state, action) => {
   if (action.type === "SIGN_OUT") {
     state.gallery = null;
   }

   return appReducer(state, action);
}

const config = {
   key: "root",
   storage,
   stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(config, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

store.dispatch(verifyAuth());

export {
   store,
   persistor
};