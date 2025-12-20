"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(29);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimer(29);
    setIsResendDisabled(true);
    // Add resend logic here
  };

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
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Verification card */}
          <div
            className="border border-teal-200 bg-white p-8 shadow-lg"
            style={{
              width: "456px",
              height: "468px",
              borderRadius: "3px",
            }}
          >
            <div className="mb-6 text-center">
              <h1
                className="font-medium text-slate-900"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "22.73px",
                  lineHeight: "30.4px",
                  letterSpacing: "0%",
                  marginBottom: "13px",
                }}
              >
                Verify your WhatsApp Number
              </h1>
              <p
                className="font-normal text-slate-600"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.94px",
                  lineHeight: "17.1px",
                  letterSpacing: "0px",
                }}
              >
                We have sent a 6-digit verification code to your WhatsApp account
              </p>
            </div>

            {/* Phone number display */}
            <div className="text-center" style={{ marginBottom: "30px" }}>
              <p
                className="font-normal text-slate-800"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  lineHeight: "15.2px",
                  letterSpacing: "0px",
                }}
              >
                +91 •••••• 1234
              </p>
            </div>

            {/* OTP input with floating label */}
            <div className="relative mb-4">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full rounded-md border border-slate-200 px-4 pb-2 text-center text-lg tracking-widest text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    isFocused || otp.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{ color: "#000000" }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    isFocused || otp.length > 0
                      ? "left-1/2 -top-2.5 -translate-x-1/2 text-xs font-medium bg-white px-1"
                      : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    isFocused || otp.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Verification Code
                </label>
              </div>
            </div>

            {/* Resend code */}
            <div className="mb-6 text-center">
              <p
                className="font-normal text-slate-600"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.94px",
                  lineHeight: "17.1px",
                  letterSpacing: "0px",
                }}
              >
                Didn&apos;t receive the code?{" "}
                {isResendDisabled ? (
                  <span className="text-slate-500">
                    Resend code in {formatTime(timer)}
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sky-600 hover:text-sky-700"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </div>

            {/* Verify button */}
            <button
              type="button"
              className="text-sm font-semibold text-white shadow-sm transition block mx-auto"
              onClick={() => router.push("/uploadcv")}
              style={{
                width: "332px",
                height: "31px",
                borderRadius: "3px",
                backgroundColor: "#239CD2",
                marginBottom: "21px",
              }}
            >
              Verify OTP
            </button>

            {/* Change number link */}
            <div className="mb-4 text-center">
              <button
                onClick={() => router.push("/whatsapp")}
                className="text-sky-600 hover:text-sky-700"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11.94px",
                  lineHeight: "17.1px",
                  letterSpacing: "0px",
                }}
              >
                Change WhatsApp number
              </button>
            </div>

            {/* Explanation text */}
            <p
              className="text-center font-normal text-slate-500"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11.94px",
                lineHeight: "17.1px",
                letterSpacing: "0px",
                marginTop: "33px",
              }}
            >
              This verification helps us protect your account and enable job alerts
              via WhatsApp.
            </p>
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

