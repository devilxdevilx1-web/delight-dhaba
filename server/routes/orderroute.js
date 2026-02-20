const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        const { customerName, phone, orderType, address, items } = req.body;

        if (!customerName || !phone || !orderType || !items || !Array.isArray(items)) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const totalAmount = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
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

// GET ALL ORDERS
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("FETCH ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;