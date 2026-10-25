const commonPasswords = new Set([
  'password', 'password1', '123456', '123456789', '12345678', 'qwerty', 'qwerty123',
  'letmein', 'welcome', 'admin', 'iloveyou', 'abc123', 'monkey', 'dragon', 'passw0rd',
]);
const sequences = ['abcdefghijklmnopqrstuvwxyz', '0123456789', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function hasSequence(value) {
  const normalized = value.toLowerCase();
  return sequences.some((sequence) => {
    for (let i = 0; i <= sequence.length - 4; i += 1) {
      const run = sequence.slice(i, i + 4);
      if (normalized.includes(run) || normalized.includes([...run].reverse().join(''))) return true;
    }
    return false;
  });
}

export function analyzePassword(password) {
  const value = typeof password === 'string' ? password : '';
  const repeated = value.length >= 4 && /(.)\1{3,}/u.test(value);
  const common = commonPasswords.has(value.toLowerCase());
  const sequence = hasSequence(value);
  const checks = [
    { id: 'length', label: 'At least 12 characters', passed: [...value].length >= 12 },
    { id: 'uppercase', label: 'Uppercase letter', passed: /[A-Z]/u.test(value) },
    { id: 'lowercase', label: 'Lowercase letter', passed: /[a-z]/u.test(value) },
    { id: 'number', label: 'Number', passed: /\d/u.test(value) },
    { id: 'symbol', label: 'Special character', passed: /[^\p{L}\p{N}\s]/u.test(value) },
    { id: 'unique', label: 'Avoids repeated characters', passed: !repeated },
    { id: 'pattern', label: 'Avoids common sequences', passed: !sequence },
    { id: 'common', label: 'Not a common password', passed: !common },
  ];

  if (!value) return { score: 0, label: '', checks, recommendations: ['Enter a password to see a private, on-device estimate.'], common, predictable: false };

  // This is an educational heuristic, not an entropy or breach database calculation.
  const length = [...value].length;
  let score = Math.min(48, Math.round((length / 20) * 48));
  score += [/[a-z]/u, /[A-Z]/u, /\d/u, /[^\p{L}\p{N}\s]/u].filter((pattern) => pattern.test(value)).length * 7;
  if (length >= 16) score += 12;
  if (length >= 20) score += 8;
  if (common) score = Math.min(score, 8);
  if (sequence) score -= 18;
  if (repeated) score -= 18;
  if (/(19|20)\d{2}|(?:password|qwerty|admin)/iu.test(value)) score -= 12;
  score = Math.max(0, Math.min(100, score));

  let label = 'Very Weak';
  if (score >= 82) label = 'Very Strong';
  else if (score >= 64) label = 'Strong';
  else if (score >= 42) label = 'Fair';
  else if (score >= 20) label = 'Weak';

  const recommendations = [];
  if (length < 16) recommendations.push('Try a longer passphrase; 16 or more characters is a useful target.');
  if (common || sequence) recommendations.push('Avoid familiar words, keyboard walks, and predictable sequences.');
  if (repeated) recommendations.push('Use varied characters instead of long repeated runs.');
  if (!/[A-Z]/u.test(value) || !/[a-z]/u.test(value)) recommendations.push('Mix letter cases, or use several unrelated words.');
  if (!/\d/u.test(value) && !/[^\p{L}\p{N}\s]/u.test(value)) recommendations.push('Add variety if it helps you create a unique phrase.');
  if (!recommendations.length) recommendations.push('Good structure. Keep this password unique to one account and use a password manager.');

  return { score, label, checks, recommendations, common, predictable: sequence || repeated || /(19|20)\d{2}/u.test(value) };
}
