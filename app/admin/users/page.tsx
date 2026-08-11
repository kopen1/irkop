import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function AdminUsersPage() {
  return (<><SiteHeader variant="admin" />
    <main id="main" className="container">
      <h1>Users</h1>
      <div className="card"><p>Loaded client-side from <code>/api/admin/users</code>.</p></div>
    </main><SiteFooter /></>);
}
