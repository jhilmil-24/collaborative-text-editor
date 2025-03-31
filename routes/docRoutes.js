// backend/routes/docRoutes.js
const express = require("express");
const Document = require("../models/Document");  // Import the Document model

const router = express.Router();

// Route to create a new document
router.post("/", async (req, res) => {
  try {
    const newDocument = new Document({
      content: "",  // Empty content initially
    });

    const savedDocument = await newDocument.save();  // Save to database
    res.status(201).json(savedDocument);  // Return the saved document
  } catch (err) {
    res.status(500).json({ message: "Error creating document", error: err });
  }
});

// Route to fetch a document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);  // Find by ID
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);  // Return the document data
  } catch (err) {
    res.status(500).json({ message: "Error fetching document", error: err });
  }
});

// Route to update a document's content
router.patch("/:id", async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },  // Update the content
      { new: true }  // Return the updated document
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(updatedDocument);  // Return the updated document
  } catch (err) {
    res.status(500).json({ message: "Error updating document", error: err });
  }
});

module.exports = router;
