const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://meusite.com']; // ajuste conforme necessário
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
};

module.exports = cors(corsOptions);
