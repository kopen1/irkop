import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
export default function KonterPage() {
  return (
    <><SiteHeader />
      <main id="main" className="container">
        <section className="hero">
          <h1>Konter</h1>
          <p>The first IRKOP tool. Coming soon.</p>
          <p><Link href="/register" className="btn">Get notified</Link>{' '}
             <Link href="/" className="btn btn-secondary">Back to IRKOP</Link></p>
        </section>
      </main><SiteFooter />
    </>
  );
}
