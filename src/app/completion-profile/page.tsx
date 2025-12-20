"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CompletionProfilePage() {
  const router = useRouter();

  const steps = [
    { number: 1, label: "Personal Details", active: false },
    { number: 2, label: "Educational Details", active: false },
    { number: 3, label: "Work Experience", active: false },
    { number: 4, label: "Manage Your Skills", active: false },
    { number: 5, label: "Career Preferences", active: false },
    { number: 6, label: "Salary Expectation", active: false },
    { number: 7, label: "Work Locations & Eligibility", active: false },
    { number: 8, label: "Profile Completion Summary", active: true },
  ];

  const activeStepNumber = steps.find((s) => s.active)?.number || 8;

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
            <Image src="/SAASA%20Logo.png" alt="SAASA B2E" width={110} height={32} className="h-8 w-auto" />
            <p className="ml-2 text-xs text-sky-600">SUSTAINABLE, WISE AND SUCCESSFUL APPS</p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Upload CV
            </a>
            <a href="#" className="relative text-sm font-medium text-sky-600">
              Profile
              <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky-600" />
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Complete
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
              Help
            </a>
            <div className="h-8 w-8 rounded-full bg-slate-300" />
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div
        className="relative px-6"
        style={{ backgroundColor: "transparent", zIndex: 50, paddingTop: "2px", paddingBottom: "12px" }}
      >
        <div className="relative mx-auto flex max-w-7xl items-start justify-between">
          {steps.map((step) => {
            const isCompleted = step.number < activeStepNumber;
            return (
              <div key={step.number} className="relative z-10 flex flex-col items-center" style={{ flex: 1 }}>
                <div
                  className={`relative flex items-center justify-center rounded-full border-2 text-sm font-semibold ${
                    step.active
                      ? "text-white border-transparent"
                      : isCompleted
                      ? "text-white border-transparent cursor-pointer"
                      : "h-12 w-12 border-slate-300 bg-white text-slate-400"
                  }`}
                  style={
                    step.active
                      ? {
                          height: "80px",
                          width: "80px",
                          backgroundImage: "url('/ornage_stage.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : isCompleted
                      ? {
                          height: "80px",
                          width: "80px",
                          backgroundImage: "url('/blue_2.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : {
                          marginTop: "16px",
                        }
                  }
                  onClick={
                    isCompleted && step.number === 1
                      ? () => router.push("/personal-details")
                      : isCompleted && step.number === 2
                      ? () => router.push("/edu-details")
                      : isCompleted && step.number === 3
                      ? () => router.push("/work-exp")
                      : isCompleted && step.number === 4
                      ? () => router.push("/skills")
                      : isCompleted && step.number === 5
                      ? () => router.push("/career-preferences")
                      : isCompleted && step.number === 6
                      ? () => router.push("/salary-expectation")
                      : undefined
                  }
                >
                  {step.number}
                </div>
                <p
                  className={`mt-2 text-xs ${
                    step.active || isCompleted ? "font-semibold text-slate-900" : "text-slate-500"
                  } ${isCompleted ? "cursor-pointer hover:text-sky-600" : ""}`}
                  style={{ maxWidth: "120px", textAlign: "center", lineHeight: "1.3" }}
                  onClick={
                    isCompleted && step.number === 1
                      ? () => router.push("/personal-details")
                      : isCompleted && step.number === 2
                      ? () => router.push("/edu-details")
                      : isCompleted && step.number === 3
                      ? () => router.push("/work-exp")
                      : isCompleted && step.number === 4
                      ? () => router.push("/skills")
                      : isCompleted && step.number === 5
                      ? () => router.push("/career-preferences")
                      : isCompleted && step.number === 6
                      ? () => router.push("/salary-expectation")
                      : undefined
                  }
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6" style={{ paddingTop: "0px", paddingBottom: "32px" }}>
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {/* Completion Card - matches provided design */}
          <div
            className="w-full rounded-lg bg-white"
            style={{
              width: "538.07px",
              border: "1px solid #38BDF8",
              padding: "24px 32px",
            }}
          >
            {/* Title and subtitle */}
            <h1
              className="text-center text-slate-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: 600,
              }}
            >
              Profile Completion Summary
            </h1>
            <p
              className="mt-2 text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                lineHeight: "20px",
                color: "#6B7280",
              }}
            >
              Congratulations, John! Your profile is almost complete.
            </p>

            {/* Illustration */}
            <div className="mt-5 flex justify-center">
              <Image
                src="/profile%20completionnn.jpg"
                alt="Profile completion illustration"
                width={360}
                height={220}
                className="h-auto w-auto"
              />
            </div>

            {/* Progress label and bar */}
            <div className="mt-5 flex items-center justify-between">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#4B5563",
                }}
              >
                Profile Completion
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#4B5563",
                }}
              >
                88%
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full"
                style={{
                  width: "88%",
                  backgroundColor: "#0EA5E9",
                }}
              />
            </div>

            {/* Your Progress list */}
            <h2
              className="mt-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Your Progress
            </h2>

            <div className="mt-3">
              {[
                "WhatsApp Number Verification",
                "Personal Details",
                "Education",
                "Work Experience",
                "Skills",
                "Career Preferences",
                "Salary Details",
                "Onboarding: Work Locations & Eligibility",
                "Additional Details",
              ].map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                  style={{
                    paddingTop: idx === 0 ? "8px" : "10px",
                    paddingBottom: "10px",
                    borderTop: idx === 0 ? "none" : "1px solid #E5E7EB",
                  }}
                >
                  <Image
                    src="/circle-check-big.svg"
                    alt="Completed"
                    width={18}
                    height={18}
                    className="h-5 w-5"
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#111827",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer text inside card */}
            <p
              className="mt-4 text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#6B7280",
              }}
            >
              You&apos;re all set! Now explore job opportunities and more on your dashboard.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/candidate-profile")}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
          <p>© 2025 SAASA B2E. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-700">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-700">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


