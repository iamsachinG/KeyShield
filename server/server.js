import 'dotenv/config';
import { createApp } from './app.js';

const port = Number.parseInt(process.env.PORT || '4000', 10);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173';
const production = process.env.NODE_ENV === 'production';
const app = createApp({ clientOrigin, production });

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Health API listening on http://127.0.0.1:${port}/api/health`);
});

function shutDown() {
  server.close(() => process.exit(0));
}
process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
