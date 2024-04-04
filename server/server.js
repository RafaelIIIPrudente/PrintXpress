console.log('SERVER IS UP');
// Code to start the server
const express = require('express');

// Import the body-parser module
const multer = require('multer');

const cors = require('cors');

// Create an express app
const app = express();
app.use(cors());



// Import the mongodb module
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rafaeliiiprudente21:lEPRm2XpwHwAMZbu@printxpress.kcgn68w.mongodb.net/?retryWrites=true&w=majority&appName=printXpress";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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

app.get('/about', (req, res) => {
  res.send('About Us');
});

