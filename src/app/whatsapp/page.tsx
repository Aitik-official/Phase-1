"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const countries = [
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
];

export default function WhatsAppLogin() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [whatsappNumberFocused, setWhatsappNumberFocused] = useState(false);
  const [whatsappNumberValue, setWhatsappNumberValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-auto">
            <img
              src="/SAASA%20Logo.png"
              alt="SAASA B2E"
              className="h-10 w-auto"
            />
          </div>
        </div>
        <a href="#" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
          Help
        </a>
      </header>

      {/* Main content */}
      <main className="-mt-4 flex min-h-[60vh] w-full flex-col gap-0 px-0 pb-0 md:flex-row md:items-stretch">
        {/* Left image panel (65%) static */}
        <div className="relative flex-[65%] min-h-[360px] overflow-hidden bg-black md:min-h-[60vh]">
          <img
            src="/whatsapp_bg_sasas.jpg"
            alt="Visual"
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </div>

        {/* Right form card (35%) with tighter side padding */}
        <div className="flex w-full flex-[35%] items-center justify-center px-2 md:px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 text-center">
              <h1
                className="font-medium text-slate-900"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "22.73px",
                  lineHeight: "30.4px",
                  letterSpacing: "0%",
                }}
              >
                Enter your WhatsApp Number
              </h1>
              <p
                className="mt-1 font-normal text-slate-600"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10.56px",
                  lineHeight: "15.2px",
                  letterSpacing: "0px",
                }}
              >
                We will send a verification code to your WhatsApp account to
                <br />
                confirm your identity.
              </p>
            </div>

              <form className="space-y-4" style={{ marginTop: "41px" }}>
                {/* Combined country selector with dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex h-11 cursor-pointer items-center rounded-[4.4px] border border-slate-200 px-3 text-sm shadow-sm transition hover:border-slate-300"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="font-medium">{selectedCountry.dialCode}</span>
                      <span className="text-slate-400">▾</span>
                    </div>
                    <div className="mx-3 h-6 w-px bg-slate-200" />
                    <div className="text-slate-600">{selectedCountry.name}</div>
                  </div>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition hover:bg-slate-50"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium text-slate-800">
                            {country.dialCode}
                          </span>
                          <span className="text-slate-600">{country.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              {/* WhatsApp number input */}
              <div className="relative">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <Image
                      src="/whatsapp_icon.png"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </div>
                  <input
                    type="tel"
                    value={whatsappNumberValue}
                    onChange={(e) => setWhatsappNumberValue(e.target.value)}
                    onFocus={() => setWhatsappNumberFocused(true)}
                    onBlur={() => setWhatsappNumberFocused(false)}
                    className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                      whatsappNumberFocused || whatsappNumberValue.length > 0 ? "pt-5" : "pt-3"
                    }`}
                    style={{
                      width: "100%",
                      height: "44px",
                      borderRadius: "4.4px",
                      border: "1px solid #99A1AF",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  <label
                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                      whatsappNumberFocused || whatsappNumberValue.length > 0
                        ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                        : "left-10 top-1/2 -translate-y-1/2 text-sm"
                    }`}
                    style={
                      whatsappNumberFocused || whatsappNumberValue.length > 0
                        ? {
                            color: "#239CD2",
                          }
                        : undefined
                    }
                  >
                    WhatsApp Number
                  </label>
                </div>
              </div>

              <p className="text-xs text-slate-500" style={{ marginTop: "5px" }}>
                Use the WhatsApp number you actively use.
              </p>

              <button
                type="button"
                onClick={() => router.push("/whatsapp/verify")}
                className="w-full rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                style={{ marginTop: "30px" }}
              >
                Send OTP on WhatsApp
              </button>
            </form>

            <p
              className="mt-4 text-center font-normal text-slate-500"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11.94px",
                lineHeight: "17.1px",
                letterSpacing: "0px",
              }}
            >
              Your number will only be used for login and job-related notifications.
              <br />
              <a
                href="#"
                className="hover:text-sky-700"
                style={{ color: "#28A8E1" }}
              >
                View Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
          <p>© 2025 SAASA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-700">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

