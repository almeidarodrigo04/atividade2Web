# Poções & Soluções

Loja online de Annabelle Merigold — Beco da Última Saída, desde 1867.

## Estrutura do Projeto

```
project/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Login + geração de JWT
│   │   └── potionController.js    # CRUD de poções
│   ├── middleware/
│   │   └── authMiddleware.js      # Verificação de JWT nas rotas protegidas
│   ├── models/
│   │   └── database.js            # Sequelize + SQLite em memória + seed
│   ├── routes/
│   │   ├── authRoutes.js          # POST /api/auth/login
│   │   └── potionRoutes.js        # GET/POST/DELETE /api/potions
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Entry point Express
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AdminPotionRow.jsx  # Linha da tabela de admin com botão remover
    │   │   └── PotionCard.jsx      # Card de poção para a vitrine
    │   ├── context/
    │   │   └── AuthContext.jsx     # Context de autenticação (token JWT)
    │   ├── guards/
    │   │   └── AuthGuard.jsx       # Redireciona para /login se não autenticado
    │   ├── pages/
    │   │   ├── Admin.jsx           # Painel admin: cadastro e listagem/remoção
    │   │   ├── Home.jsx            # Loja: hero, sobre, histórico, poções, rodapé
    │   │   └── Login.jsx           # Página de login (só senha)
    │   ├── App.jsx                 # Roteamento principal
    │   ├── index.css               # Estilos globais (tema escuro apotecário)
    │   └── main.jsx                # Entry point React
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Configuração e Execução

### Backend

```bash
cd backend
npm install
cp .env.example .env   # edite ADMIN_PASSWORD e JWT_SECRET conforme desejado
npm run dev            # inicia com node --watch na porta 3001
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # ajuste VITE_API_URL se necessário
npm run dev            # inicia Vite na porta 5173
```

Acesse `http://localhost:5174`.

## Variáveis de Ambiente

### Backend (`.env`)

| Variável         | Descrição                        | Padrão                     |
|------------------|----------------------------------|----------------------------|
| `PORT`           | Porta do servidor Express        | `3001`                     |
| `ADMIN_PASSWORD` | Senha da área administrativa     | `merigold1867`             |
| `JWT_SECRET`     | Segredo para assinar os tokens   | `arcane-apothecary-secret` |

### Frontend (`.env`)

| Variável        | Descrição              | Padrão                       |
|-----------------|------------------------|------------------------------|
| `VITE_API_URL`  | URL base da API        | `http://localhost:3001/api`  |

## API

| Método | Rota                  | Autenticação | Descrição               |
|--------|-----------------------|--------------|-------------------------|
| GET    | `/api/potions`        | ✗            | Lista todas as poções   |
| POST   | `/api/potions`        | ✓ JWT        | Cadastra nova poção     |
| DELETE | `/api/potions/:id`    | ✓ JWT        | Remove poção por ID     |
| POST   | `/api/auth/login`     | ✗            | Autentica e retorna JWT |

O token deve ser enviado no header: `Authorization: Bearer <token>`
