// mysql_explorer/db.js
// ESM module to create a MySQL connection pool using mysql2 and .env values
// Usage: import { getPool, testConnection } from './db.js'

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import process from 'node:process';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Resolve .env in questionnaire-app/.env relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  // Fallback to default .env loading (if any)
  dotenv.config();
}

function required(name, value) {
  if (!value) {
    throw new Error(`Missing required env var ${name}. Please set it in questionnaire-app/.env`);
  }
  return value;
}

// Do NOT throw at module load time when env is missing; defer validation to connection time.
const config = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // Optional extra connection options via MYSQL_QUERY (e.g., charset=utf8mb4&ssl=false)
  // We'll parse simple key=value pairs joined by & and apply a few known ones.
};

function parseExtraOptions(query) {
  if (!query) return {};
  return query.split('&').reduce((acc, pair) => {
    const [k, v] = pair.split('=');
    if (!k) return acc;
    const key = k.trim();
    const val = (v ?? '').trim();
    switch (key) {
      case 'charset':
        acc.charset = val; break;
      case 'ssl':
        // allow 'true'/'false'
        acc.ssl = val === 'true' ? {} : false; break;
      case 'connectTimeout':
        acc.connectTimeout = Number(val); break;
      case 'timezone':
        acc.timezone = val; break;
      default:
        // Attach unknown options under "flags" for mysql2 where applicable
        acc[key] = val;
    }
    return acc;
  }, {});
}

const extra = parseExtraOptions(process.env.MYSQL_QUERY || '');

let pool;

function ensureConfig() {
  // Validate required env vars at connection time rather than module load.
  required('MYSQL_HOST', config.host);
  required('MYSQL_DB', config.database);
  required('MYSQL_USER', config.user);
  required('MYSQL_PASSWORD', config.password);
}

export function getPool() {
  if (!pool) {
    ensureConfig();
    pool = mysql.createPool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...extra,
    });
  }
  return pool;
}

export async function testConnection() {
  const p = getPool();
  const [rows] = await p.query('SELECT 1 AS ok');
  return rows?.[0]?.ok === 1;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

export const dbName = config.database;
