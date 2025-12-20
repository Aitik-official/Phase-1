"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExtractPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Extracting key skills...");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let statusInterval: NodeJS.Timeout;

    // Simulate progress
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(statusInterval);
          // Navigate to personal-details page when progress completes
          setTimeout(() => {
            router.push("/personal-details");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate status changes
    statusInterval = setInterval(() => {
      setStatus((prev) => {
        if (prev === "Extracting key skills...") {
          return "Analyzing experience...";
        } else if (prev === "Analyzing experience...") {
          return "Processing education...";
        } else {
          return "Extracting key skills...";
        }
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [router]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 800px 600px at bottom left, #bae6fd 0%, #dbeafe 30%, transparent 70%), radial-gradient(ellipse 800px 600px at 80% 60%, #fed7aa 0%, #fde2e4 30%, transparent 70%), white",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/SAASA%20Logo.png"
            alt="SAASA B2E"
            width={110}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <a href="#" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          Help
        </a>
      </header>

      {/* Main content */}
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl text-center">
          {/* Loading circle */}
          <div className="mb-8 flex justify-center">
            <div
              className="animate-spin rounded-full border-4 border-t-transparent"
              style={{
                width: "80px",
                height: "80px",
                borderColor: "#bae6fd",
                borderTopColor: "#239CD2",
              }}
            />
          </div>

          {/* Main message */}
          <h1
            className="mb-4 text-center font-medium text-slate-800"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "30px",
              lineHeight: "36px",
              letterSpacing: "0px",
            }}
          >
            Analyzing your CV using SAASA AI...
          </h1>

          {/* Descriptive text */}
          <p
            className="mb-8 text-center font-normal text-slate-600"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17.5px",
              lineHeight: "28px",
              letterSpacing: "0px",
            }}
          >
            This usually takes a few seconds. We&apos;re extracting your skills, experience,
            education, and more.
          </p>

          {/* Progress bar */}
          <div className="mb-4">
            <div
              className="h-2 rounded-full"
              style={{
                backgroundColor: "#e0f2fe",
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "#239CD2",
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Status message */}
          <p
            className="text-center font-medium text-slate-700"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              lineHeight: "24px",
            }}
          >
            {status}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
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

