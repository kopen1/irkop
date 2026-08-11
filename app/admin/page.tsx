import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function AdminOverviewPage() {
  return (<><SiteHeader variant="admin" />
    <main id="main" className="container">
      <h1>Admin dashboard</h1>
      <p className="muted">Server-side RBAC-checked: this page must never be reachable by a non-admin.</p>
      <section className="grid grid-3">
        <article className="card"><h3 style={{marginTop:0}}>Users</h3><p><a href="/admin/users" className="btn btn-secondary">Open</a></p></article>
        <article className="card"><h3 style={{marginTop:0}}>Activity</h3><p><a href="/admin/activity" className="btn btn-secondary">Open</a></p></article>
        <article className="card"><h3 style={{marginTop:0}}>Settings</h3><p><a href="/admin/settings" className="btn btn-secondary">Open</a></p></article>
      </section>
    </main><SiteFooter /></>);
}
