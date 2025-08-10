import { useState, useEffect } from "react";
import backgroundImage from "../../assets/bg.png";
import Navbar from "../components/HomeNavbar";
import QRCode from "qrcode";
import pdfIcon from "../../assets/pdf.png";
import { useNavigate } from "react-router-dom";

const LOCAL_IP = "192.168.254.104";
const PORT = "5173";
const MOBILE_UPLOAD_URL = `http://${LOCAL_IP}:${PORT}/mobile-upload`;
const BACKEND_URL = `http://${LOCAL_IP}:5000`;

function Upload(): JSX.Element {
  // State for QR code
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  // State for latest uploaded file
  const [latestFile, setLatestFile] = useState<{ title: string; pdf: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Generate QR code for mobile upload
  const generateQRCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(MOBILE_UPLOAD_URL, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Fetch the latest uploaded file
  const fetchLatestFile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/get-files`);
      if (!response.ok) throw new Error("Failed to fetch latest file");
      const data = await response.json();
      if (data && data.data) {
        setLatestFile(data.data);
      } else {
        setLatestFile(null);
      }
    } catch (err) {
      setError("Could not load latest uploaded file.");
      setLatestFile(null);
    } finally {
      setLoading(false);
    }
  };

  // Poll for new uploads every 5 seconds
  useEffect(() => {
    generateQRCode();
    fetchLatestFile();
    const interval = setInterval(fetchLatestFile, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle click to print
  const handlePrintClick = () => {
    if (latestFile) {
      navigate(`/print?file=${encodeURIComponent(latestFile.pdf)}&title=${encodeURIComponent(latestFile.title)}`);
    }
  };

  // Render
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1500px] mx-auto text-center">
        <Navbar />
        <div className="flex items-center justify-center mt-16 px-12 relative">
          <div className="mr-16">
            <div className="w-80 h-80 bg-white rounded-lg shadow-lg p-6">
              <div className="text-center text-[32px] font-semibold mb-4">
                Print<span className="text-yellow-500">X</span>press
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-4">
                  Scan QR Code to Upload
                </div>
                {qrCodeDataUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={qrCodeDataUrl} 
                      alt="QR Code for mobile upload" 
                      className="w-48 h-48 border-2 border-gray-200 rounded-lg"
                    />
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Scan with your phone</p>
                      <p>to upload PDF files</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>or visit:</p>
                      <p className="font-mono text-blue-600 break-all">{MOBILE_UPLOAD_URL}</p>
                    </div>
                    <button
                      onClick={generateQRCode}
                      className="mt-3 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Refresh QR Code
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-2xl font-semibold mt-2 text-center">Scan & Upload Your File</div>
          </div>
          {/* Right panel: Latest uploaded file as clickable PDF icon */}
          <div className="border rounded-lg w-[900px] h-[500px] bg-white relative flex flex-col items-center justify-center p-8">
            {loading ? (
              <div className="text-lg text-gray-500">Loading latest uploaded file...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : latestFile ? (
              <div className="flex flex-col items-center cursor-pointer group" onClick={handlePrintClick} title="Click to print this PDF">
                <img
                  src={pdfIcon}
                  alt="PDF Icon"
                  className="w-32 h-32 mb-4 group-hover:scale-105 transition-transform"
                />
                <div className="text-lg font-medium mb-2 group-hover:underline text-blue-700">
                  {latestFile.title}
                </div>
                <div className="text-xs text-gray-400">Click to print</div>
              </div>
            ) : (
              <div className="text-gray-500">No PDF uploaded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
