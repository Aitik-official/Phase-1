"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import DashboardContainer from "../../components/layout/DashboardContainer";

export default function CandidateDashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New Job Alert: Senior UX Designer at Google", time: "2m ago", type: "New" },
    { id: 2, text: "Your application at Amazon was viewed", time: "1h ago", type: "Viewed" },
    { id: 3, text: "Interview invitation: Meta Frontend Role", time: "3h ago", type: "Invite" },
    { id: 4, text: "Skill assessment: 85th percentile in React", time: "5h ago", type: "Result" },
    { id: 5, text: "New message from HR: Microsoft", time: "1d ago", type: "Message" },
  ]);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      // Wait for exit animation to complete
      setTimeout(() => {
        setNotifications((prev) => {
          const next = [...prev];
          const first = next.shift();
          if (first) next.push(first);
          return next;
        });
        setIsRotating(false);
      }, 500); // Animation duration
    }, 5000); // Interval between rotations

    return () => clearInterval(interval);
  }, []);

  // Order matches the visual clockwise order from top: Green, Purple, Red, Blue, Teal, Yellow
  // Yellow segment weight significantly increased for visibility (reduced from green and other colors)
  const applicationStatus = [
    { label: "Applied", value: 6, color: "#22C55E" }, // Green - reduced from 7 to 6
    { label: "Final Decision", value: 8, color: "#6366F1" }, // Purple - reduced from 9 to 8
    { label: "Interview", value: 3, color: "#F97373" }, // Red - unchanged
    { label: "Assessment", value: 3, color: "#0EA5E9" }, // Blue - reduced from 4 to 3
    { label: "Shortlisted", value: 6, color: "#14B8A6" }, // Teal - reduced from 7 to 6
    { label: "Under Review", value: 10, color: "#FACC15" }, // Yellow - significantly increased from 6 to 10 for visibility
  ];

  const totalApplications = applicationStatus.reduce((sum, item) => sum + item.value, 0);

  const applicationSegments = (() => {
    const segments: {
      label: string;
      value: number;
      color: string;
      dashArray: string;
      offset: number;
    }[] = [];
    const gapSize = 0.8; // White gap size between segments - increased for better visibility
    const totalGaps = applicationStatus.length * gapSize; // Include gap after last segment (wrap-around)
    const availablePercentage = 100 - totalGaps;
    let accum = 0;

    applicationStatus.forEach((item, index) => {
      const basePercentage = (item.value / totalApplications) * 100;
      const adjustedPercentage = (basePercentage / 100) * availablePercentage;

      segments.push({
        ...item,
        dashArray: `${adjustedPercentage} ${100 - adjustedPercentage}`,
        offset: -accum,
      });

      accum += adjustedPercentage + gapSize; // Always add gap after each segment
    });

    return segments;
  })();

  // Create white gap segments for separation (including wrap-around gap between last and first)
  const whiteGaps = (() => {
    const gaps: { dashArray: string; offset: number }[] = [];
    const gapSize = 0.8; // Match the gap size used in segments - increased for better visibility
    const totalGaps = applicationStatus.length * gapSize; // Include wrap-around gap
    const availablePercentage = 100 - totalGaps;
    let accum = 0;

    // Calculate all segment end positions first (matching applicationSegments calculation)
    const segmentEnds: number[] = [];
    applicationStatus.forEach((item) => {
      const basePercentage = (item.value / totalApplications) * 100;
      const adjustedPercentage = (basePercentage / 100) * availablePercentage;
      accum += adjustedPercentage;
      segmentEnds.push(accum);
      accum += gapSize; // Add gap after segment
    });

    // Create gaps after each segment
    segmentEnds.forEach((segmentEnd, index) => {
      if (index < segmentEnds.length - 1) {
        // Regular gaps between segments - positioned right after each segment ends
        gaps.push({
          dashArray: `${gapSize} ${100 - gapSize}`,
          offset: -segmentEnd,
        });
      } else {
        // Last gap (wrap-around between yellow and green) - must be visible at 12 o'clock
        // Yellow (last segment) ends at segmentEnd
        // Green (first segment) starts at offset 0 (12 o'clock after -90° rotation)
        // Gap should be positioned to end exactly at 0, so it appears between yellow's end and green's start
        // Using offset = -(100 - gapSize) positions the gap to end at 0
        const wrapAroundOffset = -(100 - gapSize);

        gaps.push({
          dashArray: `${gapSize} ${100 - gapSize}`,
          offset: wrapAroundOffset,
        });
      }
    });

    return gaps;
  })();

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #fde9d4, #fafbfb, #bddffb)",
      }}
    >
      {/* Header */}
      <Header />

      {/* Overlay - closes sidebar when clicked outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            zIndex: 9998,
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 backdrop-blur-xl bg-white/90 shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "Inter, sans-serif",
          zIndex: 9999,
          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex flex-col h-full pt-8">
          {/* Navigation Items */}
          <div className="flex flex-col px-4 space-y-2">
            {/* Dashboard - Active */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer relative"
              style={{
                backgroundColor: "#F0F9FF",
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  backgroundColor: "#0EA5E9",
                }}
              ></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#0EA5E9" }}
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0EA5E9",
                }}
              >
                Dashboard
              </span>
            </div>

            {/* Jobs */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/explore-jobs")}
            >
              <svg
                width="20"
                height="20"
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
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Jobs
              </span>
            </div>

            {/* Applications */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/applications")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#6B7280" }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Applications
              </span>
            </div>

            {/* Edit CV */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/uploadcv")}
            >
              <svg
                width="20"
                height="20"
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
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Edit CV
              </span>
            </div>

            {/* Recommended Courses */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/courses")}
            >
              <svg
                width="20"
                height="20"
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
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Recommended Courses
              </span>
            </div>

            {/* Profile */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/personal-details")}
            >
              <svg
                width="20"
                height="20"
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
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Profile
              </span>
            </div>

            {/* Settings */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/settings")}
            >
              <svg
                width="20"
                height="20"
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
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Settings
              </span>
            </div>
          </div>

          {/* Bottom Section - Help & Support and Logout */}
          <div className="mt-auto mb-8 flex flex-col px-4 space-y-2" style={{ paddingTop: "32px" }}>
            {/* Help & Support */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/help")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#6B7280" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Help & Support
              </span>
            </div>

            {/* Logout */}
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
              onClick={() => router.push("/logout")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#6B7280" }}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#6B7280",
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <main className="w-full overflow-x-hidden py-6 sm:py-8">
        <DashboardContainer>
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 wrap-break-word"
              style={{
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Sachin !
            </h1>
            <p
              className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-6 wrap-break-word"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Your AI-powered job search dashboard. Last updated today.
            </p>

            {/* Quick Action Icons and Key Metrics Cards - Same Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 mb-6 sm:mb-8">
              {/* Quick Action Icons - Left Side */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {/* Search Icon - Expands to Input */}
                <div
                  className="group relative h-12 rounded-full flex items-center transition-all duration-700 ease-in-out cursor-pointer shadow-md overflow-hidden"
                  style={{
                    backgroundColor: "#1F2937", // Default Slate-800
                    width: "48px", // Default width (w-12)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "300px";
                    e.currentTarget.style.backgroundColor = "#FCCD2A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "48px";
                    e.currentTarget.style.backgroundColor = "#1F2937";
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-black transition-colors duration-300"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Explore Jobs"
                    className="bg-transparent border-none outline-none text-black placeholder-gray-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"
                    style={{
                      width: "200px",
                      marginLeft: "4px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push("/explore-jobs");
                      }
                    }}
                  />
                </div>

                {/* Edit Icon - AI CV Editor */}
                <div
                  className="group relative h-12 rounded-full flex items-center transition-all duration-700 ease-in-out cursor-pointer shadow-md overflow-hidden"
                  style={{
                    backgroundColor: "#1F2937",
                    width: "48px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "180px"; // Adjust width as needed for text
                    e.currentTarget.style.backgroundColor = "#FCCD2A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "48px";
                    e.currentTarget.style.backgroundColor = "#1F2937";
                  }}
                  onClick={() => router.push('/aicveditor')}
                >
                  <div className="flex items-center justify-center w-12 h-12 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-black transition-colors duration-300"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 ml-2">
                    AI CV Editor
                  </span>
                </div>

                {/* Grid Icon - Application Management */}
                <div
                  className="group relative h-12 rounded-full flex items-center transition-all duration-700 ease-in-out cursor-pointer shadow-md overflow-hidden"
                  style={{
                    backgroundColor: "#1F2937",
                    width: "48px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "240px";
                    e.currentTarget.style.backgroundColor = "#FCCD2A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "48px";
                    e.currentTarget.style.backgroundColor = "#1F2937";
                  }}
                  onClick={() => router.push("/applications")}
                >
                  <div className="flex items-center justify-center w-12 h-12 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-black transition-colors duration-300"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                  <span className="text-black text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 ml-2">
                    Application Management
                  </span>
                </div>

                {/* Graduation Cap Icon - Skill Enhancement */}
                <div
                  className="group relative h-12 rounded-full flex items-center transition-all duration-700 ease-in-out cursor-pointer shadow-md overflow-hidden"
                  style={{
                    backgroundColor: "#1F2937",
                    width: "48px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "200px";
                    e.currentTarget.style.backgroundColor = "#FCCD2A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "48px";
                    e.currentTarget.style.backgroundColor = "#1F2937";
                  }}
                  onClick={() => router.push("/courses")}
                >
                  <div className="flex items-center justify-center w-12 h-12 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-black transition-colors duration-300"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <span className="text-black text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 ml-2">
                    Skill Enhancement
                  </span>
                </div>
              </div>

              {/* Key Metrics Cards - Right Side */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                {/* Active Applications Card */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>36</p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Active Applications</p>
                  </div>
                </div>

                {/* Interviews Card */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>3</p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Interviews</p>
                  </div>
                </div>

                {/* Saved Jobs Card */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7h16"></path>
                      <path d="M4 12h16"></path>
                      <path d="M4 17h16"></path>
                      <rect x="2" y="3" width="20" height="18" rx="2" fill="none"></rect>
                      <rect x="6" y="6" width="3" height="3" fill="#4B5563" opacity="0.3"></rect>
                      <rect x="11" y="6" width="3" height="3" fill="#4B5563" opacity="0.3"></rect>
                      <rect x="6" y="11" width="3" height="3" fill="#4B5563" opacity="0.3"></rect>
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>52</p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Saved Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 1: Profile, Application Status, Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[360px_1fr] xl:grid-cols-[360px_1fr_400px] gap-4 md:gap-5 lg:gap-8 mb-6 lg:mb-8">
            {/* Profile Card */}
            <div className="w-full flex justify-center xl:justify-start min-w-0">
              <div
                className="bg-white overflow-hidden transition-all duration-500 ease-out hover:scale-[1.05] cursor-pointer w-full max-w-full group"
                style={{
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  position: "relative",
                  aspectRatio: "356/377",
                  maxWidth: "min(100%, 356px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0px 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.08)";
                }}
                onClick={() => router.push("/profile")}
              >
                {/* Profile Picture with Gradient Overlay */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/Gemini_Generated_Image_xxo7twxxo7twxxo7.png"
                    alt="Sachin Dubey"
                    fill
                    className="object-cover"
                  />
                  {/* White Gradient Overlay - Linear gradient: transparent white (0% opacity) at 70% to opaque white (100% opacity) at 100% (bottom 30% has white overlay) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 1) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Text Overlay - Bottom Left */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-1 line-clamp-1 wrap-break-word" style={{ fontFamily: "Inter, sans-serif" }}>
                      Sachin Dubey
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-900 mb-0.5 line-clamp-1 wrap-break-word" style={{ fontFamily: "Inter, sans-serif" }}>
                      Senior Frontend
                    </p>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-900 line-clamp-1 wrap-break-word" style={{ fontFamily: "Inter, sans-serif" }}>
                      Developer
                    </p>
                  </div>
                  {/* View Button - Bottom Right */}
                  <button
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md z-10"
                    style={{
                      background: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "Inter, sans-serif",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/profile");
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Application Status Card */}
            <div className="w-full flex justify-center lg:justify-start min-w-0">
              <div
                className={`bg-white overflow-hidden transition-all duration-300 hover:scale-[1.01] w-full p-4 sm:p-6 aspect-[356/377] lg:aspect-auto max-w-[356px] lg:max-w-full`}
                style={{
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                  height: "100%",
                }}
                onClick={() => router.push("/applications")}
              >
                <h2 className="mb-4 text-sm sm:text-base lg:text-lg font-semibold text-gray-900 wrap-break-word" style={{ fontFamily: "Inter, sans-serif" }}>
                  Application Status
                </h2>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start h-full lg:h-auto pb-8 lg:pb-0 gap-4 lg:gap-6">
                  <div className="relative shrink-0 w-full aspect-square overflow-hidden" style={{ maxWidth: "min(100%, 280px)" }}>
                    <svg
                      viewBox="0 0 36 36"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      className="pie-chart-svg"
                    >
                      {/* background circle */}
                      <circle cx="18" cy="18" r="16" fill="#F9FAFB" />
                      {/* White separator strokes (Color: #FFFFFF, Weight: 4.5, Opacity: 100%, Position: Center) */}
                      {/* Render regular gaps first */}
                      {whiteGaps.slice(0, -1).map((gap, index) => (
                        <g key={`gap-${index}`} transform="rotate(-90 18 18)">
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="4.5"
                            strokeDasharray={gap.dashArray}
                            strokeDashoffset={gap.offset}
                            strokeLinecap="butt"
                            strokeOpacity="1"
                            strokeLinejoin="miter"
                          />
                        </g>
                      ))}
                      {/* Colored segments - each color has separate stroke properties */}
                      {applicationSegments.map((seg, index) => {
                        const isHovered = hoveredSegment === seg.label;

                        return (
                          <g
                            key={seg.label}
                            transform="rotate(-90 18 18)"
                            onMouseEnter={() => setHoveredSegment(seg.label)}
                            onMouseLeave={() => setHoveredSegment(null)}
                            style={{
                              cursor: 'pointer',
                              pointerEvents: 'auto'
                            }}
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="14"
                              fill="none"
                              stroke={seg.color}
                              strokeWidth={isHovered ? "5" : "4.5"}
                              strokeDasharray={seg.dashArray}
                              strokeDashoffset="0"
                              strokeLinecap="butt"
                              strokeOpacity="0"
                              strokeLinejoin="miter"
                              style={{
                                transition: 'stroke-width 0.3s ease-out, filter 0.3s ease-out, transform 0.3s ease-out',
                                transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                                transformOrigin: '18px 18px',
                                filter: isHovered ? 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.2))' : 'none'
                              }}
                            >
                              {/* First, make segment appear at 12 o'clock (fade in) */}
                              <animate
                                attributeName="stroke-opacity"
                                from="0"
                                to="1"
                                dur="0.3s"
                                begin={`${index * 0.25}s`}
                                fill="freeze"
                              />
                              {/* Then animate from 12 o'clock to final position sequentially */}
                              <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to={seg.offset}
                                dur="1.8s"
                                begin={`${index * 0.25 + 0.3}s`}
                                fill="freeze"
                                calcMode="spline"
                                keyTimes="0; 0.2; 0.5; 0.8; 1"
                                keySplines="0.25 0.46 0.45 0.94; 0.25 0.46 0.45 0.94; 0.25 0.46 0.45 0.94; 0.25 0.46 0.45 0.94"
                              />
                            </circle>
                          </g>
                        );
                      })}
                      {/* White segment gap between yellow and green at 12 o'clock - rendered last to appear on top */}
                      {(() => {
                        // White segment is 3% wide and positioned exactly at 12 o'clock (top)
                        // Offset = -(100 - width) positions it to end at 0, which is where green starts
                        const whiteGapWidth = 3;
                        const whiteGapOffset = -(100 - whiteGapWidth);

                        return (
                          <g key="white-gap-segment-yellow-green" transform="rotate(-90 18 18)">
                            <circle
                              cx="18"
                              cy="18"
                              r="14"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="7"
                              strokeDasharray={`${whiteGapWidth} ${100 - whiteGapWidth}`}
                              strokeDashoffset={whiteGapOffset}
                              strokeLinecap="round"
                              strokeOpacity="1"
                              strokeLinejoin="miter"
                            />
                          </g>
                        );
                      })()}
                    </svg>
                    <div
                      className="absolute flex flex-col items-center justify-center min-w-0 px-2"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 1
                      }}
                    >
                      <span
                        className="text-center wrap-break-word"
                        style={{
                          fontFamily: "Arimo, sans-serif",
                          fontSize: "clamp(24px, 4vw, 44.33px)",
                          fontWeight: 400,
                          lineHeight: "1",
                          letterSpacing: "0px",
                          color: "#1A1A1A",
                        }}
                      >
                        {totalApplications}
                      </span>
                      <span
                        className="mt-1 text-center text-[9px] sm:text-[10px] lg:text-xs wrap-break-word px-1"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "clamp(9px, 1.2vw, 12px)",
                          color: "#6B7280",
                        }}
                      >
                        Total Applications
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-2.5 min-w-0 w-full lg:w-auto hidden lg:block">
                    {applicationStatus.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-2 sm:gap-3 min-w-0 w-full">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            className="truncate wrap-break-word text-xs sm:text-sm"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "clamp(11px, 1.5vw, 13px)",
                              color: "#4B5563",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          className="shrink-0 text-xs sm:text-sm font-medium"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(11px, 1.5vw, 13px)",
                            color: "#111827",
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Notifications */}
            <div className="w-full min-w-0 hidden lg:block">
              <div
                className="bg-white overflow-hidden transition-all duration-300 hover:scale-[1.01] w-full max-w-full mx-auto"
                style={{
                  maxWidth: "min(100%, 400px)",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  padding: "clamp(16px, 4vw, 24px)",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/notification")}
              >
                <h2
                  className="mb-4 text-sm sm:text-base lg:text-lg font-semibold text-gray-900 wrap-break-word"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Notifications
                </h2>
                <div className="flex flex-col items-center overflow-hidden max-h-[320px]" style={{ gap: "4px" }}>
                  {notifications.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 sm:gap-4 transition-all duration-500 rounded-lg cursor-pointer w-full min-w-0 ${index === 0 && isRotating ? "opacity-0 -translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
                        } ${index === notifications.length - 1 && !isRotating ? "animate-notification-in" : ""
                        } hover:bg-gray-50`}
                      style={{
                        padding: "8px 12px",
                        minHeight: "56px",
                      }}
                    >
                      {/* Left: Icon Box */}
                      <div
                        className="shrink-0 flex items-center justify-center rounded-xl"
                        style={{
                          width: "44px",
                          height: "44px",
                          backgroundColor: "#EFF6FF", // Light Blue
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"
                            fill="#EF4444" // Red Star
                            stroke="#EF4444"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="18" cy="8" r="1.5" stroke="#28A8DF" strokeWidth="1.5" />
                          <circle cx="6" cy="16" r="1.5" stroke="#28A8DF" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Middle: Message */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="line-clamp-2 wrap-break-word text-xs sm:text-sm"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "clamp(12px, 2vw, 14px)",
                            fontWeight: 400,
                            color: "#111827",
                            lineHeight: "1.4",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>

                      {/* Right: Status/Time Stack */}
                      <div className="flex flex-col items-end shrink-0" style={{ gap: "4px" }}>
                        <span
                          className="px-2 sm:px-3 py-1 rounded-full text-center whitespace-nowrap shrink-0"
                          style={{
                            backgroundColor: "#111827", // Navy
                            color: "#FFFFFF",
                            fontSize: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {item.type}
                        </span>
                        <span
                          className="whitespace-nowrap text-xs"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "#6B7280",
                          }}
                        >
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Hiring Signals, CV Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[360px_1fr_400px] gap-4 md:gap-5 lg:gap-8 mb-6 lg:mb-8">
            {/* Hiring Signals Card */}
            <div className="lg:col-span-2 xl:col-span-2 w-full min-w-0">
              <div
                className="bg-[#333333] overflow-hidden transition-all duration-300 hover:scale-[1.01] w-full max-w-full p-4 sm:p-5 lg:p-6 h-full"
                style={{
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                  color: "#FFFFFF",
                }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 min-w-0">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-normal mb-1 text-white wrap-break-word line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
                      Hiring Signals for You
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9095A1] wrap-break-word line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
                      AI insights based on current job market & your profile
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors shrink-0 text-xs sm:text-sm font-medium text-white whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif" }}>
                    View Job Trends
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* Roles in Demand */}
                  <div className="min-w-0">
                    <h3 className="wrap-break-word" style={{ fontSize: "clamp(9px, 1vw, 10px)", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>ROLES IN DEMAND</h3>
                    <div className="space-y-3">
                      <div className="group flex items-center gap-2 min-w-0">
                        <span className="group-hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm font-medium cursor-pointer truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>Frontend Developer</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FC9620" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110 shrink-0">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </div>
                      <div className="group flex items-center gap-2 min-w-0">
                        <span className="group-hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm font-medium cursor-pointer truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>React Engineer</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FC9620" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110 shrink-0">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </div>
                      <div className="group flex items-center gap-2 min-w-0">
                        <span className="group-hover:text-gray-200 transition-colors duration-300 text-xs sm:text-sm font-medium cursor-pointer truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>UI Engineer</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="min-w-0">
                    <h3 className="wrap-break-word" style={{ fontSize: "clamp(9px, 1vw, 10px)", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>TOP LOCATIONS</h3>
                    <div className="space-y-3">
                      <div className="group flex items-center gap-2 min-w-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FC9620" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }} className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 shrink-0">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300 cursor-pointer transition-all duration-300 group-hover:text-orange-400 truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>Remote</span>
                      </div>
                      <div className="group flex items-center gap-2 min-w-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FC9620" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }} className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 shrink-0">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300 cursor-pointer transition-all duration-300 group-hover:text-orange-400 truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>Bangalore</span>
                      </div>
                      <div className="group flex items-center gap-2 min-w-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FC9620" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }} className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 shrink-0">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300 cursor-pointer transition-all duration-300 group-hover:text-orange-400 truncate wrap-break-word flex-1 min-w-0" style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}>Berlin</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="min-w-0">
                    <h3 className="wrap-break-word" style={{ fontSize: "clamp(9px, 1vw, 10px)", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>SKILLS INCREASING INTERVIEW CHANCES</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {["React Hooks", "System Design", "AWS Basics"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded-full bg-[#4B4B4B] text-[10px] sm:text-[11px] font-medium text-gray-200 text-center cursor-pointer transition-all duration-300 hover:bg-[#FC9620] hover:scale-105 hover:text-black active:scale-95 shadow-sm wrap-break-word line-clamp-1"
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(10px, 1.1vw, 11px)" }}
                          title={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Market Fit */}
                  <div className="group cursor-pointer min-w-0">
                    <h3 className="wrap-break-word" style={{ fontSize: "clamp(9px, 1vw, 10px)", fontWeight: 600, color: "#9CA3AF", marginBottom: "10px", letterSpacing: "0.05em" }}>YOUR MARKET FIT</h3>
                    <div className="flex flex-col min-w-0">
                      <span className="transition-all duration-500 group-hover:scale-110 origin-left wrap-break-word" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, color: "#FC9620", lineHeight: "1" }}>78%</span>
                      <span className="wrap-break-word" style={{ fontSize: "clamp(10px, 1.2vw, 11px)", color: "#9CA3AF", marginTop: "8px", marginBottom: "12px" }}>match with current openings</span>
                      <div className="relative w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FC9620] rounded-full transition-all duration-700 ease-out group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)]" style={{ width: "78%" }}></div>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CV Score Card */}
            <div className="w-full min-w-0">
              <div
                className="bg-[#FFF9F2] overflow-hidden transition-all duration-300 hover:scale-[1.01] w-full max-w-full mx-auto h-full"
                style={{
                  maxWidth: "min(100%, 430px)",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  padding: "clamp(24px, 6vw, 32px) clamp(20px, 5vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/cvscore")}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <h2
                    className="text-base sm:text-2xl lg:text-xl xl:text-2xl font-light text-gray-900 wrap-break-word flex-1 min-w-0"
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    CV Score
                  </h2>
                  <span
                    className="text-2xl sm:text-lg lg:text-3xl xl:text-4xl font-light text-gray-900 shrink-0 whitespace-nowrap"
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    82%
                  </span>
                </div>

                {/* Segmented Capsule Graph */}
                <div className="relative">
                  {/* Labels row - moved further up and ensured visibility */}
                  <div className="flex w-full mb-3" style={{ paddingLeft: "10px" }}>
                    <div style={{ width: "40%" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#9CA3AF", fontWeight: 400 }}>Skills</span>
                    </div>
                    <div style={{ width: "35%", paddingLeft: "8px" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#9CA3AF", fontWeight: 400 }}>Exp</span>
                    </div>
                    <div style={{ width: "25%", paddingLeft: "8px" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#9CA3AF", fontWeight: 400 }}>Edu</span>
                    </div>
                  </div>
                  {/* Capsule row */}
                  <div className="flex w-full h-[54px] rounded-full overflow-hidden shadow-inner">
                    {/* Skills Segment */}
                    <div
                      className="h-full flex items-center justify-center bg-[#FFD65C]"
                      style={{ width: "40%" }}
                    >
                      <span className="text-[14px] text-[#111827] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>High</span>
                    </div>
                    {/* Exp Segment */}
                    <div
                      className="h-full flex items-center justify-center bg-[#232931]"
                      style={{ width: "35%", borderLeft: "2px solid #FFF9F2", borderRight: "2px solid #FFF9F2" }}
                    >
                      <span className="text-[14px] text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Good</span>
                    </div>
                    {/* Edu Segment */}
                    <div
                      className="h-full flex items-center justify-center bg-[#A4ADB8]"
                      style={{ width: "25%" }}
                    >
                      <span className="text-[14px] text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Avg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Job Matches, Recommended Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[360px_1fr_400px] gap-4 md:gap-5 lg:gap-8 mb-6 lg:mb-8">
            {/* Job Matches Card */}
            <div className="lg:col-span-2 xl:col-span-2 w-full min-w-0">
              <div
                className="flex flex-col bg-white overflow-hidden w-full max-w-full p-4 sm:p-5 lg:p-6 xl:p-8"
                style={{
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 min-w-0">
                  <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-normal text-gray-900 wrap-break-word flex-1 min-w-0" style={{ fontFamily: "Inter, sans-serif" }}>
                    Job Matches
                  </h2>
                  <button
                    className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 bg-transparent border-none cursor-pointer px-2 py-1 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    onClick={() => router.push("/explore-jobs")}
                  >
                    View All Jobs
                  </button>
                </div>

                {/* Job List */}
                <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
                  {[
                    {
                      title: "Frontend Developer",
                      company: "Tech Solutions Inc.",
                      location: "New York, USA",
                      skills: ["React", "TypeScript", "UI/UX"],
                      match: "92% Match",
                    },
                    {
                      title: "Backend Engineer",
                      company: "Global Innovations",
                      location: "San Francisco, USA",
                      skills: ["Nodejs", "Python", "AWS"],
                      match: "88% Match",
                    },
                    {
                      title: "Data Analyst",
                      company: "Analytics Corp.",
                      location: "Boston, USA",
                      skills: ["SQL", "Python", "Tableau"],
                      match: "85% Match",
                    },
                    {
                      title: "Product Designer",
                      company: "Creative Studio",
                      location: "London, UK",
                      skills: ["Figma", "UI/UX", "User Research"],
                      match: "90% Match",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden relative p-4 border border-gray-200 bg-white w-full min-w-0"
                      style={{
                        borderRadius: "6px",
                        flexShrink: 0,
                        backgroundImage: "linear-gradient(to right, #F0F9FF 50%, #FFFFFF 50%)",
                        backgroundSize: "200% 100%",
                        backgroundPosition: "right bottom",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundPosition = "left bottom";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundPosition = "right bottom";
                      }}
                    >
                      {/* Icon */}
                      <div className="shrink-0 transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black group-hover:text-blue-600">
                          <rect x="4" y="5" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
                          <rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
                          <rect x="4" y="15" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
                          <circle cx="18" cy="7" r="0.5" fill="currentColor" />
                          <circle cx="18" cy="12" r="0.5" fill="currentColor" />
                          <circle cx="18" cy="17" r="0.5" fill="currentColor" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 transition-colors duration-300">
                        <h3 className="group-hover:text-blue-900 transition-colors duration-300 text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-1 wrap-break-word line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
                          {job.title}
                        </h3>
                        <p className="group-hover:text-blue-700 transition-colors duration-300 text-[10px] sm:text-xs lg:text-sm text-gray-600 mb-2 wrap-break-word line-clamp-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          {job.company} • {job.location}
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-800 bg-gray-100 text-gray-600 shrink-0"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col items-end gap-2 z-10 shrink-0 min-w-0">
                        <span className="transition-colors duration-300 group-hover:text-blue-600 font-semibold text-[10px] sm:text-xs lg:text-sm text-blue-600 whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif" }}>
                          {job.match}
                        </span>
                        <button
                          className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-lg text-[10px] sm:text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 bg-orange-500 text-white border-none cursor-pointer shadow-sm whitespace-nowrap"
                          style={{ fontFamily: "Inter, sans-serif" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/explore-jobs");
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Courses Card */}
            <div className="w-full flex justify-center lg:justify-end min-w-0">
              <div
                className="flex flex-col bg-white overflow-hidden w-full max-w-full mx-auto lg:mx-0 p-4 sm:p-5 lg:p-6"
                style={{
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  maxWidth: "min(100%, 430px)",
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 sm:mb-5 min-w-0">
                  <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray-900 wrap-break-word flex-1 min-w-0" style={{ fontFamily: "Inter, sans-serif" }}>
                    Recommended Courses
                  </h2>
                </div>

                {/* Course List */}
                <div className="flex flex-col gap-4 sm:gap-5 min-w-0">
                  {[
                    {
                      title: "Effective Communication in Tech",
                      duration: "2h 15m",
                      code: "ending\",r={state:function(){return n},always:promise)?e.promise().done(n.resolve).fail(n.re dd(function(){n=s},t[1^e][2].disable,t[2][2]. 0,n=h.call(arguments),r=n.length,i=1!==r||e& r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t >><table></table><a href='/a'>a</a><in typ TagName(\"input\")[0],r.style.cssText=\"top:1px test(r.getAttribute(\"style\")),hrefNormalized:",
                    },
                    {
                      title: "Advanced React Patterns",
                      duration: "3h 30m",
                      code: "const [state, disp] = useRed(red, init); export default function App() { return React.createElement('div', { className: 'app-container' }, React.createElement(Header, { title: 'Dashboard' }), React.createElement(MainLayout, null, React.createElement(Sidebar), React.createElement(ContentArea))); }",
                    },
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex flex-col overflow-hidden border border-gray-100 w-full min-w-0"
                      style={{
                        borderRadius: "6px",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* Banner with Play Icon */}
                      <div
                        className="relative h-[100px] w-full flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundColor: "#1F2937",
                        }}
                      >
                        {/* Code Background Overlay */}
                        <div
                          className="absolute inset-0 opacity-40 p-2 overflow-hidden"
                          style={{
                            fontFamily: "Monaco, 'Courier New', monospace",
                            fontSize: "8px",
                            color: "#E5E7EB",
                            wordBreak: "break-all",
                            lineHeight: "1.2",
                            userSelect: "none",
                          }}
                        >
                          {course.code}
                        </div>
                        {/* Play Icon */}
                        <div className="relative z-10 shrink-0">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="p-3 sm:p-3.5 flex flex-col gap-3 min-w-0">
                        <div className="flex justify-between items-start gap-2 min-w-0">
                          <h3
                            className="wrap-break-word line-clamp-2 flex-1 min-w-0 text-sm sm:text-base"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "clamp(14px, 2vw, 16px)",
                              fontWeight: 600,
                              color: "#111827",
                            }}
                          >
                            {course.title}
                          </h3>
                          <span
                            className="shrink-0 whitespace-nowrap text-xs sm:text-sm"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "clamp(12px, 2vw, 14px)",
                              color: "#111827",
                            }}
                          >
                            {course.duration}
                          </span>
                        </div>
                        <button
                          className="w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: "#38B6FF",
                            color: "#FFFFFF",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => router.push("/courses")}
                        >
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DashboardContainer>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 py-4 text-center md:flex-row md:text-left">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Contact Support</p>
        </div>
      </footer>
    </div>
  );
}
