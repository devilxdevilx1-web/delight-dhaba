const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: Number,
            default: Date.now  // Simple safe unique number
        },

        customerName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        orderType: {
            type: String,
            enum: ["pickup", "delivery"],
            required: true
        },

        address: String,

        items: {
            type: [orderItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true
        },

        orderStatus: {
            type: String,
            enum: ["pending", "preparing", "ready", "completed", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);