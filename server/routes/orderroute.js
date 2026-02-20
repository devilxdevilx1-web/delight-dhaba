const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
    try {
        console.log("Incoming Order:", req.body);

        const { customerName, phone, orderType, address, items } = req.body;

        // Validation
        if (!customerName || !phone || !orderType || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Calculate total safely
        const totalAmount = items.reduce((sum, item) => {
            if (!item.price || !item.quantity) return sum;
            return sum + item.price * item.quantity;
        }, 0);

        const newOrder = new Order({
            customerName,
            phone,
            orderType,
            address: orderType === "delivery" ? address : "",
            items,
            totalAmount
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            orderNumber: newOrder.orderNumber
        });

    } catch (error) {
        console.error("ORDER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;