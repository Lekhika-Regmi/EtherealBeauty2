import React from "react";
import { StrictMode } from "react";
//import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/routes.jsx";
import "remixicon/fonts/remixicon.css";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundry";
import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <Provider store={store}> 
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
    </Provider>,
  </React.StrictMode>
);
