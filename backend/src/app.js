const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products', stockRoutes);

app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;