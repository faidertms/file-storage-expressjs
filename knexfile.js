module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./storage/database/dev.sqlite3",
    },
    migrations: {
      directory: "./server/database/migrations/",
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./storage/database/dev.sqlite3",
    },
    migrations: {
      directory: "./server/database/migrations/",
    },
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: "./storage/database/staging.sqlite3",
    },
    migrations: {
      directory: "./build/database/migrations/",
    },
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./storage/database/prod.sqlite3"
    },
    migrations: {
      directory: "./build/database/migrations/",
    },
  },

};
