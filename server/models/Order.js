const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
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

        address: {
            type: String
        },

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

// Auto increment order number safely
orderSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            const lastOrder = await mongoose
                .model("Order")
                .findOne()
                .sort({ orderNumber: -1 });

            this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Order", orderSchema);