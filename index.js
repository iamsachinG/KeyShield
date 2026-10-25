import express from 'express';
import { createApp } from './server/app.js';

const app = express();
app.use(createApp({ production: process.env.NODE_ENV === 'production' }));

export default app;
