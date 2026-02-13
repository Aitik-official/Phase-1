"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header";

export default function CandidateDashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

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
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #fff5e6 0%, #f0f8ff 100%)",
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
      <main className="mx-auto max-w-[1414px] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "36px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "8px",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Sachin !
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                color: "#6B7280",
                marginBottom: "24px",
                fontWeight: 400,
              }}
            >
              Your AI-powered job search dashboard. Last updated today.
            </p>

            {/* Quick Action Icons and Key Metrics Cards - Same Row */}
            <div className="flex items-center justify-between mb-8">
              {/* Quick Action Icons - Left Side */}
              <div className="flex items-center gap-4">
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
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
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
                >
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
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
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
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
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
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
              <div className="flex items-center gap-6">
                {/* Active Applications Card */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", fontWeight: 700, color: "#374151", margin: 0, lineHeight: "1.2" }}>36</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#374151", margin: 0, marginTop: "4px" }}>Active Applications</p>
                  </div>
                </div>

                {/* Interviews Card */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", fontWeight: 700, color: "#374151", margin: 0, lineHeight: "1.2" }}>3</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#374151", margin: 0, marginTop: "4px" }}>Interviews</p>
                  </div>
                </div>

                {/* Saved Jobs Card */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FEF3E2" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", fontWeight: 700, color: "#374151", margin: 0, lineHeight: "1.2" }}>52</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#374151", margin: 0, marginTop: "4px" }}>Saved Jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* First Row: Three Columns - Profile, Application Status, Notifications */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left Column: Profile Card */}
            <div className="flex-shrink-0">
              <div
                className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  width: "356px",
                  height: "377px",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  position: "relative",
                }}
                onClick={() => router.push("/profile")}
              >
                {/* Profile Picture with Gradient Overlay */}
                <div className="relative w-full" style={{ height: "377px" }}>
                  <Image
                    src="/Gemini_Generated_Image_xxo7twxxo7twxxo7.png"
                    alt="Sachin Dubey"
                    width={356}
                    height={377}
                    className="w-full h-full object-cover"
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
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ zIndex: 10 }}>
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "4px",
                      }}
                    >
                      Sachin Dubey
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#111827",
                        marginBottom: "4px",
                      }}
                    >
                      Senior Frontend
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#111827",
                      }}
                    >
                      Developer
                    </p>
                  </div>
                  {/* View Button - Bottom Right */}
                  <button
                    className="absolute bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md"
                    style={{
                      background: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "Inter, sans-serif",
                      zIndex: 10,
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => router.push("/profile")}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Column: Application Status */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0 bg-white transition-all duration-300 hover:scale-[1.01]"
                style={{
                  width: "580px",
                  height: "378px",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  padding: "24px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/applications")}
              >
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Application Status
                </h2>
                <div className="flex items-start gap-6" style={{ marginLeft: "10px", marginTop: "37.68px" }}>
                  <div
                    className="relative flex-shrink-0"
                    style={{
                      width: "280px",
                      height: "280px",
                    }}
                  >
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
                      className="absolute flex flex-col items-center justify-center"
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
                        style={{
                          fontFamily: "Arimo, sans-serif",
                          fontSize: "44.33px",
                          fontWeight: 400,
                          lineHeight: "44.3px",
                          letterSpacing: "0px",
                          color: "#1A1A1A",
                        }}
                      >
                        {totalApplications}
                      </span>
                      <span
                        className="mt-1 text-xs"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: "#6B7280",
                        }}
                      >
                        Total Applications
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-sm" style={{ marginTop: "40px" }}>
                    {applicationStatus.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "#4B5563",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
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
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0 bg-white transition-all duration-300 hover:scale-[1.01]"
                style={{
                  width: "430px",
                  height: "378px",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  padding: "20px 24px",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/notification")}
              >
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Notifications
                </h2>
                <div className="flex flex-col items-center" style={{ gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 transition-all duration-300 hover:bg-gray-50 rounded-lg cursor-pointer mx-auto"
                      style={{
                        width: "390px",
                        height: "56px",
                        padding: "0 12px",
                      }}
                    >
                      {/* Left: Icon Box */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-xl"
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
                          <circle cx="18" cy="8" r="1.5" stroke="#3B82F6" strokeWidth="1.5" />
                          <circle cx="6" cy="16" r="1.5" stroke="#3B82F6" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Middle: Message */}
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#111827",
                            lineHeight: "1.4",
                          }}
                        >
                          New Job Alert: Senior UX Designer at Google
                        </p>
                      </div>

                      {/* Right: Status/Time Stack */}
                      <div className="flex flex-col items-end flex-shrink-0" style={{ gap: "4px" }}>
                        <span
                          className="px-3 py-1 rounded-full text-center"
                          style={{
                            backgroundColor: "#111827", // Navy
                            color: "#FFFFFF",
                            fontSize: "10px",
                            fontWeight: 600,
                            minWidth: "44px",
                          }}
                        >
                          New
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "#6B7280",
                          }}
                        >
                          2 min ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Application Tasks and CV Score Tracker */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left: Hiring Signals Card */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0 bg-[#333333] transition-all duration-300 hover:scale-[1.01]"
                style={{
                  width: "960px",
                  height: "229px",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  padding: "24px",
                  position: "relative",
                  color: "#FFFFFF",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "20px",
                        fontWeight: 400,
                        marginBottom: "4px",
                      }}
                    >
                      Hiring Signals for You
                    </h2>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#9CA3AF",
                      }}
                    >
                      AI insights based on current job market & your profile
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    View Job Trends
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-[1.2fr_1fr_1.5fr_1fr] gap-4">
                  {/* Roles in Demand */}
                  <div>
                    <h3 style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>ROLES IN DEMAND</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[13px] font-medium">
                        Frontend Developer
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] font-medium">
                        React Engineer
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] font-medium">
                        UI Engineer
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div>
                    <h3 style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>TOP LOCATIONS</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[13px] text-gray-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Remote
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Bangalore
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Berlin
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px", letterSpacing: "0.05em" }}>SKILLS INCREASING INTERVIEW CHANCES</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["React Hooks", "System Design", "AWS Basics"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded-full bg-[#4B4B4B] text-[11px] font-medium text-gray-200 text-center"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Market Fit */}
                  <div>
                    <h3 style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", marginBottom: "10px", letterSpacing: "0.05em" }}>YOUR MARKET FIT</h3>
                    <div className="flex flex-col">
                      <span style={{ fontSize: "32px", fontWeight: 400, color: "#F97316", lineHeight: "1" }}>78%</span>
                      <span style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "8px", marginBottom: "12px" }}>match with current openings</span>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F97316] rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CV Score Card */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0 bg-[#FFF9F2] transition-all duration-300 hover:scale-[1.01]"
                style={{
                  width: "430px",
                  height: "229px",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/cvscore")}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "24px",
                      fontWeight: 300,
                      color: "#111827",
                    }}
                  >
                    CV Score
                  </h2>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "42px",
                      fontWeight: 300,
                      color: "#111827",
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

          {/* Third Row: Job Matches and Recommended Courses */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left: Job Matches Card */}
            <div
              className="flex-shrink-0 flex flex-col bg-white"
              style={{
                width: "960px",
                height: "526px",
                borderRadius: "6px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "32px",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "#111827",
                  }}
                >
                  Job Matches
                </h2>
                <button
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111827",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 8px",
                  }}
                  onClick={() => router.push("/explore-jobs")}
                >
                  View All Jobs
                </button>
              </div>

              {/* Job List */}
              <div className="flex flex-col gap-4" style={{ overflowY: "auto", flex: 1 }}>
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
                    className="flex items-center gap-6"
                    style={{
                      width: "100%",
                      height: "85px",
                      flexShrink: 0,
                      padding: "0 20px",
                      border: "1px solid #C1C1C1",
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="16" height="4" rx="1" stroke="black" strokeWidth="2" />
                        <rect x="4" y="10" width="16" height="4" rx="1" stroke="black" strokeWidth="2" />
                        <rect x="4" y="15" width="16" height="4" rx="1" stroke="black" strokeWidth="2" />
                        <circle cx="18" cy="7" r="0.5" fill="black" />
                        <circle cx="18" cy="12" r="0.5" fill="black" />
                        <circle cx="18" cy="17" r="0.5" fill="black" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#111827",
                          marginBottom: "2px",
                        }}
                      >
                        {job.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#111827",
                          marginBottom: "8px",
                        }}
                      >
                        {job.company} • {job.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full"
                            style={{
                              fontSize: "10px",
                              backgroundColor: "#E5E7EB",
                              color: "#6B7280",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-end gap-1">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "#3B82F6",
                        }}
                      >
                        {job.match}
                      </span>
                      <button
                        className="px-4 py-1.5 rounded-lg font-medium"
                        style={{
                          backgroundColor: "#F97316",
                          color: "#FFFFFF",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "8px",
                        }}
                        onClick={() => router.push("/explore-jobs")}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Recommended Courses Card */}
            <div
              className="flex-shrink-0 flex flex-col bg-white"
              style={{
                width: "430px",
                height: "526px",
                borderRadius: "6px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "24px",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  Recommended Courses
                </h2>
              </div>

              {/* Course List */}
              <div className="flex flex-col gap-5" style={{ overflow: "hidden", flex: 1 }}>
                {[
                  {
                    title: "Effective Communication in Tech",
                    duration: "2h 15m",
                    code: "ending\",r={state:function(){return n},always:promise)?e.promise().done(n.resolve).fail(n.re dd(function(){n=s},t[1^e][2].disable,t[2][2]. 0,n=h.call(arguments),r=n.length,i=1!==r||e& r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t >><table></table><a href='/a'>a</a><in typ TagName(\"input\")[0],r.style.cssText=\"top:1px test(r.getAttribute(\"style\")),hrefNormalized:",
                  },
                  {
                    title: "Advanced React Patterns",
                    duration: "3h 30m",
                    code: "const [state, disp] = useRed(red, init); export default function App() { return <div className=\"app-container\"> <Header title=\"Dashboard\" /> <MainLayout> <Sidebar /> <ContentArea /> </MainLayout> </div>; }",
                  },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-xl overflow-hidden border border-gray-100"
                    style={{
                      width: "100%",
                      height: "204px",
                      flexShrink: 0,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
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
                        className="absolute inset-0 opacity-40 p-2"
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
                      <div className="relative z-10">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-3.5 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <h3
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {course.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#111827",
                          }}
                        >
                          {course.duration}
                        </span>
                      </div>
                      <button
                        className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
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

          {/* Fourth Row: Other Cards */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left Column */}
            <div className="flex flex-col gap-6" style={{ width: "244px" }}>
              {/* Additional content can go here */}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
            </div>
          </div>
        </div>
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
