const fs = require('fs');
const path = require('path');

// Cria a pasta de logs se não existir
const logDirectory = path.join(__dirname, '..', '..', 'core', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Cria a stream de escrita no arquivo access.log
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, 'access.log'),
  { flags: 'a' } // 'a' de append, para adicionar sem sobrescrever
);

// Função para formatar mensagens com timestamp
function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
}

// Logger customizado
const logger = {
  info: (msg) => {
    const formatted = formatMessage('info', msg);
    console.log(formatted);
    accessLogStream.write(formatted + '\n');
  },
  warn: (msg) => {
    const formatted = formatMessage('warn', msg);
    console.warn(formatted);
    accessLogStream.write(formatted + '\n');
  },
  error: (msg) => {
    const formatted = formatMessage('error', msg);
    console.error(formatted);
    accessLogStream.write(formatted + '\n');
  },
  // Para uso com morgan
  stream: {
    write: (message) => accessLogStream.write(message),
  },
};

module.exports = logger;
