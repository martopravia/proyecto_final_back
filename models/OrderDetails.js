const { Model, DataTypes } = require("sequelize");

class OrderDetails extends Model {
  static initModel(sequelize) {
    OrderDetails.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        unitPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "orderDetails",
        tableName: "order_details",
      },
    );

    return OrderDetails;
  }
}

module.exports = OrderDetails;
