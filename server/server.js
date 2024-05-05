
// Code to start the server
const express = require('express');


// Import the body-parser module
const multer = require('multer');

// Import the cors module
const cors = require('cors');

// Create an express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

// Import the mongodb module
const mongoose = require('mongoose');

//  Connection URL
const url = "mongodb+srv://rafaeliiiprudente21:lEPRm2XpwHwAMZbu@printxpress.kcgn68w.mongodb.net/?retryWrites=true&w=majority&appName=printXpress";

// Connect to the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Define a route
app.get('/', (req, res) => {
  const jsonData = {
    message: 'Hello World'
  };
  res.json(jsonData);
});

// // Define a route
// app.get('/upload', (req, res) => {
//   res.send('Upload a file');
// });


// Import the multer module
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + file.originalname);
  }
});

// Create an instance of the multer module
require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

// Define a POST route
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});


//get the latest uploaded PDF file
app.get("/get-files", async (req, res) => {
  try {
    // Find the latest uploaded PDF file
    const latestPdf = await PdfSchema.findOne({}).sort({ $natural: -1 });

    if (latestPdf) {
      res.status(200).json({ data: latestPdf });
    } else {
      res.status(404).json({ error: "No PDF file found" });
    }
  } catch (error) {
    console.error("Error fetching latest uploaded PDF file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//get all the upload files 
app.get("/get-all-files", async (req, res) => {
  try {
    const allFiles = await PdfSchema.find({});
    res.status(200).json({ data: allFiles });
  } catch (error) {
    console.error("Error fetching all uploaded PDF files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// // Define a GET route to get the latest uploaded PDF file
// app.get("/get-latest-pdf", async (req, res) => {
//   try {
//     // Find the latest uploaded PDF file by sorting documents in descending order based on upload date
//     const latestPdf = await PdfSchema.findOne({}, {}, { sort: { 'uploadDate': -1 } });

//     if (latestPdf) {
//       res.status(200).json({ data: latestPdf });
//     } else {
//       res.status(404).json({ error: "No PDF file found" });
//     }
//   } catch (error) {
//     console.error("Error fetching latest uploaded PDF file:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server Started");
});


// Endpoint to handle printing requests
const { print } = require('pdf-to-printer');

app.post('/print-pdf', async (req, res) => {
  try {
    const { pdfFilePath, printer, pages, monochrome, copies, paperSize, scale } = req.body;

    // Validate required inputs
    if (!pdfFilePath) {
      return res.status(400).json({ error: 'PDF file path is required.' });
    }

    // Prepare options object
    const options = {
      printer: printer,
      pages: pages,
      monochrome: monochrome,
      copies: copies, 
      paperSize: paperSize,
      scale: scale
    };

    // Print the PDF file with specified options
    await print(pdfFilePath, options);

    res.json({ message: 'PDF printed successfully.' });
  } catch (error) {
    console.error('Error printing PDF:', error);
    res.status(500).json({ error: 'Failed to print PDF.' });
  }
});

// Endpoint to fetch available printers
const { getPrinters } = require('pdf-to-printer');
app.get('/printers', async (req,res) => {
  try {
    const printers = await getPrinters();
    res.json({ printers });
    console.log("Printers: ", printers);
  } catch (error) {
    console.error('Error fetching printers:', error);
    res.status(500).json({ error: 'Failed to fetch printers.' });
  }
});

//get the default printer
const { getDefaultPrinter } = require('pdf-to-printer');
app.get('/default-printer', async (req,res) => {
  try {
    const defaultPrinter = getDefaultPrinter();
    res.json({ defaultPrinter });
    console.log("Default Printer: ", defaultPrinter);
  } catch (error) {
    console.error('Error fetching default printer:', error);
    res.status(500).json({ error: 'Failed to fetch default printer.' });
  }
});


// Endpoint to print PDF file
app.post('/print-pdfs', async (req, res) => {
    try {
        const { pdfFilePath } = req.body;

        // Validate required inputs
        if (!pdfFilePath) {
            return res.status(400).json({ error: 'PDF file path is required.' });
        }

        // Print the PDF file
        await print(pdfFilePath);
        console.log('PDF printed successfully.');

        res.json({ message: 'PDF printed successfully.' });
    } catch (error) {
        console.error('Error printing PDF:', error);
        res.status(500).json({ error: 'Failed to print PDF.' });
    }
});


const serialport = require('serialport');

// Define the SerialPort class
const SerialPort = serialport.SerialPort
const parsers = serialport.ReadlineParser;
const parser = new parsers();

console.log("SerialPort: ", SerialPort);
const Readline = serialport.ReadlineParser;

// Create a new SerialPort instance with the specified port and settings
const port = new SerialPort({
  path: 'COM1',
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: new Readline("\n")
});

// Event listener for when the serial port is opened
port.on('open', () => {
  console.log('Serial port open');
});

// Event listener for errors
port.on('error', (err) => {
  console.error('Error:', err.message);
});

app.get('/get-serial-data', (req, res) => {
  parser.once('data', (data) => {

    console.log('Data:', data.toString());
    res.json({ message: data.toString() });
  });
});

// Event listener for data received
port.on('data', (data) => {
  console.log('Data:', data.toString());
});





// // Event listener for when the serial port is opened
// port.on('open', () => {
//   console.log('Serial port open');
// });

// port.pipe(new Readline({ delimiter: '\n' }));

// parser.on('data', function(data) {//
//   console.log('Data:', data);
// });



// // Create a new SerialPort instance with the specified port and settings
// const port = new SerialPort('COM5', {
//   baudRate: 9600,
//   dataBits: 8,
//   parity: 'none',
//   stopBits: 1,
//   flowControl: false
// });

// // Event listener for when the serial port is opened
// port.on('open', () => {
//   console.log('Serial port open');
// });

// // Event listener for errors
// port.on('error', (err) => {
//   console.error('Error:', err.message);
// });

// // Event listener for data received
// port.on('data', (data) => {
//   console.log('Data:', data.toString());
// });
