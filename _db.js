const UPSTASH_URL = process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN;

async function loadDB() {
  if (!UPSTASH_URL) return { keys: {}, chat: [] };
  try {
    const res = await fetch(UPSTASH_URL + '/get/data', {
      headers: { Authorization: 'Bearer ' + UPSTASH_TOKEN }
    });
    const json = await res.json();
    return json.result ? JSON.parse(json.result) : { keys: {}, chat: [] };
  } catch { return { keys: {}, chat: [] }; }
}

async function saveDB(db) {
  if (!UPSTASH_URL) return;
  await fetch(UPSTASH_URL + '/set/data', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + UPSTASH_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(db)
  });
}

module.exports = { loadDB, saveDB };
