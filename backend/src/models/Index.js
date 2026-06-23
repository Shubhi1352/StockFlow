const User = require('./User');
const Product = require('./Product');

User.hasMany(Product, { foreignKey: 'createdBy' });
Product.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = { User, Product };