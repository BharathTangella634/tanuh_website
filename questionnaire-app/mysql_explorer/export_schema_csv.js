// mysql_explorer/export_schema_csv.js
// Script to export all tables and columns for the configured database to a CSV file.
// Run: npm run schema:export

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPool, closePool, dbName, testConnection } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.resolve(__dirname, 'schema_export.csv');

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

async function fetchSchema() {
  const pool = getPool();
  const sql = `
    SELECT 
      c.TABLE_SCHEMA AS schema_name,
      c.TABLE_NAME AS table_name,
      t.TABLE_TYPE AS table_type,
      c.ORDINAL_POSITION AS column_position,
      c.COLUMN_NAME AS column_name,
      c.DATA_TYPE AS data_type,
      c.COLUMN_TYPE AS column_type,
      c.IS_NULLABLE AS is_nullable,
      c.COLUMN_DEFAULT AS column_default,
      c.EXTRA AS extra,
      c.COLUMN_KEY AS column_key,
      c.CHARACTER_MAXIMUM_LENGTH AS char_max_length,
      c.NUMERIC_PRECISION AS numeric_precision,
      c.NUMERIC_SCALE AS numeric_scale,
      c.COLUMN_COMMENT AS column_comment
    FROM INFORMATION_SCHEMA.COLUMNS c
    JOIN INFORMATION_SCHEMA.TABLES t 
      ON t.TABLE_SCHEMA = c.TABLE_SCHEMA AND t.TABLE_NAME = c.TABLE_NAME
    WHERE c.TABLE_SCHEMA = ?
    ORDER BY c.TABLE_NAME, c.ORDINAL_POSITION
  `;
  const [rows] = await pool.query(sql, [dbName]);
  return rows;
}

async function main() {
  console.log(`[mysql_explorer] Testing connection to database: ${dbName}`);
  const ok = await testConnection();
  if (!ok) {
    throw new Error('Database connection test failed. Please verify .env settings.');
  }
  console.log('[mysql_explorer] Connected. Fetching schema info...');
  const rows = await fetchSchema();
  console.log(`[mysql_explorer] Retrieved ${rows.length} column rows. Writing CSV...`);

  const headers = [
    'schema_name','table_name','table_type','column_position','column_name','data_type','column_type','is_nullable','column_default','extra','column_key','char_max_length','numeric_precision','numeric_scale','column_comment'
  ];

  const out = fs.createWriteStream(OUTPUT_FILE, { encoding: 'utf8' });
  out.write(headers.join(',') + '\n');
  for (const r of rows) {
    const line = headers.map(h => csvEscape(r[h])).join(',');
    out.write(line + '\n');
  }
  out.end();
  await new Promise(res => out.on('finish', res));
  console.log(`[mysql_explorer] CSV written to: ${OUTPUT_FILE}`);
}

main()
  .catch(err => {
    console.error('[mysql_explorer] Error:', err?.message || err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool().catch(() => {});
  });
