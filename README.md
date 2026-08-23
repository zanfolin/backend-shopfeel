# Shopfeel API

API compartilhada pelo painel web administrativo e pelo aplicativo mobile de usuários comuns.

## Requisitos

- Node.js 24+
- SQLite embutido via `better-sqlite3`

## Configuração

Copie `.env.example` para `.env` e defina `JWT_SECRET` e `ADMIN_PASSWORD`.

## Comandos

```bash
npm install
npm run db:migrate
npm run db:seed
npm test
npm run dev
```

## Insomnia

Importe o arquivo `shopfeel.insomnia.json` pelo menu de importação do Insomnia. No ambiente `Base Environment`, ajuste `base_url`, `admin_password`, `token`, `admin_token` e `photo_path` conforme necessário.

## Contratos

- Mobile: `/api/auth/*`, `/api/me`, `/api/mobile/*` e favoritos.
- Painel web: `/api/admin/*`, protegido por JWT de usuário `ADMIN`.
- Upload de foto: `POST /api/me/photo` com campo multipart `photo`.
- Visualizar foto: `GET /uploads/<nome-do-arquivo>` usando o caminho retornado pelo upload.
- Imagens aceitas: JPEG, PNG e WebP, com limite configurável por `MAX_FILE_SIZE`.
- `customers.photo` armazena a URL/caminho, não o binário.

Preços são representados em centavos no campo `price_cents`.
