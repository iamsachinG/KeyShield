import { useMemo, useRef, useState } from 'react';
import { Activity, ArrowRight, Check, CheckCircle2, CircleHelp, Eye, EyeOff, Fingerprint, KeyRound, LockKeyhole, RotateCcw, ShieldCheck, ShieldHalf, Sparkles, X } from 'lucide-react';
import { analyzePassword } from './utils/analyzePassword.js';

const levelClass = (label) => label.toLowerCase().replaceAll(' ', '-');

function Brand() {
  return <a className="brand" href="#top" aria-label="Password Security Analyzer home"><span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.1} /></span><span>Password<span className="brand-light">Security</span><small>ANALYZER</small></span></a>;
}

function PrivacyCard() {
  return <aside className="privacy-card"><div className="privacy-icon"><LockKeyhole size={18} /></div><div><strong>Your password stays yours</strong><p>Analysis happens right here in your browser. Nothing is sent to a server or saved.</p></div><span className="privacy-pill"><span /> LOCAL ONLY</span></aside>;
}

function Meter({ result }) {
  const level = result.label ? levelClass(result.label) : 'empty';
  return <div className={`meter-wrap ${level}`} aria-label={result.label ? `Estimated strength: ${result.label}` : 'Strength meter empty'}>
    <div className="meter-top"><div><span className="eyebrow">ESTIMATED STRENGTH</span><div className="strength-name">{result.label || 'Waiting for input'}</div></div><span className={`strength-chip ${level}`}>{result.label ? `${result.score}/100` : <><Activity size={13} /> READY</>}</span></div>
    <div className="meter-track" role="progressbar" aria-label="Estimated password strength" aria-valuemin="0" aria-valuemax="100" aria-valuenow={result.score}><span style={{ width: `${result.score}%` }} /></div>
    <div className="meter-scale"><span>VERY WEAK</span><span>WEAK</span><span>FAIR</span><span>STRONG</span><span>VERY STRONG</span></div>
  </div>;
}

function App() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);
  const inputRef = useRef(null);
  const result = useMemo(() => analyzePassword(password), [password]);

  function analyze(event) {
    event?.preventDefault();
    if (!password) {
      setError('Enter a password first to see your analysis.');
      setAnalyzed(false);
      inputRef.current?.focus();
      return;
    }
    setError('');
    setAnalyzed(true);
    window.requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: true }));
  }

  function clear() {
    setPassword('');
    setVisible(false);
    setAnalyzed(false);
    setError('');
    inputRef.current?.focus();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && analyzed) {
      setAnalyzed(false);
      setError('');
    }
  }

  return <div id="top" className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar"><Brand /><div className="topbar-right"><span className="top-status"><span className="status-dot" /> ALL SYSTEMS PRIVATE</span><a className="about-link" href="#how-it-works">How it works <ArrowRight size={14} /></a></div></header>

    <main className="main-content">
      <div className="hero-copy"><div className="hero-kicker"><span><Sparkles size={13} /> A smarter way to check</span></div><h1>Make your next<br /><span>password a strong one.</span></h1><p>Get a thoughtful strength estimate and practical tips. Your password never leaves this device.</p></div>

      <section className="analyzer-card" aria-labelledby="analyzer-title">
        <div className="card-heading"><div className="card-icon"><Fingerprint size={20} /></div><div><h2 id="analyzer-title">Password checkup</h2><p>Enter a password to see how it holds up.</p></div><span className="encrypted-tag"><LockKeyhole size={12} /> PRIVATE SESSION</span></div>

        <form onSubmit={analyze} noValidate>
          <label htmlFor="password" className="input-label">YOUR PASSWORD</label>
          <div className={`password-field ${error ? 'has-error' : ''}`}><KeyRound className="input-key" size={17} aria-hidden="true" /><input ref={inputRef} id="password" name="password" type={visible ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} onKeyDown={handleKeyDown} placeholder="Type or paste a password" autoComplete="new-password" spellCheck="false" aria-describedby="privacy-note input-hint" aria-invalid={Boolean(error)} /><button className="icon-button reveal-button" type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
          {error ? <p className="field-error" role="alert"><CircleHelp size={14} />{error}</p> : <p id="input-hint" className="input-hint">Press <kbd>Enter ↵</kbd> to analyze instantly</p>}
          <div className="action-row"><button className="analyze-button" type="submit"><ShieldHalf size={17} /> Analyze password <span className="button-enter">↵</span></button><button className="clear-button" type="button" onClick={clear} disabled={!password && !analyzed}><RotateCcw size={15} /> Clear</button></div>
        </form>

        <div className="card-divider" />
        <Meter result={result} />

        <section className="checks-section" aria-labelledby="checks-title"><div className="section-heading"><div><h3 id="checks-title">Security checklist</h3><p>Small improvements add up.</p></div><span className="check-count">{password ? `${result.checks.filter((check) => check.passed).length} / ${result.checks.length} checks` : 'AS YOU TYPE'}</span></div><ul className="check-grid">{result.checks.map((check) => <li className={`check-item ${password ? (check.passed ? 'passed' : 'needs-work') : 'idle'}`} key={check.id}><span className="check-icon">{password && check.passed ? <Check size={13} /> : password ? <X size={12} /> : <span className="check-empty" />}</span><span>{check.label}</span></li>)}</ul></section>

        {analyzed && <section ref={resultRef} tabIndex={-1} className="result-section" aria-labelledby="result-title" aria-live="polite"><div className="result-title-row"><div className="result-title-icon"><CheckCircle2 size={17} /></div><div><h3 id="result-title">Your analysis is ready</h3><p>This is an estimate, not a guarantee against compromise.</p></div></div><ul className="recommendations">{result.recommendations.map((tip) => <li key={tip}><span className="tip-arrow">↗</span>{tip}</li>)}</ul></section>}
        {!analyzed && password && <p className="live-note"><Activity size={14} /> Your checklist and estimate update as you type.</p>}
      </section>

      <PrivacyCard />
      <section id="how-it-works" className="how-section"><div className="how-title"><span className="eyebrow">BUILT FOR PRIVACY</span><h2>Simple check. No data trail.</h2></div><div className="how-grid"><div className="how-item"><span className="how-number">01</span><div><h3>Runs on this device</h3><p>The strength check happens locally in your browser.</p></div></div><div className="how-item"><span className="how-number">02</span><div><h3>Nothing gets saved</h3><p>No database, cookies, storage, analytics, or password logs.</p></div></div><div className="how-item"><span className="how-number">03</span><div><h3>Useful, honest guidance</h3><p>Recommendations help you build longer, less predictable passphrases.</p></div></div></div></section>
      <div className="estimate-note"><CircleHelp size={14} /><span>Strength estimates use simple on-device heuristics. They do not check breach databases or guarantee account security.</span></div>
    </main>
    <footer className="footer"><span>© 2026 Password Security Analyzer</span><span><ShieldCheck size={14} /> WSC EDUCATIONAL PROJECT</span></footer>
  </div>;
}

export default App;
