# 🛡️ Login Social com Passport.js

Projeto de autenticação utilizando **OAuth** com Google e GitHub via **Passport.js**, com controle de **perfis de usuário (ADMIN / USER)**, banco de dados **SQLite** (via Prisma), e interface simples com **EJS**.

## 👥 Alunos

- Túlio Baruk
- Thiago Jorge

---

## 🚀 Funcionalidades

- Login com Google e GitHub
- Dois perfis de usuários:
  - `ADMIN`: pode acessar funcionalidades A e B, além de visualizar a lista de todos os usuários.
  - `USER`: pode acessar funcionalidades B, C e D.
- Usuário `ADMIN` é identificado por **e-mail hardcoded**.
- Sessão com `express-session`
- Interface com EJS
- Armazenamento de usuários com Prisma + SQLite

---

## 🧠 Tecnologias

- Node.js
- Express
- Passport.js (GoogleStrategy & GitHubStrategy)
- Prisma ORM
- SQLite
- EJS (Engine de templates)
- dotenv

---

## ⚙️ Como executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o banco

Crie o banco local com Prisma:

```bash
npx prisma migrate dev --name init
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com suas credenciais do Google e GitHub:

```env
GOOGLE_CLIENT_ID=seu_client_id_google
GOOGLE_CLIENT_SECRET=seu_client_secret_google
GITHUB_CLIENT_ID=seu_client_id_github
GITHUB_CLIENT_SECRET=seu_client_secret_github
```

> 🛠️ Você pode obter essas credenciais nos respectivos painéis de desenvolvedor:
> - Google: https://console.cloud.google.com/
> - GitHub: https://github.com/settings/developers

### 4. Defina o e-mail do admin

No arquivo `userService.ts`, defina o e-mail que será reconhecido como admin:

```ts
const ADMIN_EMAIL = 'seuemail@gmail.com';
```

---

## ▶️ Iniciando o servidor

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testando

1. Acesse a página inicial
2. Clique em "Login com Google" ou "Login com GitHub"
3. Após login:
   - Se o e-mail corresponder ao `ADMIN_EMAIL`, será tratado como admin
   - Caso contrário, será um usuário comum

---