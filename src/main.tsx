import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Auth } from "./pages/Auth";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
