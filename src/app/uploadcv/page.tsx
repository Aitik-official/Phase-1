"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UploadCV() {
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
        <div
          style={{
            width: "539px",
            height: "535px",
            borderRadius: "6px",
            border: "1px solid #28A8E1",
            backgroundColor: "#F8F9FA",
          }}
        >
          <div className="px-10 py-12 text-center">
            <h1
              className="font-semibold text-slate-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "27px",
                lineHeight: "30.4px",
                letterSpacing: "0%",
              }}
            >
              Upload Your CV
            </h1>
            <p
              className="mt-2 text-center font-normal text-slate-600"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15.95px",
                lineHeight: "24.8px",
                letterSpacing: "0px",
              }}
            >
              SAASA will analyze your CV and auto-fill your profile using AI.
              <br />
              This saves time and boosts accuracy.
            </p>

            {/* Cards */}
            <div className="mt-8 flex gap-6 justify-center">
              {/* Upload from computer */}
              <div
                className="flex flex-col rounded-lg border border-slate-200 px-6 py-6"
                style={{
                  width: "203.79px",
                  height: "228.6px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/desktop_icon.png"
                    alt="Desktop"
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                </div>
                <p
                  className="text-center font-medium text-slate-900"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "15.95px",
                    lineHeight: "24.8px",
                    letterSpacing: "0px",
                  }}
                >
                  Upload from your computer
                </p>
                <p className="mt-2 text-center text-sm text-slate-600">
                  Browse your local files
                  <br />
                  to upload your CV.
                </p>
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => router.push("/extract")}
                    className="text-white shadow-sm transition hover:opacity-90"
                    style={{
                      width: "173.07px",
                      height: "35.44px",
                      borderRadius: "5px",
                      backgroundColor: "#239CD2",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "500",
                      lineHeight: "normal",
                    }}
                  >
                    Choose File
                  </button>
                </div>
              </div>

              {/* Send via WhatsApp */}
              <div
                className="flex flex-col rounded-lg border border-slate-200 px-6 py-6"
                style={{
                  width: "203.79px",
                  height: "228.6px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="mb-3 flex justify-center">
                  <Image
                    src="/chat_icon.png"
                    alt="WhatsApp"
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                </div>
                <p
                  className="text-center font-medium text-slate-900"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "15.95px",
                    lineHeight: "24.8px",
                    letterSpacing: "0px",
                  }}
                >
                  Send via WhatsApp
                </p>
                <p className="mt-2 text-center text-sm text-slate-600">
                  Easily share your CV from your phone via WhatsApp.
                </p>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="text-white shadow-sm transition hover:opacity-90"
                    style={{
                      width: "173.07px",
                      height: "35.44px",
                      borderRadius: "5px",
                      backgroundColor: "#239CD2",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "500",
                      lineHeight: "normal",
                    }}
                  >
                    Open WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 space-y-2 text-center text-sm text-slate-600">
              <p>
                <span className="text-sky-500">ℹ</span> Supported formats: PDF, DOC, DOCX. Max size:
                5 MB.
              </p>
              <p>
                Our AI will intelligently match your profile with relevant job opportunities.
              </p>
            </div>
          </div>
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

