import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function SessionsPage() {
  return (<><SiteHeader variant="app" />
    <main id="main" className="container" style={{maxWidth:720}}>
      <h1>Active sessions</h1>
      <div className="card"><p>Loaded client-side from <code>/api/user/sessions</code>.</p></div>
    </main><SiteFooter /></>);
}
