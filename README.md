****# Shopfeel API

API compartilhada pelo painel web administrativo e pelo aplicativo mobile de usuários comuns.

## **Requisitos**

- Node.js 24+
- SQLite embutido via `better-sqlite3`
- Insomnia, para testar os endpoints da API

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de exemplo para `.env`:

   ```powershell
   Copy-Item ".env copy.example" .env
   ```

3. Abra o arquivo `.env` e atualize, obrigatoriamente, os atributos abaixo:

   ```env
   JWT_SECRET=defina-um-segredo-longo-e-aleatorio
   ADMIN_PASSWORD=defina-a-senha-do-administrador
   ```

   `ADMIN_PASSWORD` é a senha usada pelo seed para criar o administrador
   `admin@admin.com`. Altere esse valor antes de executar `npm run db:seed`.

   A senha do administrador existente não é alterada automaticamente quando o
   `.env` é modificado. Para aplicar uma nova senha em uma instalação local ainda
   não inicializada, remova `data/shopfeel.sqlite` e execute novamente as migrações
   e o seed. Não remova o banco se ele contiver dados que precisam ser preservados.

## Comandos

```bash
npm run db:migrate
npm run db:seed
npm test
npm run dev
```

Com a API em execução, ela estará disponível em `http://localhost:3000`.

## Insomnia

1. Abra o Insomnia e importe o arquivo `shopfeel.insomnia.json` pelo menu
   **Import**.
2. Selecione o ambiente **Base Environment** e configure `base_url` como
   `http://localhost:3000`.
3. Execute **Health check** para confirmar que a API está disponível.
4. Para testar como usuário comum, execute **Cadastrar usuário** e depois
   **Login - usuário mobile**. O token retornado pode ser usado na variável
   `token` para os endpoints autenticados.
5. Para testar como administrador, execute **Login - administrador** usando o
   e-mail `admin@admin.com` e a senha definida em `ADMIN_PASSWORD`. Copie o JWT
   retornado para `admin_token` ou use o token sugerido automaticamente pela
   requisição.
6. Use as pastas **Mobile - Usuário comum**, **Perfil e Favoritos** e
   os endpoints administrativos para executar as demais requisições. Para o
   upload de foto, selecione um arquivo JPEG, PNG ou WebP no campo multipart e
   ajuste `photo_path` quando necessário.

Se o Insomnia não preencher os tokens automaticamente, abra **Base Environment**
e atualize manualmente `token` e `admin_token` com o valor retornado no campo
`token` da resposta de login.

## Contratos

- Mobile: `/api/auth/*`, `/api/me`, `/api/mobile/*` e favoritos.
- Painel web: `/api/admin/*`, protegido por JWT de usuário `ADMIN`.
- Upload de foto: `POST /api/me/photo` com campo multipart `photo`.
- Visualizar foto: `GET /uploads/<nome-do-arquivo>` usando o caminho retornado pelo upload.
- Imagens aceitas: JPEG, PNG e WebP, com limite configurável por `MAX_FILE_SIZE`.
- `customers.photo` armazena a URL/caminho, não o binário.

Preços são representados em centavos no campo `price_cents`.
