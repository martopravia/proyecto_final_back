const { Order, OrderDetails, Product, User } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          OrderDetails,
          {
            model: User,
            as: "user",
            attributes: ["id", "firstname", "lastname", "email", "role"],
          },
        ],
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
        include: [
          OrderDetails,
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });
      if (!order) return res.status(404).json({ error: "Order not found" });

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async store(req, res) {
    const { products, shippingAddress, paymentMethod } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }
    try {
      const userId = req.user.id || req.user.sub;
      const productIds = products.map((product) => product.id);
      const dbProducts = await Product.findAll({
        where: { id: productIds },
      });

      if (dbProducts.length !== products.length) {
        return res.status(400).json({ error: "Some products not found" });
      }

      const orderDetailsData = products.map((item) => {
        const dbProduct = dbProducts.find((p) => p.id === item.id);
        return {
          productId: dbProduct.id,
          quantity: item.quantity,
          unitPrice: dbProduct.price,
          productName: dbProduct.name,
        };
      });

      const totalAmount = orderDetailsData.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0,
      );

      const order = await Order.create({
        userId,
        shippingAddress,
        paymentMethod,
        totalAmount,
        status: "pending",
      });

      const orderDetails = orderDetailsData.map((product) => ({
        ...detail,
        orderId: order.id,
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
  async getByUser(req, res) {
    try {
      const { userId } = req.params;

      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: OrderDetails,
            include: [Product],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
