import { createApp } from '../server/app.js';

const app = createApp({ production: process.env.NODE_ENV === 'production' });

export default function handler(req, res) {
  const requestUrl = new URL(req.url || '/', 'https://vercel.invalid');
  const routePath = requestUrl.searchParams.get('__vercel_path');

  if (routePath === null) return app(req, res);

  requestUrl.searchParams.delete('__vercel_path');
  const query = requestUrl.searchParams.toString();
  req.url = `/api/${routePath}${query ? `?${query}` : ''}`;
  return app(req, res);
}
