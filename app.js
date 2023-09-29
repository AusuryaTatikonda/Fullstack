const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// Serve HTML file (same as before)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle file upload (same as before)
app.post("/upload", upload.single("picture"), (req, res) => {
    if (!req.file) {
        console.error("No file uploaded.");
        return res.status(400).json({ message: "No file uploaded." });
    }

    // Process the uploaded file as needed.

    return res.json({ message: "File uploaded successfully." });
});

// Error handling middleware (same as before)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "An error occurred on the server." });
});

// Start the server (same as before)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
