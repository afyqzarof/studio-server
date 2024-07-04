import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const {
  DB_HOST: host,
  DB_NAME: database,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_TEST: testDatabase,
} = process.env;

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "/database/dev.sqlite3"),
    },
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "/database/test.sqlite3"),
    },
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "/database/production.sqlite3"),
    },
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
    useNullAsDefault: true,
  },
  development_mysql: {
    client: "mysql2",
    connection: {
      host,
      database,
      user,
      password,
      charset: "utf8",
    },
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
  },
  test_mysql: {
    client: "mysql2",
    connection: {
      host,
      database: testDatabase,
      user,
      password,
      charset: "utf8",
    },
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
  },
};
