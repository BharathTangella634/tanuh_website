// scripts/fetch_questionnaire.js
// Fetches questions and answers from MySQL and writes a condensed JSON into src/assets/questionnaire.json
// Runs automatically before `npm run dev` and `npm run build` (wired via package.json pre-scripts).
// You can also run manually: npm run fetch:questionnaire

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const OUTPUT_FILE = path.resolve(ASSETS_DIR, 'questionnaire.json');

async function fetchRows(pool) {
  // Pull questions ordered by question_number (if present); fallback to question_id order.
  const [questions] = await pool.query(
    `SELECT q.question_id, q.question, q.question_number
     FROM question q
     ORDER BY COALESCE(q.question_number, 9999999), q.question_id`
  );

  const [answers] = await pool.query(
    `SELECT a.question_id, a.answer, a.answer_order
     FROM answer a
     ORDER BY COALESCE(a.answer_order, 9999999), a.answer`
  );

  return { questions, answers };
}

function buildCondensedJson(questions, answers) {
  // Map answers by question_id
  const answersByQ = new Map();
  for (const a of answers) {
    if (!answersByQ.has(a.question_id)) answersByQ.set(a.question_id, []);
    // Ensure plain string for answer text; default to empty if null
    const text = (a.answer ?? '').toString().trim();
    if (text) answersByQ.get(a.question_id).push(text);
  }

  // Build object of the form:
  // { "Q1": { "question": "...", "answers": ["Answer1", "Answer2", ...] }, ... }
  // If question_number is null, use incremental index based on iteration.
  const out = {};
  let fallbackIndex = 1;
  for (const q of questions) {
    const qNum = q.question_number ?? fallbackIndex++;
    const key = `Q${qNum}`;
    const qText = (q.question ?? '').toString().trim();
    const ans = answersByQ.get(q.question_id) || [];
    out[key] = {
      question: qText,
      answers: ans,
    };
  }
  return out;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function writeJson(file, data) {
  const json = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(file, json, 'utf8');
}

async function main() {
  let closePool;
  try {
    // Dynamically import DB module so we can gracefully skip when env vars are missing at build time.
    let db;
    try {
      db = await import('../mysql_explorer/db.js');
    } catch (e) {
      const msg = e?.message || String(e);
      if (/Missing required env var/.test(msg)) {
        console.log('[fetch_questionnaire] Required DB env vars are missing. Skipping fetch and keeping existing questionnaire.json.');
        return; // Do not fail the build when DB env is not provided.
      }
      throw e;
    }

    const { getPool, testConnection } = db;
    closePool = db.closePool;

    try {
      console.log('[fetch_questionnaire] Testing DB connection...');
      const ok = await testConnection();
      if (!ok) throw new Error('DB connection failed. Check questionnaire-app/.env');

      console.log('[fetch_questionnaire] Fetching questions and answers...');
      const pool = getPool();
      const { questions, answers } = await fetchRows(pool);
      console.log(`[fetch_questionnaire] Questions: ${questions.length}, Answers: ${answers.length}`);

      console.log('[fetch_questionnaire] Building condensed JSON...');
      const data = buildCondensedJson(questions, answers);

      console.log(`[fetch_questionnaire] Ensuring assets directory: ${ASSETS_DIR}`);
      await ensureDir(ASSETS_DIR);

      console.log(`[fetch_questionnaire] Writing output JSON: ${OUTPUT_FILE}`);
      await writeJson(OUTPUT_FILE, data);

      console.log('[fetch_questionnaire] Done.');
    } catch (e) {
      const msg = e?.message || String(e);
      if (/Missing required env var/.test(msg)) {
        console.log('[fetch_questionnaire] Required DB env vars are missing. Skipping fetch and keeping existing questionnaire.json.');
        return; // Skip without failing build.
      }
      throw e; // Let outer catch handle other errors.
    }
  } catch (err) {
    console.error('[fetch_questionnaire] Error:', err?.message || err);
    process.exitCode = 1;
  } finally {
    if (typeof closePool === 'function') {
      await closePool().catch(() => {});
    }
  }
}

main();
