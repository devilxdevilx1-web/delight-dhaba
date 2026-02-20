const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/orders", require("./routes/orderroute"));

// Test route
app.get("/", (req, res) => {
    res.send("Delight Dhaba Backend Running");
});

// Mongo connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));

// IMPORTANT: Use Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});