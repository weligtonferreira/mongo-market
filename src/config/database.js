const { Pool } = require('pg');
const redis = require('redis');
const { MongoClient } = require('mongodb')

const dotenv = require('dotenv');
dotenv.config();

// ==> Conexão com a Base de Dados:

// PostgreSQL

const {
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_NAME
} = process.env;

const pool = new Pool({
  connectionString: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`,
});

pool.on('connect', () => {
  console.log('Base de Dados do Postgresql conectado com sucesso!');
});

// Redis

const {
  REDIS_HOST,
  REDIS_PORT
} = process.env;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

redisClient.on("connect", () => {
  console.log('Base de dados do Redis conectado com sucesso!');
}).on("error", (error) => {
  console.log(error);
});

// MongoDB

const {
  MONGO_HOST,
  MONGO_PORT,
} = process.env;

const mongoClient = new MongoClient(`mongodb://${MONGO_HOST}:${MONGO_PORT}`,
  { useUnifiedTopology: true });

// ==> Exportação das conexões

module.exports = {
  query: (text, params) => pool.query(text, params),
  redisClient,
  mongoClient
};