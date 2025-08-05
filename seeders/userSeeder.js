const faker = require("@faker-js/faker").fakerES;
const { Product, User, Order, OrderDetails } = require("../models");
const bcrypt = require("bcrypt");

module.exports = async () => {
  await User.create({
    firstname: "Admin",
    lastname: "Test",
    email: "admin@test.com",
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    password: await bcrypt.hash("admin", 10),
    role: "admin",
  });
  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash("1234", 10);
    let user;
    if (i === 0) {
      user = await User.create({
        firstname: "User",
        lastname: "Test",
        email: "user@test.com",
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        password: await bcrypt.hash("user", 10),
        role: "user",
      });
    } else {
      user = await User.create({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        password: hashedPassword,
        role: "user",
      });
    }

    const numberOfOrders = faker.number.int({ min: 1, max: 3 });

    for (let j = 0; j < numberOfOrders; j++) {
      const order = await Order.create({
        userId: user.id,
        status: "pending",
        totalAmount: 0,
      });

      const products = await Product.findAll();
      const numberOfProducts = faker.number.int({ min: 1, max: 5 });
      let total = 0;

      for (let k = 0; k < numberOfProducts; k++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = faker.number.int({ min: 1, max: 3 });

        await OrderDetails.create({
          orderId: order.id,
          productId: product.id,
          quantity,
          unitPrice: product.price,
        });

        total += product.price * quantity; // ✅ calcular total
      }

      order.totalAmount = total;
      await order.save();
    }

    console.log("[Database] Usuario generado con órdenes y detalles.");
  }

  console.log("[Database] Se corrió el seeder completo.");
};
