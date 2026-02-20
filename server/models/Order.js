const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: Number,
            unique: true
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

        items: [orderItemSchema],

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

// Auto increment order number
orderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastOrder = await mongoose
            .model("Order")
            .findOne()
            .sort({ orderNumber: -1 });

        this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);