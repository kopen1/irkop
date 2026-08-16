import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container">
        <section className="hero">
          <p className="eyebrow">Standalone Platform</p>
          <h1>
            The IRKOP<br />
            <span style={{ fontStyle: 'italic', color: 'var(--stamp)' }}>ecosystem</span> starts here.
          </h1>
          <p>
            IRKOP is a standalone web platform and the entry point to a growing family of independent tools. Build, ship, and scale with confidence.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/register" className="btn">
              Create account
            </Link>
            <Link href="/login" className="btn btn-secondary">
              Sign in
            </Link>
          </div>
        </section>

        <section className="card" style={{ marginTop: '3rem' }}>
          <h2 style={{ marginTop: 0 }}>What is IRKOP?</h2>
          <p className="muted">
            IRKOP is not a single product — it is the platform that hosts them. Each tool is independent, but they all speak the same language through a unified authentication and account system.
          </p>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>Available Tools</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3 style={{ marginTop: 0 }}>Konter</h3>
              <p className="muted">Digital cash book for retail counter operations. Track transactions, manage cashier sessions, and view daily reports.</p>
              <Link href="/konter" className="btn" style={{ marginTop: '0.5rem' }}>
                View Konter →
              </Link>
            </article>
            <article className="card">
              <p className="eyebrow">Coming Soon</p>
              <h3 style={{ marginTop: 0 }}>More Tools</h3>
              <p className="muted">New IRKOP tools are in development. Subscribe to updates to be notified when they launch.</p>
            </article>
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2 id="alur">How It Works</h2>
          <div className="grid grid-2" style={{ marginTop: '1.5rem' }}>
            <article className="card">
              <p className="eyebrow">01</p>
              <h3>Create Your Account</h3>
              <p className="muted">Sign up with your email and password. No credit card required.</p>
            </article>
            <article className="card">
              <p className="eyebrow">02</p>
              <h3>Choose a Tool</h3>
              <p className="muted">Access any IRKOP tool from your dashboard. Each tool is built for a specific workflow.</p>
            </article>
            <article className="card">
              <p className="eyebrow">03</p>
              <h3>Unified Dashboard</h3>
              <p className="muted">Manage all tools from one place. Your data, your privacy, your control.</p>
            </article>
            <article className="card">
              <p className="eyebrow">04</p>
              <h3>Scale Up</h3>
              <p className="muted">As your business grows, add new tools without switching platforms.</p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
