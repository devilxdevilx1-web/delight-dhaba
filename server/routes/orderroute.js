const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

// CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        const {
            customerName,
            phone,
            orderType,
            address,
            items,
            totalAmount
        } = req.body;

        const newOrder = new Order({
            customerName,
            phone,
            orderType,
            address,
            items,
            totalAmount,
            orderStatus: "pending"
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


// UPDATE ORDER STATUS
router.put("/update/:id", async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus: status },
            { new: true }
        );

        res.json(updatedOrder);
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;