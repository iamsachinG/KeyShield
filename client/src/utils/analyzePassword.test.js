import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzePassword } from './analyzePassword.js';

test('empty input has no strength success state', () => {
  const result = analyzePassword('');
  assert.equal(result.score, 0);
  assert.equal(result.label, '');
});

test('common passwords are capped and flagged', () => {
  const result = analyzePassword('password');
  assert.equal(result.common, true);
  assert.equal(result.label, 'Very Weak');
});

test('long varied passphrases score above short predictable values', () => {
  assert.ok(analyzePassword('Cedar!Orbit7-Lantern?Meadow').score > analyzePassword('abc123').score);
});
