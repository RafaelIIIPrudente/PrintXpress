import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css'

// Import the FileUpload component
import FileUpload from './pages/Upload/FileUpload'
import Print from './pages/Print/Print';
import Print2 from './pages/Print/Print2';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/print" element={<Print />} />
        <Route path="/print2" element={<Print2 />} />

      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
