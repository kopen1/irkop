import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function ToolsPage() {
  return (<><SiteHeader variant="app" />
    <main id="main" className="container">
      <h1>Discover IRKOP tools</h1>
      <div className="grid grid-2">
        <article className="card"><h3 style={{marginTop:0}}>Konter</h3>
        <p className="muted">Coming soon.</p><span className="tag">coming soon</span></article>
      </div>
    </main><SiteFooter /></>);
}
