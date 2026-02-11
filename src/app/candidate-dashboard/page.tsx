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
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "Inter, sans-serif",
          zIndex: 9999,
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
      <main className="mx-auto max-width[1200px] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome & quick actions */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-4">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#111827" }}
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
              <div>
                <h1
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Welcome, Sachin Dubey!
                </h1>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#6B7280",
                    marginTop: "4px",
                  }}
                >
                  Your AI-powered job search dashboard. Last updated today.
                </p>
              </div>
            </div>
          </div>

          {/* First Row: Three Columns - Profile, Application Status, Notifications */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left Column: Profile Card */}
            <div className="flex-shrink-0">
              <div
                className="bg-white rounded-lg overflow-hidden"
                style={{
                  width: "244px",
                  height: "357px",
                  borderRadius: "24px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(23, 26, 31, 0.3), 0px 0px 0px rgba(0, 0, 0, 0)",
                  position: "relative",
                }}
              >
                {/* Profile Picture with Gradient Overlay */}
                <div className="relative w-full" style={{ height: "357px" }}>
                  <Image
                    src="/Gemini_Generated_Image_xxo7twxxo7twxxo7.png"
                    alt="Anglina Jolie"
                    width={244}
                    height={357}
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
                      Anglina Jolie
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
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: "#F3F4F6",
                      color: "#111827",
                      fontFamily: "Inter, sans-serif",
                      zIndex: 10,
                      borderRadius: "6px",
                    }}
                    onClick={() => router.push("/personal-details")}
                  >
                    view
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Column: Application Status */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0"
                style={{
                  width: "512px",
                  height: "357px",
                  borderRadius: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid rgba(158, 157, 157, 0.8)",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0)",
                  padding: "20px",
                  position: "relative",
                }}
              >
                <h2
                  className="mb-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
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
                className="flex-shrink-0"
                style={{
                  width: "230px",
                  height: "361px",
                  borderRadius: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  border: "1px solid rgba(158, 157, 157, 0.6)",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  padding: "20px",
                }}
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
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  {/* Notification Item 1 */}
                  <div
                    className="flex flex-col"
                    style={{
                      width: "205px",
                      height: "77px",
                      borderRadius: "0px",
                      padding: "8px",
                    }}
                  >
                    {/* Top Row: New Tag and Timestamp */}
                    <div className="flex items-start justify-between mb-2">
                      {/* Left: New Tag */}
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#4B5563",
                          color: "#FFFFFF",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRadius: "12px",
                        }}
                      >
                        New
                      </span>
                      {/* Right: Timestamp */}
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#6B7280",
                        }}
                      >
                        2 min ago
                      </span>
                    </div>
                    {/* Bottom Row: Icon and Text */}
                    <div className="flex items-start gap-2">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#FCE7F3",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#EF4444" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {/* Text */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#111827",
                          fontWeight: 400,
                          lineHeight: "1.4",
                          margin: 0,
                        }}
                      >
                        New Job Alert: Senior UX Designer at Google
                      </p>
                    </div>
                  </div>

                  {/* Notification Item 2 */}
                  <div
                    className="flex flex-col"
                    style={{
                      width: "205px",
                      height: "77px",
                      borderRadius: "0px",
                      padding: "8px",
                    }}
                  >
                    {/* Top Row: New Tag and Timestamp */}
                    <div className="flex items-start justify-between mb-2">
                      {/* Left: New Tag */}
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#4B5563",
                          color: "#FFFFFF",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRadius: "12px",
                        }}
                      >
                        New
                      </span>
                      {/* Right: Timestamp */}
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#6B7280",
                        }}
                      >
                        2 min ago
                      </span>
                    </div>
                    {/* Bottom Row: Icon and Text */}
                    <div className="flex items-start gap-2">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#FCE7F3",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#EF4444" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {/* Text */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#111827",
                          fontWeight: 400,
                          lineHeight: "1.4",
                          margin: 0,
                        }}
                      >
                        New Job Alert: Senior UX Designer at Google
                      </p>
                    </div>
                  </div>

                  {/* Notification Item 3 */}
                  <div
                    className="flex flex-col"
                    style={{
                      width: "205px",
                      height: "77px",
                      borderRadius: "0px",
                      padding: "8px",
                    }}
                  >
                    {/* Top Row: New Tag and Timestamp */}
                    <div className="flex items-start justify-between mb-2">
                      {/* Left: New Tag */}
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "#4B5563",
                          color: "#FFFFFF",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRadius: "12px",
                        }}
                      >
                        New
                      </span>
                      {/* Right: Timestamp */}
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#6B7280",
                        }}
                      >
                        2 min ago
                      </span>
                    </div>
                    {/* Bottom Row: Icon and Text */}
                    <div className="flex items-start gap-2">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#FCE7F3",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#EF4444" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {/* Text */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#111827",
                          fontWeight: 400,
                          lineHeight: "1.4",
                          margin: 0,
                        }}
                      >
                        New Job Alert: Senior UX Designer at Google
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Application Tasks and CV Score Tracker */}
          <div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left: Application Tasks Card */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0"
                style={{
                  width: "778px",
                  height: "197px",
                  borderRadius: "17px",
                  backgroundColor: "#2D2D2D",
                  border: "1px solid rgba(188, 181, 181, 1)",
                  borderStyle: "solid",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  padding: "20px",
                  position: "relative",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    Application Tasks
                  </h2>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    2/4
                  </span>
                </div>
                {/* Tasks List - Horizontal */}
                <div className="flex items-start" style={{ gap: "12px" }}>
                  {/* Task 1: Onboarding */}
                  <div
                    className="flex items-center"
                    style={{
                      width: "160.48px",
                      height: "62.9px",
                      borderRadius: "11.29px",
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "36px",
                        height: "26px",
                        borderRadius: "8px",
                        backgroundColor: "#4B4B4B",
                        marginRight: "10px",
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="6" width="18" height="12" rx="2" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <circle cx="9" cy="12" r="2" fill="#FFFFFF" />
                      </svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex flex-col" style={{ gap: "2px" }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Onboarding
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          color: "#9CA3AF",
                        }}
                      >
                        Sep 13, 08:30
                      </span>
                    </div>
                    {/* Status - Yellow checkmark - properly sized circle with non-compressed checkmark */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#FACC15",
                        marginLeft: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                        <path d="M20 6L9 17L4 12" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Task 2: Skills Matching */}
                  <div
                    className="flex items-center"
                    style={{
                      width: "160.48px",
                      height: "62.9px",
                      borderRadius: "11.29px",
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "36px",
                        height: "26px",
                        borderRadius: "8px",
                        backgroundColor: "#4B4B4B",
                        marginRight: "10px",
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <circle cx="9" cy="7" r="4" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex flex-col" style={{ gap: "2px" }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Skills Matching
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          color: "#9CA3AF",
                        }}
                      >
                        Sep 13, 10:00
                      </span>
                    </div>
                    {/* Status - Yellow checkmark - properly sized circle with non-compressed checkmark */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#FACC15",
                        marginLeft: "16px",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                        <path d="M20 6L9 17L4 12" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Task 3: Project Update */}
                  <div
                    className="flex items-center"
                    style={{
                      width: "160.48px",
                      height: "62.9px",
                      borderRadius: "11.29px",
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "36px",
                        height: "26px",
                        borderRadius: "8px",
                        backgroundColor: "#4B4B4B",
                        marginRight: "10px",
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <polyline points="14 2 14 8 20 8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                        <line x1="12" y1="18" x2="12" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                        <polyline points="9 15 12 12 15 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex flex-col" style={{ gap: "2px" }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Project Update
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          color: "#9CA3AF",
                        }}
                      >
                        Sep 13, 14:00
                      </span>
                    </div>
                    {/* Status - Gray filled circle */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "18px",
                        height: "18px",
                        backgroundColor: "#6B7280",
                        marginLeft: "16px",
                        flexShrink: 0,
                      }}
                    ></div>
                  </div>

                  {/* Task 4: HR policy */}
                  <div
                    className="flex items-center"
                    style={{
                      width: "160.48px",
                      height: "62.9px",
                      borderRadius: "11.29px",
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "36px",
                        height: "26px",
                        borderRadius: "8px",
                        backgroundColor: "#4B4B4B",
                        marginRight: "10px",
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex flex-col" style={{ gap: "2px" }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        HR policy
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          color: "#9CA3AF",
                        }}
                      >
                        Sep 13, 15:00
                      </span>
                    </div>
                    {/* Status - Hollow gray circle */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid #9CA3AF",
                        backgroundColor: "transparent",
                        marginLeft: "16px",
                        flexShrink: 0,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CV Score Tracker Card */}
            <div className="flex-shrink-0">
              <div
                className="flex-shrink-0"
                style={{
                  width: "236px",
                  height: "196px",
                  borderRadius: "17.96px",
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  border: "1px solid rgba(158, 157, 157, 0.8)",
                  borderStyle: "solid",
                  boxShadow: "0px 0.75px 2.24px 0px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  position: "relative",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    CV Score Tracker
                  </h2>
                  {/* Action Icon - Arrow pointing out of square */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer", flexShrink: 0 }}>
                    <rect x="3" y="3" width="14" height="14" rx="1.5" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                    <path d="M7 3h6v6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <line x1="13" y1="3" x2="21" y2="11" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="17" y1="3" x2="21" y2="3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="21" y1="3" x2="21" y2="7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                {/* CV Score Visualization */}
                <div className="flex items-center justify-center">
                  <div className="relative" style={{ width: "120px", height: "120px" }}>
                    {/* Dotted Circle Outline */}
                    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                        strokeDasharray="4 4"
                      />
                      {/* Yellow Segments */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#FACC15"
                        strokeWidth="4"
                        strokeDasharray={`${(72 / 100) * 282.74} 282.74`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        72
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#9CA3AF",
                        }}
                      >
                        CV Score
                      </span>
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
              className="flex flex-col"
              style={{
                width: "700px",
                height: "580px",
                borderRadius: "17px",
                backgroundColor: "rgba(255, 255, 255, 1)",
                opacity: "100%",
                border: "1px solid rgba(158, 157, 157, 0.8)",
                boxShadow: "0px 3.05px 3.05px rgba(0, 0, 0, 0.25)",
                padding: "24px",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
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
                >
                  View All Jobs
                </button>
              </div>
              {/* Job List */}
              <div className="flex flex-col gap-4" style={{ overflowY: "auto", flex: 1 }}>
                {/* Job 1: Frontend Developer */}
                <div
                  className="flex items-center gap-4 relative"
                  style={{
                    width: "100%",
                    height: "85px",
                    borderRadius: "10.66px",
                    backgroundColor: "#FFFFFF",
                    border: "0.76px solid #C6C6C6",
                    boxShadow: "0px 0.76px 1.52px rgba(0, 0, 0, 0.07)",
                    padding: "12px 16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#DBEAFE",
                      borderRadius: "8px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" fill="#3B82F6" opacity="0.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" fill="#3B82F6" />
                      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        Frontend Developer
                      </h3>

                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Tech Solutions Inc. New York, USA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "UI/UX"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#F3F4F6",
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
                  <div className="flex flex-col items-end gap-3">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      92% Match
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#F97316",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Job 2: Backend Engineer */}
                <div
                  className="flex items-center gap-4 relative"
                  style={{
                    width: "100%",
                    height: "85px",
                    borderRadius: "10.66px",
                    backgroundColor: "#FFFFFF",
                    border: "0.76px solid #C6C6C6",
                    boxShadow: "0px 0.76px 1.52px rgba(0, 0, 0, 0.07)",
                    padding: "12px 16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#D1FAE5",
                      borderRadius: "8px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" fill="#10B981" opacity="0.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" fill="#10B981" />
                      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        Backend Engineer
                      </h3>

                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Global Innovations San Francisco, USA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Python", "AWS"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#F3F4F6",
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
                  <div className="flex flex-col items-end gap-3">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      88% Match
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#F97316",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Job 3: Data Analyst */}
                <div
                  className="flex items-center gap-4 relative"
                  style={{
                    width: "100%",
                    height: "85px",
                    borderRadius: "10.66px",
                    backgroundColor: "#FFFFFF",
                    border: "0.76px solid #C6C6C6",
                    boxShadow: "0px 0.76px 1.52px rgba(0, 0, 0, 0.07)",
                    padding: "12px 16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#DBEAFE",
                      borderRadius: "8px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" fill="#3B82F6" opacity="0.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" fill="#3B82F6" />
                      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        Data Analyst
                      </h3>

                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Analytics Corp. Boston, USA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["SQL", "Python", "Tableau"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#F3F4F6",
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
                  <div className="flex flex-col items-end gap-3">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      85% Match
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#F97316",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Job 4: Full Stack Developer */}
                <div
                  className="flex items-center gap-4 relative"
                  style={{
                    width: "100%",
                    height: "85px",
                    borderRadius: "10.66px",
                    backgroundColor: "#FFFFFF",
                    border: "0.76px solid #C6C6C6",
                    boxShadow: "0px 0.76px 1.52px rgba(0, 0, 0, 0.07)",
                    padding: "12px 16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#DBEAFE",
                      borderRadius: "8px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" fill="#3B82F6" opacity="0.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" fill="#3B82F6" />
                      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        Full Stack Developer
                      </h3>

                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Digital Innovations Inc. Seattle, USA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "MongoDB"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#F3F4F6",
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
                  <div className="flex flex-col items-end gap-3">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      90% Match
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#F97316",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Job 5: UI/UX Designer */}
                <div
                  className="flex items-center gap-4 relative"
                  style={{
                    width: "100%",
                    height: "85px",
                    borderRadius: "10.66px",
                    backgroundColor: "#FFFFFF",
                    border: "0.76px solid #C6C6C6",
                    boxShadow: "0px 0.76px 1.52px rgba(0, 0, 0, 0.07)",
                    padding: "12px 16px",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#DBEAFE",
                      borderRadius: "8px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" fill="#3B82F6" opacity="0.2" />
                      <rect x="6" y="6" width="12" height="12" rx="1" fill="#3B82F6" />
                      <rect x="8" y="8" width="8" height="8" fill="#FFFFFF" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        UI/UX Designer
                      </h3>

                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        marginBottom: "4px",
                      }}
                    >
                      Creative Studio LLC. Los Angeles, USA
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Figma", "Sketch", "Adobe XD"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#F3F4F6",
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
                  <div className="flex flex-col items-end gap-3">
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#3B82F6",
                      }}
                    >
                      87% Match
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#F97316",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div >

            {/* Right: Recommended Courses Card */}
            < div
              className="flex flex-col"
              style={{
                width: "320px",
                height: "580px",
                borderRadius: "17px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(158, 157, 157, 0.8)",
                boxShadow: "0px 3.05px 3.05px rgba(0, 0, 0, 0.25)",
                padding: "24px",
              }
              }
            >
              {/* Header */}
              < div className="mb-4" >
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Recommended Courses
                </h2>
              </div >
              {/* Course List */}
              < div className="flex flex-col gap-4" style={{ overflowY: "auto", flex: 1 }}>
                {/* Course 1 */}
                < div
                  className="flex flex-col rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Code Snippet */}
                  < div
                    className="px-4 py-3"
                    style={{
                      backgroundColor: "#1E293B",
                      fontFamily: "Monaco, 'Courier New', monospace",
                      fontSize: "11px",
                      color: "#E2E8F0",
                      lineHeight: "1.5",
                    }}
                  >
                    <div style={{ color: "#60A5FA" }}>function</div>
                    <div style={{ color: "#FBBF24", marginLeft: "16px" }}>communicate</div>
                    <div style={{ color: "#E2E8F0", marginLeft: "16px" }}>(</div>
                    <div style={{ color: "#34D399", marginLeft: "32px" }}>message</div>
                    <div style={{ color: "#E2E8F0" }}>)</div>
                  </div >
                  {/* Course Info */}
                  < div className="px-4 py-3" >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "4px",
                      }}
                    >
                      Effective Communication in Tech
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#6B7280",
                        marginBottom: "8px",
                      }}
                    >
                      2h 15m
                    </p>
                    <button
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#3B82F6",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      View Course
                    </button>
                  </div >
                </div >

                {/* Course 2 */}
                < div
                  className="flex flex-col rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Code Snippet */}
                  < div
                    className="px-4 py-3"
                    style={{
                      backgroundColor: "#1E293B",
                      fontFamily: "Monaco, 'Courier New', monospace",
                      fontSize: "11px",
                      color: "#E2E8F0",
                      lineHeight: "1.5",
                    }}
                  >
                    <div style={{ color: "#60A5FA" }}>const</div>
                    <div style={{ color: "#FBBF24", marginLeft: "8px" }}>learn</div>
                    <div style={{ color: "#E2E8F0" }}> = </div>
                    <div style={{ color: "#34D399" }}>"React"</div>
                    <div style={{ color: "#E2E8F0" }}>;</div>
                  </div >
                  {/* Course Info */}
                  < div className="px-4 py-3" >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "4px",
                      }}
                    >
                      Advanced React Patterns
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#6B7280",
                        marginBottom: "8px",
                      }}
                    >
                      3h 30m
                    </p>
                    <button
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "#3B82F6",
                        color: "#FFFFFF",
                        fontFamily: "Inter, sans-serif",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      View Course
                    </button>
                  </div >
                </div >
              </div >
            </div >
          </div >

          {/* Fourth Row: Other Cards */}
          < div className="flex items-start justify-center mb-6" style={{ gap: "24px" }}>
            {/* Left Column */}
            < div className="flex flex-col gap-6" style={{ width: "244px" }}>
              {/* Additional content can go here */}
            </div >

            {/* Right Column */}
            < div className="flex flex-col gap-6" >



            </div >
          </div >

        </div >
      </main >

      {/* Footer */}
      < footer className="border-t border-slate-200 bg-white px 6 py-4 text-xs text-slate-500" >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 py-4 text-center md:flex-row md:text-left">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Contact Support</p>
        </div>
      </footer >
    </div >
  );
}


