import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css'

// Import the FileUpload component
import FileUpload from './pages/Upload/FileUpload'
import PrintPDF from './pages/Print/Print';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/print" element={<PrintPDF />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
