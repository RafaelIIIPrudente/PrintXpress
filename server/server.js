
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


// Start the server on port 3000
app.listen(3000), () => {
  console.log('Server is running on port 3000');
};

// Define a route
app.get('/', (req, res) => {
  const jsonData = {
    message: 'Hello World'
  };
  res.json(jsonData);
});

// Define a route
app.get('/upload', (req, res) => {
  res.send('Upload a file');
});


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

// Define a GET route
app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

// Endpoint to handle printing requests
app.post('/print-pdf', async (req, res) => {
  try {
    const { pdfFilePath, options } = req.body;

    // Validate required inputs
    if (!pdfFilePath) {
      return res.status(400).json({ error: 'PDF file path is required.' });
    }

    // Print the PDF file with specified options
    await print(pdfFilePath, options);

    res.json({ message: 'PDF printed successfully.' });
  } catch (error) {
    console.error('Error printing PDF:', error);
    res.status(500).json({ error: 'Failed to print PDF.' });
  }
});


// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server Started");
});



