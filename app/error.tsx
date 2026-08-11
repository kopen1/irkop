'use client';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (<><SiteHeader />
    <main id="main" className="container" style={{textAlign:'center',padding:'4rem 1rem'}}>
      <h1>Something went wrong</h1>
      <button className="btn" onClick={() => reset()}>Try again</button>
    </main><SiteFooter /></>);
}
