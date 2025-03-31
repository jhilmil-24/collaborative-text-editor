require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Set up express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.io with the server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (you can restrict this for production)
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Import and use document routes
const docRoutes = require("./routes/docRoutes");
app.use("/api/docs", docRoutes);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document ${documentId}`);
  });

  socket.on("send-changes", ({ documentId, content }) => {
    socket.to(documentId).emit("receive-changes", content);
    console.log(`Changes sent to document ${documentId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
