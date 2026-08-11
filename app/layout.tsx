import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IRKOP — Standalone Platform',
  description: 'IRKOP is a standalone web platform and product ecosystem.',
  metadataBase: new URL('https://irkop.pages.dev'),
  openGraph: {
    title: 'IRKOP — Standalone Platform',
    description: 'Standalone IRKOP web platform and product ecosystem.',
    url: 'https://irkop.pages.dev', siteName: 'IRKOP', type: 'website',
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, themeColor: '#0f172a',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
