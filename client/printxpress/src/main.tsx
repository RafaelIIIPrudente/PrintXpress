import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css'
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

// Import the FileUpload component
import FileUpload from './pages/Upload/FileUpload'
import Print from './pages/Print/Print';
import Home from './pages/home/home';
import CoinSlot from './pages/coinslot/coinslot';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/print" element={<Print />} />
          <Route path="/coinslot" element={<CoinSlot />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
)
