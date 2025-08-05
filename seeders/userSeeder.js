/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 * En este ejemplo se están insertando 100 usuarios con nombres ficticios.
 */

// const faker = require("@faker-js/faker").fakerES;
// const { User, Order, OrderDetails } = require("../models");
// const bcrypt = require("bcrypt");
// const products = require("../completeProducts.json");
// const Order = require("../models/Order");

// module.exports = async () => {
//   const users = [];

//   for (let i = 0; i < 20; i++) {
//     const hashedPassword = await bcrypt.hash("1234", 10);
//     const user = await User.create({
//       firstname: faker.person.firstName(),
//       lastname: faker.person.lastName(),
//       email: faker.internet.email(),
//       address: faker.location.address(),
//       phone: faker.phone.number(),
//       password: hashedPassword,
//       role: "user",
//     });

//     const numberOfOrders = faker.number.int({ min: 1, max: 3 });

//     for (let j = 0; j < numberOfOrders; j++) {
//       const order = await Order.create({
//         userId: user.id,
//         status: "pending",
//         total: 0
//       });

//       const numberOfProducts = faker.number.int({ min: 1, max: 5 });

//       for (let k = 0; k < numberOfProducts; k++) {
//         await OrderDetails.create({
//           orderId: order.id,
//           productId: products[k].id,
//           quantity: faker.number.int({ min: 1, max: 3 }),
//           price: products[k].price
//         });
//       }
//       order.total = await OrderDetails.sum('price', { where: { orderId: order.id } });
//       await order.save();
//     }

//   await User.bulkCreate(users);
//   console.log("[Database] Se corrió el seeder de Users.");
// };
