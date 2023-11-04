import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./SocketContext";
import { Store } from "./app/store.js";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
