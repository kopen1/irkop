import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
const TOOLS = [{ slug:'konter', name:'Konter', description:'The first IRKOP tool (coming soon).', status:'coming_soon' }];
export default function ToolHubPage() {
  return (
    <><SiteHeader variant="app" />
      <main id="main" className="container">
        <h1>Your IRKOP account</h1>
        <p className="muted">Manage your profile, sessions, and discover IRKOP tools.</p>
        <section style={{marginTop:'2rem'}}>
          <h2>Tools</h2>
          <div className="grid grid-2">
            {TOOLS.map(t => (
              <article key={t.slug} className="card">
                <h3 style={{marginTop:0}}>{t.name}</h3>
                <p className="muted">{t.description}</p>
                <span className="tag">{t.status.replace('_',' ')}</span>
              </article>
            ))}
          </div>
        </section>
        <section style={{marginTop:'2rem'}}><h2>Quick links</h2>
          <ul>
            <li><Link href="/app/profile">Profile</Link></li>
            <li><Link href="/app/settings">Settings</Link></li>
            <li><Link href="/app/sessions">Active sessions</Link></li>
            <li><Link href="/app/activity">Activity</Link></li>
          </ul></section>
      </main><SiteFooter />
    </>
  );
}
