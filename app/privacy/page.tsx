import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function PrivacyPage() {
  return (
    <><SiteHeader />
      <main id="main" className="container" style={{maxWidth:760}}>
        <h1>Privacy policy</h1>
        <p>IRKOP collects only the data needed to operate the platform: account email, name, hashed password, and security/audit event metadata.</p>
        <h2>Data we store</h2>
        <ul><li>Account: email, name, role, status</li><li>Sessions: hashed token + expiry</li><li>Audit logs of security events</li></ul>
      </main><SiteFooter />
    </>
  );
}
