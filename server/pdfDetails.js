
// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);
// Export the model
mongoose.model("PdfDetails", PdfDetailsSchema);