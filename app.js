// app.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimitMiddleware');
const cors = require('./middlewares/corsConfig');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundException = require('./application/exception/NotFoundException');


const app = express();

// Middlewares básicos
app.use(cors);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.send('R77 Eventos rodando 🔥');
});

app.use((req, res, next) => {
    next(new NotFoundException('Rota não encontrada'));
});

app.use(errorHandler);

module.exports = app;
