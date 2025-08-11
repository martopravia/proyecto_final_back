const { DataTypes } = require("sequelize");
const { BaseModel } = require("./BaseModel");

class User extends BaseModel {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM("admin", "user"),
          defaultValue: "user",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        favorites: {
          type: DataTypes.JSON,
          defaultValue: [],
        },
      },
      {
        sequelize,
        modelName: "user",
        scopes: {
          withAll: {},
        },
        defaultScope: {
          attributes: { exclude: ["password"] },
        },
      },
    );

    User.beforeCreate(User.encryptPassword);

    User.beforeUpdate(User.encryptPassword);

    User.beforeBulkCreate(User.encryptPassword);

    return User;
  }

  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}

module.exports = User;
