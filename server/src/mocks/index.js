import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from '../db.js';
import authRoutes from '../routes/auth.js';
import issuesRoutes from '../routes/issues.js';
import officialsRoutes from '../routes/officials.js';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  // Allow Vite dev server; in production set CLIENT_ORIGIN to your domain
  origin: process.env.CLIENT_ORIGIN ?? 'http://localhost',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// ── Routes — all under /api/v1 to match VITE_API_BASE_URL ─────────────────
app.use('/api/v1/auth',      authRoutes);
app.use('/api/v1/issues',    issuesRoutes);
app.use('/api/v1/officials', officialsRoutes);

// ── Health ─────────────────────────────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date().toISOString() });
});

// ── Start ──────────────────────────────────────────────────────────────────
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`[server] Running at http://localhost:${PORT}/api/v1`);
  });
});