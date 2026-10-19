const fs = require('fs');
const path = require('path');

// In Vercel serverless environment, /tmp is the writable storage directory
const TMP_DATA_FILE = path.join('/tmp', 'data.json');
const LOCAL_DATA_FILE = path.join(process.cwd(), 'data.json');

function readData() {
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf8');
      return JSON.parse(raw || '{}');
    }
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf8');
      return JSON.parse(raw || '{}');
    }
    return {};
  } catch (e) {
    return {};
  }
}

function writeData(obj) {
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const data = readData();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch (e) { payload = {}; }
    }
    payload = payload || {};
    const ok = writeData(payload);
    if (!ok) {
      return res.status(500).json({ error: 'write failed' });
    }
    return res.status(200).json({ status: 'ok' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
