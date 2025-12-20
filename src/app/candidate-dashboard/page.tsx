"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CandidateDashboardPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 800px 600px at bottom left, #bae6fd 0%, #dbeafe 30%, transparent 70%), radial-gradient(ellipse 800px 600px at 80% 60%, #fed7aa 0%, #fde2e4 30%, transparent 70%), white",
      }}
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/SAASA%20Logo.png"
              alt="SAASA B2E"
              width={110}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className=" flex items-center gap-6 text-sm font-medium">
            <button className="relative text-slate-900">
              Dashboard
              <span className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-10 rounded-full bg-sky-500" />
            </button>
            <button className="text-slate-600 hover:text-slate-900">Jobs</button>
            <button className="text-slate-600 hover:text-slate-900">Courses</button>
            <button className="text-slate-600 hover:text-slate-900">Applications</button>
            <button className="text-slate-600 hover:text-slate-900">Profile</button>
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
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                <Image src="/cv_main.jpg" alt="User avatar" width={32} height={32} className="h-8 w-8 object-cover" />
              </div>
              <div className="hidden text-right text-xs leading-tight sm:block">
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Sachin Dubey
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "#6B7280",
                  }}
                >
                  View Profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-width[1200px] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome & quick actions */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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

          <div className="grid gap-6 lg:grid-cols-[1.6fr,1.1fr]">
            {/* Left column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div
                className="bg-white"
                style={{
                  width: "599px",
                  height: "396px",
                  borderRadius: "10px",
                  padding: "24px",
                  boxShadow:
                    "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 2px rgba(23, 26, 31, 0.3), 0px 0px 0px rgba(0, 0, 0, 0)",
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
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Explore Jobs", image: "/cv_1.jpg" },
                    { title: "AI CV Editor", image: "/cv_2.jpg" },
                    { title: "Application Management", image: "/desktop_icon.png" },
                    { title: "Skill Enhancement", image: "/chat_icon.png" },
                  ].map((item) => (
                    <button
                      key={item.title}
                      className="flex items-center gap-3 text-left transition"
                      style={{
                        width: "267px",
                        height: "128px",
                        borderRadius: "6px",
                        backgroundColor: "#FFFFFF",
                        boxShadow:
                          "0px 0px 2px rgba(23, 26, 31, 0.4), 0px 0px 0px rgba(0, 0, 0, 0.5)",
                        padding: "16px",
                      }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={44}
                          height={44}
                          className="h-11 w-11 object-contain"
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#111827",
                        }}
                      >
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Completion & CV Score */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Completion */}
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Profile Completion
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative h-12 w-12">
                      <svg viewBox="0 0 36 36" className="h-12 w-12">
                        <path
                          d="M18 2.0845
                             a 15.9155 15.9155 0 0 1 0 31.831
                             a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                             a 15.9155 15.9155 0 0 1 0 31.831"
                          fill="none"
                          stroke="#0EA5E9"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          88%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                        }}
                      >
                        Add Resume
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                        }}
                      >
                        Complete Skills
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                        }}
                      >
                        Set Job Preferences
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/completion-profile")}
                    className="mt-4 text-xs font-semibold text-sky-600 hover:text-sky-700"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Complete Profile
                  </button>
                </div>

                {/* CV Score */}
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col items-center justify-between">
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    CV Score
                  </p>
                  <div className="flex flex-col items-center mt-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-sky-500 bg-sky-50">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#0EA5E9",
                        }}
                      >
                        72
                      </span>
                    </div>
                    <p
                      className="mt-2 text-xs"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#6B7280",
                      }}
                    >
                      Based on AI-ATS analysis
                    </p>
                    <div className="mt-3 flex w-full justify-between text-xs text-slate-600">
                      <span>Content</span>
                      <span>90</span>
                    </div>
                    <div className="mt-1 flex w-full justify-between text-xs text-slate-600">
                      <span>Keywords</span>
                      <span>82</span>
                    </div>
                    <div className="mt-1 flex w-full justify-between text-xs text-slate-600">
                      <span>Format</span>
                      <span>83</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Matches */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Job Matches
                  </h2>
                  <button className="text-xs font-semibold text-sky-600 hover:text-sky-700">
                    View All Jobs
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Frontend Developer",
                      company: "Tech Solutions Inc.",
                      location: "New York, USA",
                      tags: ["React", "TypeScript", "UI/UX"],
                      match: "92% Match",
                    },
                    {
                      title: "Backend Engineer",
                      company: "Global Innovations",
                      location: "San Francisco, USA",
                      tags: ["Node.js", "Python", "AWS"],
                      match: "88% Match",
                    },
                    {
                      title: "Data Analyst",
                      company: "Data Insights Co.",
                      location: "London, UK",
                      tags: ["SQL", "Python", "Tableau"],
                      match: "85% Match",
                    },
                  ].map((job, index) => (
                    <div
                      key={job.title}
                      className={`flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 ${
                        index === 0 ? "shadow-sm" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center">
                          <Image
                            src={index === 0 ? "/cv_1.jpg" : index === 1 ? "/cv_2.jpg" : "/cv_main.jpg"}
                            alt={job.title}
                            width={32}
                            height={32}
                            className="h-9 w-9 rounded-md object-cover"
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#111827",
                            }}
                          >
                            {job.title}
                          </p>
                          <p
                            className="mt-1 text-xs"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "#6B7280",
                            }}
                          >
                            {job.company} • {job.location}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#0EA5E9",
                          }}
                        >
                          {job.match}
                        </span>
                        <button className="mt-1 rounded-full bg-sky-600 px 3 py-1 text-xs font-semibold text-white px-3">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Application Status */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
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
                <div className="flex items-center gap-6">
                  <div className="relative h-40 w-40">
                    <svg viewBox="0 0 36 36" className="h-40 w-40">
                      {/* background circle */}
                      <circle cx="18" cy="18" r="16" fill="#F9FAFB" />
                      {/* segments */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="4"
                        strokeDasharray="50 100"
                        strokeDashoffset="25"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="4"
                        strokeDasharray="20 130"
                        strokeDashoffset="-30"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeDasharray="15 135"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#A855F7"
                        strokeWidth="4"
                        strokeDasharray="10 140"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#FBBF24"
                        strokeWidth="4"
                        strokeDasharray="5 145"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        36
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
                  <div className="flex-1 space-y-2 text-sm">
                    {[
                      { label: "Applied", value: 12, color: "#22C55E" },
                      { label: "Under Review", value: 8, color: "#F97316" },
                      { label: "Shortlisted", value: 4, color: "#3B82F6" },
                      { label: "Assessment", value: 3, color: "#A855F7" },
                      { label: "Interview", value: 3, color: "#F59E0B" },
                      { label: "Final Decision", value: 9, color: "#6366F1" },
                    ].map((item) => (
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

              {/* Notifications */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="mb 3 flex items-center justify-between">
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Notifications
                  </h2>
                  <span
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    View All
                  </span>
                </div>
                <div className="mt-2 space-y-3">
                  {[
                    {
                      title: "New Job Alert: Senior UX Designer at Google",
                      time: "2 min ago",
                      icon: "✉️",
                    },
                    {
                      title: "Application Status Update: Data Scientist at Meta is under review",
                      time: "1 hr ago",
                      icon: "📄",
                    },
                    {
                      title: "Interview Scheduled: Product Manager at Amazon on Oct 26",
                      time: "3 hrs ago",
                      icon: "📅",
                    },
                    {
                      title: "New course recommended: Advanced React Hooks",
                      time: "1 day ago",
                      icon: "🎓",
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.title}
                      className={`flex items-start gap-3 ${
                        idx !== 0 ? "pt-3 border-t border-slate-200" : ""
                      }`}
                    >
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm">
                        <span>{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            color: "#111827",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="mt-1 text-xs"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            color: "#6B7280",
                          }}
                        >
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Recommended Courses
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Mastering React Hooks",
                      duration: "4h 30m",
                      image: "/cv_1.jpg",
                    },
                    {
                      title: "Effective Communication in Tech",
                      duration: "2h 15m",
                      image: "/cv_2.jpg",
                    },
                  ].map((course) => (
                    <div
                      key={course.title}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="h-16 w-24 overflow-hidden rounded-md bg-slate-100">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={96}
                          height={64}
                          className="h-16 w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#111827",
                            }}
                          >
                            {course.title}
                          </p>
                          <p
                            className="mt-1 text-xs"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              color: "#6B7280",
                            }}
                          >
                            {course.duration}
                          </p>
                        </div>
                        <button className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700">
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px 6 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 py-4 text-center md:flex-row md:text-left">
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Contact Support</p>
        </div>
      </footer>
    </div>
  );
}