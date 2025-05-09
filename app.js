// app.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimitMiddleware');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundException = require('./application/exception/NotFoundException');

const app = express();
const logger = require('./core/utils/logger');
app.use(morgan('combined', { stream: logger.stream }));

app.use(cors({
    origin: 'http://localhost:3001', // libera só pro frontend
    credentials: true
  }));


// Middlewares básicos
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const eventRoutes = require('./routes/eventsRoutes'); // Adicionando as rotas de eventos
app.use('/events', eventRoutes);

const galleryRoutes = require('./routes/galleryRoutes');
app.use('/gallery', galleryRoutes);

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/ratings', ratingRoutes);

const { swaggerUi, swaggerSpec } = require('./application/config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Página inicial
app.get('/', (req, res) => {
    res.send('R77 Eventos rodando 🔥');
});

// Rota para tratar rotas não encontradas
app.use((req, res, next) => {
    next(new NotFoundException('Rota não encontrada'));
});

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
