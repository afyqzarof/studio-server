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

const migrations = {
  directory: path.join(__dirname, "/migrations"),
};

const seeds = {
  directory: path.join(__dirname, "/seeds"),
};

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "../../database/dev.sqlite3"),
    },
    migrations,
    seeds,
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "../../database/test.sqlite3"),
    },
    migrations,
    seeds,
    useNullAsDefault: true,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "../../database/production.sqlite3"),
    },
    migrations,
    seeds,
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
    migrations,
    seeds,
    useNullAsDefault: true,
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
    migrations,
    seeds,
    useNullAsDefault: true,
  },
};
