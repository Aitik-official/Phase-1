'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BasicInfoData) => void;
  initialData?: BasicInfoData;
}

export interface BasicInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  dob: string;
  city: string;
  gender: string;
  country: string;
  employment: string;
  notice: string;
}

export default function BasicInfoModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: BasicInfoModalProps) {
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState(initialData?.firstName || '');
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [lastNameValue, setLastNameValue] = useState(initialData?.lastName || '');
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState(initialData?.email || '');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState(initialData?.phone || '');
  const [phoneCode, setPhoneCode] = useState(initialData?.phoneCode || '+1 (USA)');
  const [dobFocused, setDobFocused] = useState(false);
  const [dobValue, setDobValue] = useState(initialData?.dob || '');
  const [cityFocused, setCityFocused] = useState(false);
  const [cityValue, setCityValue] = useState(initialData?.city || '');
  const [genderFocused, setGenderFocused] = useState(false);
  const [genderValue, setGenderValue] = useState(initialData?.gender || '');
  const [countryFocused, setCountryFocused] = useState(false);
  const [countryValue, setCountryValue] = useState(initialData?.country || '');
  const [employmentFocused, setEmploymentFocused] = useState(false);
  const [employmentValue, setEmploymentValue] = useState(initialData?.employment || '');
  const [noticeFocused, setNoticeFocused] = useState(false);
  const [noticeValue, setNoticeValue] = useState(initialData?.notice || '');
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Update values when initialData changes
  useEffect(() => {
    if (initialData) {
      setFirstNameValue(initialData.firstName || '');
      setLastNameValue(initialData.lastName || '');
      setEmailValue(initialData.email || '');
      setPhoneValue(initialData.phone || '');
      setPhoneCode(initialData.phoneCode || '+1 (USA)');
      setDobValue(initialData.dob || '');
      setCityValue(initialData.city || '');
      setGenderValue(initialData.gender || '');
      setCountryValue(initialData.country || '');
      setEmploymentValue(initialData.employment || '');
      setNoticeValue(initialData.notice || '');
    } else {
      // Clear all fields for "Add" mode
      setFirstNameValue('');
      setLastNameValue('');
      setEmailValue('');
      setPhoneValue('');
      setPhoneCode('+1 (USA)');
      setDobValue('');
      setCityValue('');
      setGenderValue('');
      setCountryValue('');
      setEmploymentValue('');
      setNoticeValue('');
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    onSave({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: phoneValue,
      phoneCode,
      dob: dobValue,
      city: cityValue,
      gender: genderValue,
      country: countryValue,
      employment: employmentValue,
      notice: noticeValue,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Edit Basic Information</h2>
            <button
              onClick={onClose}
              className="text-[#9095A1] hover:text-gray-600"
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
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* First Name */}
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={firstNameValue}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      onFocus={() => setFirstNameFocused(true)}
                      onBlur={() => setFirstNameFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        firstNameFocused || firstNameValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        firstNameFocused || firstNameValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        firstNameFocused || firstNameValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      First Name
                    </label>
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        className={`flex-1 px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                          emailFocused || emailValue ? "pt-5" : "pt-3"
                        }`}
                        style={{
                          height: "48.19px",
                          borderRadius: "5.02px",
                          border: "1px solid #99A1AF",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                      <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700" style={{ height: "48.19px" }}>
                        Verified
                      </button>
                    </div>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        emailFocused || emailValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        emailFocused || emailValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative" style={{ width: "140px" }}>
                      <select
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="px-4 pt-3 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 pr-10"
                        style={{
                          width: "100%",
                          height: "48.19px",
                          borderRadius: "5.02px",
                          border: "1px solid #99A1AF",
                          backgroundColor: "#FFFFFF",
                          appearance: "none",
                        }}
                      >
                        <option>+1 (USA)</option>
                        <option>+44 (UK)</option>
                        <option>+91 (India)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="#99A1AF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                          phoneFocused || phoneValue ? "pt-5" : "pt-3"
                        }`}
                        style={{
                          width: "100%",
                          height: "48.19px",
                          borderRadius: "5.02px",
                          border: "1px solid #99A1AF",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                      <label
                        className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                          phoneFocused || phoneValue
                            ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                            : "left-4 top-1/2 -translate-y-1/2 text-sm"
                        }`}
                        style={
                          phoneFocused || phoneValue
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
                </div>

                {/* Date of Birth */}
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
                      type="text"
                      value={dobValue}
                      onChange={(e) => setDobValue(e.target.value)}
                      onFocus={() => setDobFocused(true)}
                      onBlur={() => setDobFocused(false)}
                      onClick={() => dateInputRef.current?.showPicker()}
                      className={`px-4 pb-2 pl-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        dobFocused || dobValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        dobFocused || dobValue
                          ? "left-10 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-10 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        dobFocused || dobValue
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

                {/* Current City */}
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={cityValue}
                      onChange={(e) => setCityValue(e.target.value)}
                      onFocus={() => setCityFocused(true)}
                      onBlur={() => setCityFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        cityFocused || cityValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        cityFocused || cityValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        cityFocused || cityValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Current City
                    </label>
                  </div>
                </div>

                {/* Notice Period */}
                <div className="relative">
                  <div className="relative">
                    <select
                      value={noticeValue}
                      onChange={(e) => setNoticeValue(e.target.value)}
                      onFocus={() => setNoticeFocused(true)}
                      onBlur={() => setNoticeFocused(false)}
                      className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        noticeFocused || noticeValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                    >
                      <option>60 days</option>
                      <option>30 days</option>
                      <option>15 days</option>
                      <option>Immediate</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        noticeFocused || noticeValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        noticeFocused || noticeValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Notice Period
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#99A1AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Last Name */}
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={lastNameValue}
                      onChange={(e) => setLastNameValue(e.target.value)}
                      onFocus={() => setLastNameFocused(true)}
                      onBlur={() => setLastNameFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        lastNameFocused || lastNameValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        lastNameFocused || lastNameValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        lastNameFocused || lastNameValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                {/* Gender */}
                <div className="relative">
                  <div className="relative">
                    <select
                      value={genderValue}
                      onChange={(e) => setGenderValue(e.target.value)}
                      onFocus={() => setGenderFocused(true)}
                      onBlur={() => setGenderFocused(false)}
                      className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        genderFocused || genderValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        genderFocused || genderValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        genderFocused || genderValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Gender
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#99A1AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Current Country */}
                <div className="relative">
                  <div className="relative">
                    <select
                      value={countryValue}
                      onChange={(e) => setCountryValue(e.target.value)}
                      onFocus={() => setCountryFocused(true)}
                      onBlur={() => setCountryFocused(false)}
                      className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        countryFocused || countryValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Canada</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        countryFocused || countryValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        countryFocused || countryValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Current Country
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#99A1AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Employment Status */}
                <div className="relative">
                  <div className="relative">
                    <select
                      value={employmentValue}
                      onChange={(e) => setEmploymentValue(e.target.value)}
                      onFocus={() => setEmploymentFocused(true)}
                      onBlur={() => setEmploymentFocused(false)}
                      className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        employmentFocused || employmentValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                    >
                      <option>Employed</option>
                      <option>Unemployed</option>
                      <option>Self-Employed</option>
                      <option>Student</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        employmentFocused || employmentValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        employmentFocused || employmentValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Employment Status
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#99A1AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
