import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container">
        <section className="hero">
          <h1>The IRKOP ecosystem starts here.</h1>
          <p>IRKOP is a standalone web platform and the entry point to a growing family of independent tools.</p>
          <p>
            <Link href="/register" className="btn">Create account</Link>{' '}
            <Link href="/login" className="btn btn-secondary">Sign in</Link>
          </p>
        </section>
        <section className="card" style={{marginTop:'2rem'}}>
          <h2>What is IRKOP?</h2>
          <p className="muted">IRKOP is not a single product — it is the platform that hosts them.</p>
        </section>
        <section style={{marginTop:'2rem'}}>
          <h2>Tools</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3 style={{marginTop:0}}>Konter</h3>
              <p className="muted">The first IRKOP tool. Coming soon.</p>
              <p><Link href="/konter" className="btn">View Konter</Link></p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
