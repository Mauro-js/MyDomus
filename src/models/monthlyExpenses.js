"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MonthlyExpenses extends Model {
    static associate(models) {
      // define association here
    }
  }
  MonthlyExpenses.init(
    {
      lastPayment: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      paranoid: false,
      underscored: true,
      modelName: "MonthlyExpenses",
      tableName: "monthly_expenses",
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );
  return MonthlyExpenses;
};
