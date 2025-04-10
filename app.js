// app.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimitMiddleware');
const cors = require('./middlewares/corsConfig');


const app = express();

// Middlewares básicos
app.use(cors);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.send('R77 Eventos rodando 🔥');
});

module.exports = app;
