import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./index.css";

import Print from "./pages/Print/Print";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import PrintSummary from "./pages/Print/print-summary";
import Print2 from "./pages/Print/Print2";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/print" element={<Print />} />
        <Route path="/print-summary" element={<PrintSummary />} />
        <Route path="/print2" element={<Print2 />} />
       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
