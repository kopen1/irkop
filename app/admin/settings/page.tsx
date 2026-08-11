import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function AdminSettingsPage() {
  return (<><SiteHeader variant="admin" />
    <main id="main" className="container" style={{maxWidth:720}}>
      <h1>Settings</h1>
      <div className="card"><p>Loaded client-side from <code>/api/admin/settings</code>.</p></div>
    </main><SiteFooter /></>);
}
