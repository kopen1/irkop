'use client';

import { useEffect, useState } from 'react';

export default function SiteFooter() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <span>IRKOP · Standalone Platform</span>
      <span>© {year}</span>
    </footer>
  );
}
