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
      },
      {
        sequelize,
        modelName: "category",
        tableName: "categories",
      },
    );

    return Category;
  }
}

module.exports = Category;
