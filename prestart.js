const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'core', 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
  console.log('📁 Pasta core/logs criada com sucesso');
}
