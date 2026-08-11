import Link from 'next/link';
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <p>© {year} IRKOP · Standalone platform · Not affiliated with Irkop Cell.</p>
        <p><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></p>
      </div>
    </footer>
  );
}
