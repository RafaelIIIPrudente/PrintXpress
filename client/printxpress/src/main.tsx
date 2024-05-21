import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css'

import FileUpload from './pages/Upload/FileUpload'
import Print from './pages/Print/Print';
import Home from './pages/home/Home';
// import CoinSlot from './pages/coinslot/coinslot';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/print" element={<Print />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/coinslot" element={<CoinSlot />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
