const { DataSource } = require("typeorm");

const dataSource = new DataSource({
  type: 'postgres', // Database type (e.g., mysql, postgresql, sqlite)
  host: process.env.DB_HOST, // Database host
  port: 5432, // Database port
  username: process.env.DB_USERNAME, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  synchronize: false, // Set to true to automatically create database tables (useful in development)
  migrationsRun: true, // Set to true to run migrations automatically (useful in production)
  migrations: ['./migrations/*.js']
})

module.exports = { dataSource }
