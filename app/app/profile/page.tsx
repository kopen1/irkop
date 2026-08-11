import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function ProfilePage() {
  return (<><SiteHeader variant="app" />
    <main id="main" className="container" style={{maxWidth:720}}>
      <h1>Profile</h1>
      <div className="card"><p>Loaded client-side from <code>/api/user/profile</code>.</p></div>
    </main><SiteFooter /></>);
}
