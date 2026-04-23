# VoteX — India Election Assistant

VoteX is an India election assistant web app targeting first-time voters, designed to remove anxiety from the voting process.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- `npm`

### Installation
1. Clone this repository or use the directory directly.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and add your keys:
   - `ANTHROPIC_API_KEY`: Required for the Chat Assistant. (No `VITE_` prefix, it is only used server-side).
   - `PORT`: Server port (default: 3001).
   - `CORS_ORIGIN`: Allowed origins (default: `http://localhost:5173` for dev).

### Development Mode
You need to run both the Vite frontend and the Express backend simultaneously.

**Terminal 1 (Vite Frontend):**
```bash
npm run dev
```

**Terminal 2 (Express Backend):**
```bash
node server.js
```

### Production Setup (Self-Hosted)
1. **Build the frontend:**
   ```bash
   npm run build
   ```
   This compiles the React app into the `dist/` folder.

2. **Run in production:**
   ```bash
   node server.js
   ```
   The `server.js` script will automatically serve the static `dist/` assets in addition to running the `/api/chat` proxy. It will handle unmatched application routes locally.

3. **Deploying (e.g. pm2):**
   It's recommended to use a process manager like PM2:
   ```bash
   pm2 start server.js --name votex
   ```

### Updating Data
- **Election Dates:** To update the target election dates and phases, modify `src/config.js`.
- **Translations:** For the MVP, `src/translations/` contain English defaults with placeholders. To add real language translations (Hindi, Tamil, Bengali, etc.), map keys in these files for their respective locales.
