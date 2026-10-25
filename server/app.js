import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

export function createApp({ clientOrigin = 'http://127.0.0.1:5173', production = false } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: clientOrigin, methods: ['GET'], optionsSuccessStatus: 204 }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-8', legacyHeaders: false }));

  // The API intentionally has no body parser: it accepts no password or user payload.
  app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', service: 'password-security-analyzer-api' }));
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));
  app.use((error, _req, res, _next) => {
    if (!production) console.error('Request failed:', error?.message || 'unknown error');
    return res.status(500).json({ error: 'Internal server error' });
  });
  return app;
}
