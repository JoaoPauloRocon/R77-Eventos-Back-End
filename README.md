# R77 Eventos – API

API RESTful para gerenciamento de eventos, usuários e avaliações.

## 🔧 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize + MySQL
- JWT (Autenticação)
- Joi (Validação)
- Swagger (Documentação)
- Multer (Upload de imagens)
- Jest + Supertest (Testes automatizados)

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/r77-eventos.git
   cd r77-eventos
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o `.env`**
   ```bash
   cp .env.example .env
   ```

4. **Execute as migrations**
   ```bash
   npx sequelize db:migrate
   ```

5. **Rode o projeto**
   ```bash
   npm start
   ```

---

## 🔐 Autenticação

Autenticação via token JWT. Para acessar rotas protegidas, inclua no header da requisição:

```http
Authorization: Bearer seu_token_aqui
```

---

## 🧪 Rodando os Testes

```bash
npm test
```

---

## 📁 Estrutura do Projeto

```
application/
  config/            # Configurações gerais (ex: Swagger)
  dtos/              # DTOs com validações Joi
  enums/             # Enums e constantes
  exception/         # Classes de exceções
  security/          # Lógica de autenticação/segurança

core/
  controller/        # Controllers das rotas
  entity/            # Models do Sequelize
  repository/        # Repositórios
  service/           # Regras de negócio
  utils/             # Helpers e funções utilitárias
  validations/       # Middlewares de validação

db/
  migration/         # Migrations do Sequelize
  seeders/           # Dados iniciais

middlewares/         # Middlewares globais
resources/           # Arquivos estáticos (imagens, etc)
routes/              # Definições de rotas

app.js               # Inicialização da aplicação
server.js            # Inicialização do servidor
```

---

## 📄 Principais Endpoints

### 🧑 Usuários

| Método | Rota            | Descrição                                 |
|--------|------------------|-------------------------------------------|
| POST   | `/auth/register` | Cria um novo usuário                      |
| POST   | `/auth/login`    | Autentica o usuário e retorna um token    |
| GET    | `/users/me`      | Dados do usuário autenticado              |
| PUT    | `/users/:id`     | Atualiza dados (self ou admin)           |
| DELETE | `/users/:id`     | Deleta conta (self ou admin)             |
| GET    | `/users`         | Lista todos os usuários (admin)          |

---

### 🎉 Eventos

| Método | Rota            | Descrição                                 |
|--------|------------------|-------------------------------------------|
| GET    | `/events`        | Lista eventos com paginação e busca       |
| POST   | `/events`        | Cria um novo evento (autenticado)         |
| GET    | `/events/:id`    | Detalhes de um evento                     |
| PUT    | `/events/:id`    | Atualiza evento (criador/admin)          |
| DELETE | `/events/:id`    | Deleta evento (criador/admin)            |

---

### 🖼️ Imagens de Eventos

| Método | Rota                         | Descrição                      |
|--------|-------------------------------|--------------------------------|
| POST   | `/events/:id/images`          | Adiciona imagens ao evento     |
| DELETE | `/events/:id/images/:imageId` | Deleta uma imagem do evento    |

---

### ⭐ Avaliações

| Método | Rota                   | Descrição                           |
|--------|-------------------------|-------------------------------------|
| POST   | `/events/:id/ratings`   | Avalia um evento (nota + comentário)|
| GET    | `/events/:id/ratings`   | Lista avaliações de um evento       |

---

## 📌 Notas

- Todas as rotas de eventos, imagens e avaliações exigem autenticação com JWT.
- Apenas o criador do evento ou um admin pode editar ou deletar o evento.
- Um usuário só pode avaliar um evento uma vez.

---

## 📬 Contato

Em caso de dúvidas ou sugestões: **contato@r77eventos.com.br**