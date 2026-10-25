import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';
import { once } from 'node:events';

test('health endpoint responds with status and security headers', async (t) => {
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/health`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, 'ok');
  assert.ok(response.headers.get('content-security-policy'));
});

test('unknown endpoints return JSON 404 without accepting a password route', async (t) => {
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/analyze`, { method: 'POST' });
  assert.equal(response.status, 404);
});
