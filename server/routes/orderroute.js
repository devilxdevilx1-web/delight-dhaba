router.post("/create", async (req, res) => {
    try {
        console.log("Incoming Order:", req.body);

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
        console.error("ORDER ERROR:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});