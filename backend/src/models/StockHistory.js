const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StockHistory = sequelize.define('StockHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('IN', 'OUT', 'ORDER', 'CANCEL'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
    },
    previousStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    newStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    performedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'stock_histories',
    timestamps: true,
});

module.exports = StockHistory;