import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function SettingsPage() {
  return (<><SiteHeader variant="app" />
    <main id="main" className="container" style={{maxWidth:720}}>
      <h1>Settings</h1>
      <div className="card"><h2>Change password</h2><p className="muted">V1 UI placeholder.</p></div>
    </main><SiteFooter /></>);
}
