const { Order, OrderDetails, Product, User } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const { limit, skip, userId } = req.query;

      const where = {};
      if (userId) {
        where.userId = userId;
      }

      const orders = await Order.findAll({
        where,
        limit: limit ? parseInt(limit) : 20,
        offset: skip ? parseInt(skip) : 0,
        include: [OrderDetails, { model: User, attributes: ["id", "name", "email"] }],
      });
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async show(req, res) {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [OrderDetails, { model: User, attributes: ["id", "name", "email"] }],
      });
      if (!order) return res.status(404).json({ error: "Order not found" });

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async store(req, res) {
    const { userId, products, shippingAddress, paymentMethod, totalAmount } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }
    try {
      const order = await Order.create({
        userId,
        shippingAddress,
        paymentMethod,
        totalAmount,
        status: "pending",
      });

      const orderDetails = products.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: product.price,
      }));

      await OrderDetails.bulkCreate(orderDetails);

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req, res) {
    const { status } = req.body;
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });

      order.status = status || order.status;
      await order.save();

      res.json(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async destroy(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });

      await OrderDetails.destroy({ where: { orderId: order.id } });
      await order.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
