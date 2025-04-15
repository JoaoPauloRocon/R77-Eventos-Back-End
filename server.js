// server.js
const app = require('./app');
const dotenv = require('dotenv');
const sequelize = require('./application/config/database');
require('./core/entity/associations');


dotenv.config();

const PORT = process.env.PORT || 3000;



sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL com Sequelize!'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
