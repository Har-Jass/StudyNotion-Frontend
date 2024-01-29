import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// importing Browser Router Dom
import { BrowserRouter } from "react-router-dom";

// creating store
const store = configureStore({
  reducer: rootReducer
});

// App Component ko Browser Router me isliye rkhte hai because hmko App.js file me Routes create krne hai
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);