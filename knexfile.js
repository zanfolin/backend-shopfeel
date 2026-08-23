import 'dotenv/config';

const database = process.env.DATABASE_PATH ?? './data/shopfeel.sqlite';

const base = {
  client: 'better-sqlite3',
  connection: { filename: database },
  useNullAsDefault: true,
  migrations: { directory: './migrations' },
  seeds: { directory: './seeds' },
  pool: {
    afterCreate(connection, callback) {
      connection.pragma('foreign_keys = ON');
      connection.pragma('journal_mode = WAL');
      connection.pragma('busy_timeout = 5000');
      callback(null, connection);
    }
  }
};

export default {
  development: base,
  test: { ...base, connection: { filename: process.env.TEST_DATABASE_PATH ?? ':memory:' } },
  production: base
};
