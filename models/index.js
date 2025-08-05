const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

// Requerir todos los modelos:
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");
const OrderDetails = require("./OrderDetails");

// Inicializar todos los modelos:
User.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
OrderDetails.initModel(sequelize);
Category.initModel(sequelize);

/*
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 *
 * Por ejemplo, si un User está relacionado con un Article, establecerlo
 * aquí abajo.
 */

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });
Order.hasMany(OrderDetails, { foreignKey: "orderId" });
OrderDetails.belongsTo(Order, { foreignKey: "orderId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.hasMany(OrderDetails, { foreignKey: "productId" });
OrderDetails.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Product,
};
