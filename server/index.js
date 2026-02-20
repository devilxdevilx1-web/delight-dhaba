const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Serve static files from server folder
app.use(express.static(path.join(__dirname)));

app.use("/api/orders", require("./routes/orderroute"));

app.get("/", (req, res) => {
    res.send("Delight Dhaba Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});