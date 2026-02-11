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
    <header className="bg-transparent px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo on the left */}
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

        {/* Navigation Container - Centered rounded pill with cream/peach background */}
        <nav 
          className="flex items-center gap-2 px-6 py-2.5 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 250, 240, 0.98) 0%, rgba(255, 245, 230, 1) 50%, rgba(255, 250, 240, 0.98) 100%)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => router.push(item.path)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-800 bg-transparent'
                }`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side icons - Settings, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Settings Icon */}
          <button
            type="button"
            className="p-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m15.364 6.364l-4.243-4.243m-4.242 0l-4.243 4.243m8.485 0l-4.243-4.243m-4.242 0l-4.243 4.243" />
            </svg>
          </button>
          
          {/* Notifications Icon */}
          <button
            type="button"
            className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          
          {/* Profile Icon */}
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

