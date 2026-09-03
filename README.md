# MMCOE Dean Campus Tracker — Backend + Role UI

This workspace now includes a minimal Node.js backend and updates to `index3.html` to support:

- Role-based login (Academic Dean, Principal, Administrator).
- A global room search input available to all roles.
- Server-backed persistence for schedule overrides with localStorage fallback.
- Polling to pick up changes made by other clients (every 5s).

Files added:
- `server.js` — Express server exposing `GET /api/overrides` and `POST /api/overrides`.
- `data.json` — storage file used by the server.
- `package.json` — to install dependencies and run the server.
- `index3.html` — updated in-place with login, search and server sync logic.

Run the server (Node.js required):

```bash
cd "MMCOE Dean Campus Tracker"
npm install
npm start
```

Then open `index3.html` in a browser at `http://localhost:3000/index3.html` (you can serve the folder with any static server) or open the file locally — the app will attempt to talk to `http://localhost:3000` and fall back to `localStorage` if the server isn't reachable.

Notes:
- For truly permanent, multi-device/shared persistence, run the `server.js` above on a machine reachable by all clients and ensure the clients load the page from the same origin or that CORS is allowed (server already enables CORS).
- This server is intentionally simple and stores data in `data.json` — for production use, move to a real database and add authentication.
