import { useState, ChangeEvent, FormEvent} from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import backgroundImage from "../../assets/bg.png";
import sample from "../../assets/sample-pdf.png";
import { Link } from "react-router-dom";
import pdfPNG from "../../assets/pdf.png";
import Navbar from "../components/HomeNavbar";

// Worker to parse PDFs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

// Interface for PDF data
interface PdfData {
  title: string;
  pdf: string;
}

// Main component
function Upload(): JSX.Element {
  // State to store title
  const [title] = useState<string>("Test");
  // State to store file
  const [file, setFile] = useState<File | string>("");

  const [uploadedFiles, setUploadedFiles] = useState<PdfData[] | null>(null); // State to store the list of uploaded files

  const [fileName, setFileName] = useState("");

  // const [serialData, setSerialData] = useState<number>(0);

  // useEffect(() => {
  //   const fetchSerialData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/get-serial-data');
  //       setSerialData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching serial data:', error);
  //     }
  //   };

  //   fetchSerialData();

  //   // Clean up event listeners when component unmounts
  //   return () => {
  //     // You might need to implement a cleanup mechanism here
  //   };
  // }, []);


  // Fetch PDFs from server
  const getPdf = async (): Promise<void> => {
    try {
      // Send GET request to server
      const response = await axios.get<{ data: PdfData[] }>(
        "http://localhost:5000/get-all-files"
      );
      setUploadedFiles(response.data.data);
      console.log("Uploaded Files:", uploadedFiles);

      // Set the selected PDF to the first uploaded PDF, if available
      if (response.data.data && response.data.data.length > 0) {
        const pageNumber = response.data.data.length;
        const selected = response.data.data[pageNumber - 1].pdf;

        setFileName(selected.replace(/^\d+-\d+/, ''));
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };


  // Upload PDF to server
  const uploadFile = async (e: FormEvent): Promise<void> => {
    // Prevent default form submission
    e.preventDefault();
    // Create form data
    const formData = new FormData();
    // Append title and file to form data
    formData.append("title", title);
    // Check if file is a string
    if (typeof file !== "string") {
      formData.append("file", file);
    }

    // Send POST request to server
    try {
      const result = await axios.post(
        "http://localhost:5000/upload-files",
        formData,
        {
          // Set content type to multipart form data
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      // Check if upload was successful
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!");
        // Fetch PDFs
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }



  // // Show PDF in PDF viewer
  // const showPdf = (pdf: string): void => {
  //   setPdfFile(`http://localhost:5000/files/${pdf}`);
  // };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // Check if file is selected
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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
        {/* <div>
          <h1>Serial Data:</h1>
          <p>{serialData}</p>
        </div> */}
        <div className="flex items-center justify-center mt-16 px-12 relative">
          <div className="mr-16">
            <div className="w-80 h-80 bg-white">
              <div className="text-center text-[40px] font-semibold">
                Print<span className="text-yellow-500">X</span>press
              </div>
              <div>

                <form className="space-y-4" onSubmit={uploadFile}>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-input mt-1 block w-full border-gray-300 rounded-md py-2 px-3 text-base leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent justify-center text-center"
                      placeholder="Enter title"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div> */}
                  <div className=" mt-8">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload PDF
                    </label>
                    <input
                      type="file"
                      className="form-input mt-1 block w-full border rounded-md py-2 px-3 text-base leading-6"
                      accept="application/pdf"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

            </div>
            <div className="text-2xl font-semibold mt-2"> Upload Your File Here </div>
          </div>


          <div className="border rounded-lg w-[900px] h-[500px] bg-white relative">
            <img
              src={pdfPNG}
              alt="pdf"
              className="absolute top-0 right-0 -mt-10 mr-4 w-20 h-20"
            />
            {/* //sample pdf lang para ma link pero diri ang pdf dapat nga uploaded*/}
            <Link to="/print">
              <img src={sample} alt="pdf" className="w-28 h-28 px-4 py-4" />
              <p className="w-28 h-28 px-4">{fileName}</p>

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
