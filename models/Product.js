const { DataTypes } = require("sequelize");
const { BaseModel } = require("./BaseModel");

class Product extends BaseModel {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        featured: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        sequelize,
        modelName: "product",
        tableName: "products",
      },
    );

    return Product;
  }
  toJSON() {
    const attributes = { ...this.get() };
    attributes.image = `${process.env.BASE_URL_IMAGE}${attributes.image}`;
    return attributes;
  }
}

module.exports = Product;
