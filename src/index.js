import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";

import "lazysizes";

import "./Normalize.scss";
import "./Main.scss";

import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";

import {store, persistor} from "./reducers";

render(
  <React.StrictMode>
  <Router>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>}  persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
   </Router>
 </React.StrictMode>
, document.getElementById("root"));