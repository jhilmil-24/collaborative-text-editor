// backend/models/Document.js
const mongoose = require("mongoose");

// Document Schema
const documentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,  // Content must be provided
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Default value is the current date
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt automatically
);

// Create the Document model
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
