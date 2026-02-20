const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        const { customerName, phone, orderType, address, items } = req.body;

        if (!customerName || !phone || !orderType || !items || !items.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const newOrder = new Order({
            customerName,
            phone,
            orderType,
            address,
            items,
            totalAmount
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            orderNumber: newOrder.orderNumber
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET ALL ORDERS (Admin)
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE ORDER STATUS
router.put("/status/:id", async (req, res) => {
    try {
        const { status } = req.body;

        await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: status
        });

        res.json({ message: "Order status updated" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;