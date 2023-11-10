import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PeerVideo from "./PeerVideo.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PeerProvider } from "./Context.jsx";
import Navbar from "./Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
      
      <PeerVideo></PeerVideo>
   
  </React.StrictMode>
);
