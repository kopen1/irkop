'use client';
import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setBusy(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), password: fd.get('password') }),
        credentials: 'same-origin',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'Registration failed.');
        return;
      }
      window.location.href = '/app';
    } catch { setError('Network error.'); } finally { setBusy(false); }
  }
  return (
    <>
      <SiteHeader />
      <main id="main" className="container" style={{maxWidth:460,marginTop:'3rem'}}>
        <h1>Create your IRKOP account</h1>
        <form onSubmit={onSubmit} className="card">
          <div className="form-row"><label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className="input"/></div>
          <div className="form-row"><label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="input"/></div>
          <div className="form-row"><label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="input"/>
            <small className="muted">At least 8 characters.</small></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn" disabled={busy}>{busy?'Creating…':'Create account'}</button>
          <p style={{marginTop:'1rem'}}>Already have an account? <Link href="/login">Sign in</Link></p>
        </form>
      </main><SiteFooter />
    </>
  );
}
