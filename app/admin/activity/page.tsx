import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function AdminActivityPage() {
  return (<><SiteHeader variant="admin" />
    <main id="main" className="container">
      <h1>Audit log</h1>
      <div className="card"><p>Loaded client-side from <code>/api/admin/activity</code>.</p></div>
    </main><SiteFooter /></>);
}
