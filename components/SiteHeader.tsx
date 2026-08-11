import Link from 'next/link';
export default function SiteHeader({ variant = 'public', userLabel = null }: {
  variant?: 'public'|'app'|'admin'; userLabel?: string|null;
}) {
  return (
    <header className="site-header" role="banner">
      <Link href="/" className="brand">IRKOP</Link>
      <nav aria-label="Primary">
        {variant === 'public' && (
          <><Link href="/konter">Tools</Link><Link href="/login">Login</Link>
           <Link href="/register" className="btn">Register</Link></>
        )}
        {variant === 'app' && (
          <><Link href="/app">Hub</Link><Link href="/app/tools">Tools</Link>
           <Link href="/app/profile">Profile</Link><Link href="/app/settings">Settings</Link>
           <span className="muted">{userLabel ?? 'Account'}</span>
           <form action="/api/auth/logout" method="post">
             <button type="submit" className="btn btn-secondary">Sign out</button>
           </form></>
        )}
        {variant === 'admin' && (
          <><Link href="/admin">Overview</Link><Link href="/admin/users">Users</Link>
           <Link href="/admin/activity">Activity</Link><Link href="/admin/settings">Settings</Link>
           <span className="muted">{userLabel ?? 'Admin'}</span>
           <form action="/api/auth/logout" method="post">
             <button type="submit" className="btn btn-secondary">Sign out</button>
           </form></>
        )}
      </nav>
    </header>
  );
}
