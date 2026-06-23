const User = require('./User');
const Product = require('./Product');

User.hasMany(Product, { foreignKey: 'createdBy' });
Product.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Product.hasMany(StockHistory, { foreignKey: 'productId' });
StockHistory.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(StockHistory, { foreignKey: 'performedBy' });
StockHistory.belongsTo(User, { foreignKey: 'performedBy', as: 'performer' });

module.exports = { User, Product };