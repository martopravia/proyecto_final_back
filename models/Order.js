const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "completed", "cancelled"),
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        modelName: "order",
        tableName: "orders",
      },
    );

    return Order;
  }
}

module.exports = Order;
