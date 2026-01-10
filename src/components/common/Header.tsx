'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

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
          <button 
            onClick={() => router.push('/candidate-dashboard')}
            className="relative text-slate-900"
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-10 rounded-full bg-sky-500" />
          </button>
          <button 
            onClick={() => router.push('/explore-jobs')}
            className="text-slate-600 hover:text-slate-900"
          >
            Jobs
          </button>
          <button className="text-slate-600 hover:text-slate-900">Courses</button>
          <button className="text-slate-600 hover:text-slate-900">Applications</button>
          <button 
            onClick={() => router.push('/profile')}
            className="text-slate-600 hover:text-slate-900"
          >
            Profile
          </button>
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
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
          <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
            <Image src="/cv_main.jpg" alt="User avatar" width={32} height={32} className="h-8 w-8 object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}

