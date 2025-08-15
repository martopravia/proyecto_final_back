const { Order, OrderDetails, Product, User } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const { limit, skip, userId } = req.query;

      const orders = await Order.findAll({
        include: [OrderDetails, User],
        limit: limit ? parseInt(limit) : 20,
        offset: skip ? parseInt(skip) : 0,
        where: userId ? { userId } : {},
        order: [["createdAt", "DESC"]],
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
    console.log("Creating order with body:", req.body);
    const { userId, products, shippingAddress, paymentMethod } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }
    try {
      console.log("Authenticated user:", req.auth);
      const authId = req.auth.sub;
      if (authId !== userId) {
        return res
          .status(403)
          .json({ error: "Forbidden: User ID does not match authenticated user" });
      }
      const productIds = products.map((product) => product.productId);
      const dbProducts = await Product.findAll({
        where: { id: productIds },
      });

      for (let item of products) {
        const dbProduct = dbProducts.find((p) => p.id === item.productId);
        if (!dbProduct) {
          return res.status(400).json({ error: `Product ${item.name} not found` });
        }
        if (item.quantity > dbProduct.stock) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for product ${dbProduct.name}` });
        }
      }

      for (let item of products) {
        await Product.decrement("stock", {
          by: item.quantity,
          where: { id: item.productId },
        });
      }

      const orderDetailsData = products.map((item) => {
        const dbProduct = dbProducts.find((p) => p.id === item.productId);
        return {
          productId: dbProduct.id,
          name: dbProduct.name,
          quantity: item.quantity,
          unitPrice: dbProduct.price,
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

      const orderDetails = orderDetailsData.map((detail) => ({
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
    const { id } = req.params;
    try {
      const orderToUpdate = await Order.findByPk(id);
      if (!orderToUpdate) return res.status(404).json({ error: "Order not found" });

      orderToUpdate.status = status || orderToUpdate.status;
      await orderToUpdate.save();

      res.json(orderToUpdate);
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
