"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [fullNameValue, setFullNameValue] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [nationalityFocused, setNationalityFocused] = useState(false);
  const [nationalityValue, setNationalityValue] = useState("");
  const [dobFocused, setDobFocused] = useState(false);
  const [dobValue, setDobValue] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);
  const [addressValue, setAddressValue] = useState("");
  const [genderFocused, setGenderFocused] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [alternateNumbers, setAlternateNumbers] = useState<string[]>(['']);
  const [alternateNumberFocused, setAlternateNumberFocused] = useState<boolean[]>([false]);
  const [countryFocused, setCountryFocused] = useState(false);
  const [countryValue, setCountryValue] = useState("");
  const [cityFocused, setCityFocused] = useState(false);
  const [cityValue, setCityValue] = useState("");
  const [maritalStatusFocused, setMaritalStatusFocused] = useState(false);
  const [maritalStatusValue, setMaritalStatusValue] = useState("");
  const [passportFocused, setPassportFocused] = useState(false);
  const [passportValue, setPassportValue] = useState("");
  const [linkedinFocused, setLinkedinFocused] = useState(false);
  const [linkedinValue, setLinkedinValue] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const steps = [
    { number: 1, label: "Personal Details", active: true },
    { number: 2, label: "Educational Details", active: false },
    { number: 3, label: "Work Experience", active: false },
    { number: 4, label: "Manage Your Skills", active: false },
    { number: 5, label: "Career Preferences", active: false },
    { number: 6, label: "Salary Expectation", active: false },
    { number: 7, label: "Work Locations & Eligibility", active: false },
    { number: 8, label: "Profile Completion Summary", active: false },
  ];

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
      <div className="relative px-6" style={{ backgroundColor: "transparent", zIndex: 50, paddingTop: "2px", paddingBottom: "12px" }}>
        <div className="relative mx-auto flex max-w-7xl items-start justify-between">
          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center" style={{ flex: 1 }}>
              <div
                className={`relative flex items-center justify-center rounded-full border-2 text-sm font-semibold ${
                  step.active
                    ? "text-white border-transparent"
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
                    : {
                        marginTop: "16px",
                      }
                }
              >
                {step.number}
              </div>
              <p
                className={`mt-2 text-xs ${
                  step.active ? "font-semibold text-slate-900" : "text-slate-500"
                }`}
                style={{ maxWidth: "120px", textAlign: "center", lineHeight: "1.3" }}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6" style={{ paddingTop: "0px", paddingBottom: "32px" }}>
        {/* Title Section */}
        <div className="mb-3 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/uploadcv")}
              className="text-slate-600 hover:text-slate-900 transition"
              style={{ marginLeft: "-40px" }}
              aria-label="Go back to Upload CV"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1
              className="font-medium text-slate-900"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "32.12px",
                lineHeight: "40.2px",
                letterSpacing: "0%",
              }}
            >
              Personal Details
            </h1>
            <Image
              src="/auto_ai.png"
              alt="Auto-filled by AI"
              width={109}
              height={25}
              className="h-auto w-auto"
            />
          </div>
          <p
            className="text-center"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "normal",
              fontSize: "15px",
              lineHeight: "27.9px",
              letterSpacing: "0px",
              color: "#4B5563",
              marginTop: "8px",
            }}
          >
            Review and update your personal information. Some fields
            <br />
             might be pre-filled from your CV.
          </p>
        </div>

        {/* Form */}
        <form
          className="mx-auto flex max-w-2xl flex-col items-center"
          style={{ gap: "21px" }}
        >
          {/* Profile Photo Circle */}
          <div className="relative flex flex-col items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPhotoFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPhotoPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer relative rounded-full border-2 border-gray-300 overflow-hidden hover:border-sky-500 transition-colors"
              style={{
                width: "100px",
                height: "100px",
              }}
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Image
                    src="/perosn_icon.png"
                    alt="User"
                    width={50}
                    height={50}
                    className="h-12 w-12"
                  />
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-1.5 hover:bg-sky-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">Upload Photo</p>
          </div>

          {/* Full Name */}
          <div className="relative">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/perosn_icon.png"
                  alt="Person"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </div>
              <input
                type="text"
                value={fullNameValue}
                onChange={(e) => setFullNameValue(e.target.value)}
                onFocus={() => setFullNameFocused(true)}
                onBlur={() => setFullNameFocused(false)}
                className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                  fullNameFocused || fullNameValue.length > 0 ? "pt-5" : "pt-3"
                }`}
                style={{
                  width: "538.07px",
                  height: "48.19px",
                  borderRadius: "5.02px",
                  border: "1px solid #99A1AF",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <label
                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                  fullNameFocused || fullNameValue.length > 0
                    ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                    : "left-10 top-1/2 -translate-y-1/2 text-sm"
                }`}
                style={
                  fullNameFocused || fullNameValue.length > 0
                    ? {
                        color: "#239CD2",
                      }
                    : undefined
                }
              >
                Full Name
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/email_icon.png"
                  alt="Email"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </div>
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                  emailFocused || emailValue.length > 0 ? "pt-5" : "pt-3"
                }`}
                style={{
                  width: "538.07px",
                  height: "48.19px",
                  borderRadius: "5.02px",
                  border: "1px solid #99A1AF",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <label
                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                  emailFocused || emailValue.length > 0
                    ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                    : "left-10 top-1/2 -translate-y-1/2 text-sm"
                }`}
                style={
                  emailFocused || emailValue.length > 0
                    ? {
                        color: "#239CD2",
                      }
                    : undefined
                }
              >
                Email address
              </label>
            </div>
          </div>

          {/* Phone Number and Alternate Number Row */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Image
                    src="/telephone_icon.png"
                    alt="Telephone"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </div>
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                  className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    phoneFocused || phoneValue.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{
                    width: "240px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    phoneFocused || phoneValue.length > 0
                      ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-10 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    phoneFocused || phoneValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Phone Number
                </label>
              </div>
            </div>
            {alternateNumbers.map((altNum, index) => (
              <div key={index} className="relative">
                <div className="relative flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <Image
                        src="/telephone_icon.png"
                        alt="Telephone"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </div>
                    <input
                      type="tel"
                      value={altNum}
                      onChange={(e) => {
                        const newNumbers = [...alternateNumbers];
                        newNumbers[index] = e.target.value;
                        setAlternateNumbers(newNumbers);
                      }}
                      onFocus={() => {
                        const newFocused = [...alternateNumberFocused];
                        newFocused[index] = true;
                        setAlternateNumberFocused(newFocused);
                      }}
                      onBlur={() => {
                        const newFocused = [...alternateNumberFocused];
                        newFocused[index] = false;
                        setAlternateNumberFocused(newFocused);
                      }}
                      className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        (alternateNumberFocused[index] || altNum.length > 0) ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "240px",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        (alternateNumberFocused[index] || altNum.length > 0)
                          ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-10 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        (alternateNumberFocused[index] || altNum.length > 0)
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Alternate Number{index > 0 ? ` ${index + 1}` : ''}
                    </label>
                  </div>
                  {index === alternateNumbers.length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setAlternateNumbers([...alternateNumbers, '']);
                        setAlternateNumberFocused([...alternateNumberFocused, false]);
                      }}
                      className="flex items-center justify-center rounded-lg border-2 border-sky-500 bg-white text-sky-600 hover:bg-sky-50 transition shrink-0"
                      style={{
                        width: "48.19px",
                        height: "48.19px",
                        borderRadius: "5.02px",
                      }}
                    >
                      <Image
                        src="/plus-icopn.png"
                        alt="Add"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gender and Marital Status Row */}
          <div className="flex items-center" style={{ gap: "23px" }}>
            <div className="relative">
              <div className="relative">
                <select
                  value={genderValue}
                  onChange={(e) => setGenderValue(e.target.value)}
                  onFocus={() => setGenderFocused(true)}
                  onBlur={() => setGenderFocused(false)}
                  className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    genderFocused || genderValue.length > 0 ? "pt-5" : "py-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                    appearance: "none",
                    backgroundImage: genderValue.length > 0 ? "none" : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2399A1AF' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "32px",
                  }}
                >
                  <option value="" disabled hidden></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    genderFocused || genderValue.length > 0
                      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-4 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    genderFocused || genderValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Gender
                </label>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <select
                  value={maritalStatusValue}
                  onChange={(e) => setMaritalStatusValue(e.target.value)}
                  onFocus={() => setMaritalStatusFocused(true)}
                  onBlur={() => setMaritalStatusFocused(false)}
                  className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    maritalStatusFocused || maritalStatusValue.length > 0 ? "pt-5" : "py-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                    appearance: "none",
                    backgroundImage: maritalStatusValue.length > 0 ? "none" : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2399A1AF' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "32px",
                  }}
                >
                  <option value="" disabled hidden></option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    maritalStatusFocused || maritalStatusValue.length > 0
                      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-4 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    maritalStatusFocused || maritalStatusValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Marital Status
                </label>
              </div>
            </div>
          </div>

          {/* Nationality and Date of Birth Row */}
          <div className="flex items-center" style={{ gap: "23px" }}>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={nationalityValue}
                  onChange={(e) => setNationalityValue(e.target.value)}
                  onFocus={() => setNationalityFocused(true)}
                  onBlur={() => setNationalityFocused(false)}
                  className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    nationalityFocused || nationalityValue.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    nationalityFocused || nationalityValue.length > 0
                      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-4 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    nationalityFocused || nationalityValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Nationality
                </label>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => dateInputRef.current?.showPicker()}
                >
                  <Image
                    src="/calendar_icon.png"
                    alt="Calendar"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </div>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dobValue}
                  onChange={(e) => setDobValue(e.target.value)}
                  onFocus={() => setDobFocused(true)}
                  onBlur={() => setDobFocused(false)}
                  onClick={() => dateInputRef.current?.showPicker()}
                  className={`px-4 pb-2 pl-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    dobFocused || dobValue.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                    color: dobValue ? "#1e293b" : "transparent",
                  }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    dobFocused || dobValue.length > 0
                      ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-10 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    dobFocused || dobValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Date of Birth
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/location_icon.png"
                  alt="Location"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </div>
              <input
                type="text"
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
                onFocus={() => setAddressFocused(true)}
                onBlur={() => setAddressFocused(false)}
                className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                  addressFocused || addressValue.length > 0 ? "pt-5" : "pt-3"
                }`}
                style={{
                  width: "538.07px",
                  height: "48.19px",
                  borderRadius: "5.02px",
                  border: "1px solid #99A1AF",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <label
                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                  addressFocused || addressValue.length > 0
                    ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                    : "left-10 top-1/2 -translate-y-1/2 text-sm"
                }`}
                style={
                  addressFocused || addressValue.length > 0
                    ? {
                        color: "#239CD2",
                      }
                    : undefined
                }
              >
                Address
              </label>
            </div>
          </div>

          {/* City and Country Row */}
          <div className="flex items-center" style={{ gap: "23px" }}>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={cityValue}
                  onChange={(e) => setCityValue(e.target.value)}
                  onFocus={() => setCityFocused(true)}
                  onBlur={() => setCityFocused(false)}
                  className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    cityFocused || cityValue.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    cityFocused || cityValue.length > 0
                      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-4 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    cityFocused || cityValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  City
                </label>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={countryValue}
                  onChange={(e) => setCountryValue(e.target.value)}
                  onFocus={() => setCountryFocused(true)}
                  onBlur={() => setCountryFocused(false)}
                  className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                    countryFocused || countryValue.length > 0 ? "pt-5" : "pt-3"
                  }`}
                  style={{
                    width: "259px",
                    height: "48.19px",
                    borderRadius: "5.02px",
                    border: "1px solid #99A1AF",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <label
                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                    countryFocused || countryValue.length > 0
                      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                      : "left-4 top-1/2 -translate-y-1/2 text-sm"
                  }`}
                  style={
                    countryFocused || countryValue.length > 0
                      ? {
                          color: "#239CD2",
                        }
                      : undefined
                  }
                >
                  Country
                </label>
              </div>
            </div>
          </div>

          {/* Passport */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={passportValue}
                onChange={(e) => setPassportValue(e.target.value)}
                onFocus={() => setPassportFocused(true)}
                onBlur={() => setPassportFocused(false)}
                className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                  passportFocused || passportValue.length > 0 ? "pt-5" : "pt-3"
                }`}
                style={{
                  width: "538.07px",
                  height: "48.19px",
                  borderRadius: "5.02px",
                  border: "1px solid #99A1AF",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <label
                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                  passportFocused || passportValue.length > 0
                    ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                    : "left-4 top-1/2 -translate-y-1/2 text-sm"
                }`}
                style={
                  passportFocused || passportValue.length > 0
                    ? {
                        color: "#239CD2",
                      }
                    : undefined
                }
              >
                Passport
              </label>
            </div>
          </div>

          {/* LinkedIn URL */}
          <div className="relative">
            <div className="relative">
              <input
                type="url"
                value={linkedinValue}
                onChange={(e) => setLinkedinValue(e.target.value)}
                onFocus={() => setLinkedinFocused(true)}
                onBlur={() => setLinkedinFocused(false)}
                className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                  linkedinFocused || linkedinValue.length > 0 ? "pt-5" : "pt-3"
                }`}
                style={{
                  width: "538.07px",
                  height: "48.19px",
                  borderRadius: "5.02px",
                  border: "1px solid #99A1AF",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <label
                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                  linkedinFocused || linkedinValue.length > 0
                    ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                    : "left-4 top-1/2 -translate-y-1/2 text-sm"
                }`}
                style={
                  linkedinFocused || linkedinValue.length > 0
                    ? {
                        color: "#239CD2",
                      }
                    : undefined
                }
              >
                LinkedIn URL
              </label>
            </div>
          </div>


          {/* Save & Continue Button */}
          <div>
            <button
              type="button"
              onClick={() => router.push("/edu-details")}
              className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 font-semibold text-white transition hover:bg-sky-700"
              style={{
                width: "538.07px",
                height: "48.19px",
              }}
            >
              Save & Continue
              <span>→</span>
            </button>
          </div>
        </form>
      </main>

    </div>
  );
}
