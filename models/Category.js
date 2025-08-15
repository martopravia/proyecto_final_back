const { DataTypes } = require("sequelize");
const { BaseModel } = require("./BaseModel");

class Category extends BaseModel {
  static initModel(sequelize) {
    Category.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        alias: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "category",
        tableName: "categories",
      },
    );

    return Category;
  }
  toJSON() {
    const attributes = { ...this.get() };
    attributes.image = `${process.env.BASE_URL_IMAGE}${attributes.image}`;
    return attributes;
  }
}

module.exports = Category;
