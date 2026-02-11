'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active page
  const isActive = (path: string) => {
    if (path === '/candidate-dashboard') {
      return pathname === path || pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  const navItems = [
    { label: 'Dashboard', path: '/candidate-dashboard' },
    { label: 'Jobs', path: '/explore-jobs' },
    { label: 'Courses', path: '/courses' },
    { label: 'Applications', path: '/applications' },
    { label: 'Profile', path: '/profile' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/SAASA%20Logo.png"
            alt="SAASA B2E"
            width={110}
            height={32}
            className="h-8 w-auto cursor-pointer"
            onClick={() => router.push('/candidate-dashboard')}
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => router.push(item.path)}
                className={`relative cursor-pointer transition-colors ${
                  active
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-10 rounded-full bg-sky-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300 cursor-pointer">
            <Image
              src="/cv_main.jpg"
              alt="User avatar"
              width={32}
              height={32}
              className="h-8 w-8 object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

