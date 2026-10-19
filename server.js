const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'data.json');

function readData(){
  try{ const raw = fs.readFileSync(DATA_FILE, 'utf8'); return JSON.parse(raw||'{}'); } catch(e){ return {}; }
}
function writeData(obj){
  try{ fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8'); return true; } catch(e){ return false; }
}

app.get('/api/overrides', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/overrides', (req, res) => {
  const payload = req.body || {};
  const ok = writeData(payload);
  if(!ok) return res.status(500).json({error:'write failed'});
  res.json({status:'ok'});
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

module.exports = app;
