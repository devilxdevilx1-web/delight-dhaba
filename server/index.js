const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Serve Static Files */
app.use(express.static(__dirname));

/* Routes */
app.use("/api/auth", require("./routes/authroute"));
app.use("/api/orders", require("./routes/orderroute"));
app.use("/api/admin", require("./routes/adminroute"));

/* Root route */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html");
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));