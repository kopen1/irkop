'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SiteHeaderProps {
  variant?: 'default' | 'app' | 'admin';
}

export default function SiteHeader({ variant = 'default' }: SiteHeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        IRKOP
      </Link>
      <nav>
        {variant === 'default' ? (
          <>
            <Link href="/#alur">How it works</Link>
            <Link href="/register" className="btn">
              Create account
            </Link>
            <Link href="/login" className="btn btn-secondary">
              Sign in
            </Link>
          </>
        ) : variant === 'admin' ? (
          <>
            <Link href="/admin" style={{ textDecoration: isActive('/admin') ? 'underline' : 'none' }}>
              Dashboard
            </Link>
            <Link href="/admin/users" style={{ textDecoration: isActive('/admin/users') ? 'underline' : 'none' }}>
              Users
            </Link>
            <Link href="/admin/settings" style={{ textDecoration: isActive('/admin/settings') ? 'underline' : 'none' }}>
              Settings
            </Link>
            <Link href="/admin/activity" style={{ textDecoration: isActive('/admin/activity') ? 'underline' : 'none' }}>
              Activity
            </Link>
            <a href="#" onClick={() => alert('Sign out')} style={{ cursor: 'pointer' }}>
              Sign out
            </a>
          </>
        ) : (
          <>
            <Link href="/app" style={{ textDecoration: isActive('/app') ? 'underline' : 'none' }}>
              Dashboard
            </Link>
            <Link href="/app/profile" style={{ textDecoration: isActive('/app/profile') ? 'underline' : 'none' }}>
              Profile
            </Link>
            <Link href="/app/settings" style={{ textDecoration: isActive('/app/settings') ? 'underline' : 'none' }}>
              Settings
            </Link>
            <a href="#" onClick={() => alert('Sign out')} style={{ cursor: 'pointer' }}>
              Sign out
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
