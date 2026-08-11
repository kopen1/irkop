import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
export default function TermsPage() {
  return (
    <><SiteHeader />
      <main id="main" className="container" style={{maxWidth:760}}>
        <h1>Terms of service</h1>
        <p>By creating an IRKOP account you agree to use the platform lawfully and not to bypass security.</p>
      </main><SiteFooter />
    </>
  );
}
