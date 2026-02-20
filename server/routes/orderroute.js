const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        console.log("Incoming Order:", req.body);

        const { customerName, phone, orderType, address, items } = req.body;

        // Basic validation
        if (!customerName || !phone || !orderType) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items must be a non-empty array" });
        }

        // Calculate total safely
        const totalAmount = items.reduce((sum, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);

            if (isNaN(price) || isNaN(quantity)) {
                throw new Error("Invalid price or quantity in items");
            }

            return sum + price * quantity;
        }, 0);

        if (totalAmount <= 0) {
            return res.status(400).json({ message: "Invalid total amount" });
        }

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
        console.error("ORDER ERROR:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// GET ALL ORDERS
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("FETCH ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
});
