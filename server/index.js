const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Static files (VERY IMPORTANT) */
app.use(express.static(__dirname));

/* ROUTES */
app.use("/api/orders", require("./routes/orderroute"));
app.use("/api/auth", require("./routes/authroute"));   // 🔥 THIS LINE IS CRITICAL

/* Test Route */
app.get("/", (req, res) => {
    res.send("Delight Dhaba Backend Running");
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));