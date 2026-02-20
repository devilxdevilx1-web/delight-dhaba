const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ADD THIS LINE
app.use(express.static(__dirname));

app.use("/api/orders", require("./routes/orderroute"));

app.get("/", (req, res) => {
    res.send("Delight Dhaba Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));