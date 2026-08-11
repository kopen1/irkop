import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
export default function NotFound() {
  return (<><SiteHeader />
    <main id="main" className="container" style={{textAlign:'center',padding:'4rem 1rem'}}>
      <h1>404 — Page not found</h1>
      <p><Link href="/" className="btn">Back to IRKOP</Link></p>
    </main><SiteFooter /></>);
}
