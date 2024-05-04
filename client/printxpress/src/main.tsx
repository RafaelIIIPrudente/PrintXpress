import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./index.css";

import Print from "./pages/Print/print";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import PrintSummary from "./pages/Print/print-summary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/print" element={<Print />} />
        <Route path="/print-summary" element={<PrintSummary />} />
       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
