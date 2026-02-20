const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { items, total } = req.body;

        const order = new Order({
            userId: req.user.id,
            items,
            total,
        });

        await order.save();

        res.json({ message: "Order saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;