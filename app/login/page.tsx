'use client';
import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setBusy(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
        credentials: 'same-origin',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'Invalid credentials.');
        return;
      }
      window.location.href = '/app';
    } catch { setError('Network error.'); } finally { setBusy(false); }
  }
  return (
    <>
      <SiteHeader />
      <main id="main" className="container" style={{maxWidth:460,marginTop:'3rem'}}>
        <h1>Sign in</h1>
        <form onSubmit={onSubmit} className="card">
          <div className="form-row"><label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="input"/></div>
          <div className="form-row"><label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="input"/></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn" disabled={busy}>{busy?'Signing in…':'Sign in'}</button>
          <p style={{marginTop:'1rem'}}>New here? <Link href="/register">Create an account</Link></p>
        </form>
      </main><SiteFooter />
    </>
  );
}
