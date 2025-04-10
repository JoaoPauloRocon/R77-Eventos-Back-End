// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();


// Middlewares básicos
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rotas de autenticação
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('R77 Eventos rodando 🔥');
  });

module.exports = app;
