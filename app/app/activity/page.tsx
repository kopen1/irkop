import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function ActivityPage() {
  return (<><SiteHeader variant="app" />
    <main id="main" className="container" style={{maxWidth:720}}>
      <h1>Recent activity</h1>
      <div className="card"><p>Loaded client-side from <code>/api/user/activity</code>.</p></div>
    </main><SiteFooter /></>);
}
