'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-modal') && !target.closest('.notification-button')) {
        setIsNotificationsModalOpen(false);
      }
      if (!target.closest('.profile-modal') && !target.closest('.profile-button')) {
        setIsProfileModalOpen(false);
      }
    };

    if (isNotificationsModalOpen || isProfileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsModalOpen, isProfileModalOpen]);

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
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${active
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

          {/* Notifications Icon with Modal */}
          <div className="relative notification-button">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsModalOpen(!isNotificationsModalOpen);
                setIsProfileModalOpen(false);
              }}
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

            {/* Notifications Dropdown */}
            {isNotificationsModalOpen && (
              <div
                className="notification-modal absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-10001 transition-all duration-300 ease-out"
                style={{
                  width: "270px",
                  fontFamily: "Inter, sans-serif",
                  animation: "slideDown 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-3.5 pt-3 pb-2 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      Notifications
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-gray-700 hover:text-gray-900"
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                      >
                        Mark all as read
                      </button>
                      <button
                        onClick={() => setIsNotificationsModalOpen(false)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#6B7280",
                    }}
                  >
                    Recent updates related to your jobs and profile
                  </p>
                </div>

                {/* Notifications Content */}
                <div>
                  <div className="px-3.5 pt-3 pb-2.5">
                    <h4
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#6B7280",
                        marginBottom: "7px",
                      }}
                    >
                      Today
                    </h4>
                    <div className="space-y-3">
                      {/* Notification 1 - Blue */}
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ color: "#3B82F6" }}
                            >
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              color: "#111827",
                              marginBottom: "2px",
                            }}
                          >
                            3 new jobs match your profile
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            Jobs based on your profile
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            2h ago
                          </span>
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "#3B82F6" }}
                          ></div>
                        </div>
                      </div>

                      {/* Notification 2 - Green */}
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ color: "#22C55E" }}
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              color: "#111827",
                              marginBottom: "2px",
                            }}
                          >
                            Your application for Data Analyst is under
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            Application updated
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            8h ago
                          </span>
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "#22C55E" }}
                          ></div>
                        </div>
                      </div>

                      {/* Notification 3 - Red */}
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          <div className="h-7 w-7 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ color: "#EF4444" }}
                            >
                              <path d="M9 11l3 3L22 4"></path>
                              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              color: "#111827",
                              marginBottom: "2px",
                            }}
                          >
                            You've been shortlisted for Frontend Deve
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            Interview invitation
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 400,
                              color: "#6B7280",
                            }}
                          >
                            1d ago
                          </span>
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: "#EF4444" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-3.5 py-2.5 border-t border-gray-200">
                  <button
                    onClick={() => {
                      router.push('/notification');
                      setIsNotificationsModalOpen(false);
                    }}
                    className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Icon with Modal */}
          <div className="relative profile-button">
            <button
              type="button"
              onClick={() => {
                setIsProfileModalOpen(!isProfileModalOpen);
                setIsNotificationsModalOpen(false);
              }}
              className="profile-button h-8 w-8 overflow-hidden rounded-full bg-slate-300 cursor-pointer"
            >
              <Image
                src="/cv_main.jpg"
                alt="User avatar"
                width={32}
                height={32}
                className="h-8 w-8 object-cover"
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileModalOpen && (
              <div
                className="profile-modal absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-10001 transition-all duration-300 ease-out"
                style={{
                  width: "280px",
                  fontFamily: "Inter, sans-serif",
                  animation: "slideDown 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* User Information Section */}
                <div className="px-3 pt-3 pb-2">
                  <div className="flex items-start gap-2.5">
                    <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: "#9CA3AF" }}
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                          marginBottom: "2px",
                        }}
                      >
                        Vedant Sharma
                      </h3>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 400,
                          color: "#6B7280",
                          marginBottom: "4px",
                        }}
                      >
                        vedant.sharma@example.com
                      </p>
                      <span
                        className="inline-block px-1.5 py-0.5 rounded-full"
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#111827",
                          backgroundColor: "#F3F4F6",
                        }}
                      >
                        Job Seeker
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mx-3"></div>

                {/* Primary Navigation Options */}
                <div className="px-3 py-2">
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/personal-details");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      View Profile
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/uploadcv");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Edit CV
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/applications");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      My Applications
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/assessments");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M9 11l3 3L22 4"></path>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Assessments
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/saved-jobs");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Saved Jobs
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/courses");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Courses & Learning
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mx-3"></div>

                {/* Preferences Section */}
                <div className="px-3 py-2">
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/notification-preferences");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Notification Preferences
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/settings");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#6B7280" }}
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m15.364 6.364l-4.243-4.243m-4.242 0l-4.243 4.243m8.485 0l-4.243-4.243m-4.242 0l-4.243 4.243"></path>
                    </svg>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Settings
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mx-3"></div>

                {/* Support Section */}
                <div className="px-3 py-2 pb-3">
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      router.push("/help");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#6B7280",
                      }}
                    >
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#111827",
                      }}
                    >
                      Help & Support
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

