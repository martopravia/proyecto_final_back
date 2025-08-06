const { DataTypes } = require("sequelize");
const { BaseModel } = require("./BaseModel");

class OrderDetails extends BaseModel {
  static initModel(sequelize) {
    OrderDetails.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
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
