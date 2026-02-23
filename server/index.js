const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Serve frontend from server folder */
app.use(express.static(path.join(__dirname)));

/* Routes */
app.use("/api/auth", require("./routes/authroute"));
app.use("/api/orders", require("./routes/orderroute"));
app.use("/api/admin", require("./routes/adminroute"));

/* Root route */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "app.html"));
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* Server */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));