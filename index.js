import { createApp } from './server/app.js';

const app = createApp({ production: process.env.NODE_ENV === 'production' });

export default app;
