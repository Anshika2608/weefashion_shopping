import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MenContextProvider } from "./Contexts/MenContext/MenContext.jsx";
import { WomenContextProvider } from "./Contexts/WomenContext/WomenContext.jsx";
import { KidsContextProvider } from "./Contexts/KidsContext/KidsContext.jsx";
import { LoginContextProvider } from "./Contexts/LoginContext/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoginContextProvider>
      <MenContextProvider>
        <WomenContextProvider>
          <KidsContextProvider>
          <App />
          </KidsContextProvider>
        </WomenContextProvider>
      </MenContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
