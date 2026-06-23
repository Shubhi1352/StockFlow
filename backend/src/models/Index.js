const User = require('./User');
const Product = require('./Product');
const StockHistory = require('./StockHistory');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

User.hasMany(Product, { foreignKey: 'createdBy' });
Product.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Product.hasMany(StockHistory, { foreignKey: 'productId' });
StockHistory.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(StockHistory, { foreignKey: 'performedBy' });
StockHistory.belongsTo(User, { foreignKey: 'performedBy', as: 'performer' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Order, OrderItem, StockHistory };