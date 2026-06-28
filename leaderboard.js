const { loadDB } = require('./_db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const db = await loadDB();
  const entries = Object.entries(db.keys).filter(e => e[1].used).map(([k, d]) => ({ key: k, ...d }));
  entries.sort((a, b) => (b.balance || 0) - (a.balance || 0));
  res.json(entries.slice(0, 50));
};
