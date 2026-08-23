import 'dotenv/config';
import app from './app.js';
import db from './db/connection.js';
import env from './config/env.js';

await db.migrate.latest();

const server = app.listen(env.port, () => {
  console.log(`Shopfeel API listening on port ${env.port}`);
});

const shutdown = async () => {
  server.close(async () => {
    await db.destroy();
    process.exit(0);
  });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
