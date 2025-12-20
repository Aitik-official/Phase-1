'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  
  // Floating label states
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState('John');
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [lastNameValue, setLastNameValue] = useState('Doe');
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('john.doe@example.com');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState('123-456-7890');
  const [phoneCode, setPhoneCode] = useState('+1 (USA)');
  const [dobFocused, setDobFocused] = useState(false);
  const [dobValue, setDobValue] = useState('July 20th, 1990');
  const [cityFocused, setCityFocused] = useState(false);
  const [cityValue, setCityValue] = useState('New York');
  const [genderFocused, setGenderFocused] = useState(false);
  const [genderValue, setGenderValue] = useState('Male');
  const [countryFocused, setCountryFocused] = useState(false);
  const [countryValue, setCountryValue] = useState('United States');
  const [employmentFocused, setEmploymentFocused] = useState(false);
  const [employmentValue, setEmploymentValue] = useState('Employed');
  const [noticeFocused, setNoticeFocused] = useState(false);
  const [noticeValue, setNoticeValue] = useState('60 days');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const profileSections = [
    {
      category: 'PERSONAL DETAILS',
      items: [
        { name: 'Basic Information', status: 'Completed', hasInfo: true },
        { name: 'Summary', status: 'Partially Completed', hasInfo: true },
        { name: 'Gap Explanation', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'WORK HISTORY',
      items: [
        { name: 'Work Experience', status: 'Completed', hasInfo: true },
        { name: 'Internships', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'EDUCATION',
      items: [
        { name: 'Education', status: 'Completed', hasInfo: true },
        { name: 'Academic Achievements', status: 'Partially Completed', hasInfo: true },
        { name: 'Competitive Exams', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'SKILLS',
      items: [
        { name: 'Skills', status: 'Completed', hasInfo: true },
        { name: 'Languages', status: 'Completed', hasInfo: true }
      ]
    },
    {
      category: 'PROJECTS',
      items: [
        { name: 'Projects', status: 'Partially Completed', hasInfo: true },
        { name: 'Portfolio Links', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'CERTIFICATIONS',
      items: [
        { name: 'Certifications', status: 'Completed', hasInfo: true },
        { name: 'Accomplishments', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'PREFERENCES',
      items: [
        { name: 'Career Preferences', status: 'Completed', hasInfo: true },
        { name: 'Employment Details', status: 'Partially Completed', hasInfo: true }
      ]
    },
    {
      category: 'GLOBAL ELIGIBILITY',
      items: [
        { name: 'Visa & Work Authorization', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'RESUME',
      items: [
        { name: 'Resume', status: 'Completed', hasInfo: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'text-green-600';
    if (status === 'Partially Completed') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Main Title Area */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">View and update all sections of your SAASA profile.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit Resume
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              View Public Profile
            </button>
          </div>
        </div>

        {/* Top Section - Three Cards */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your CV/Resume Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your CV/Resume</h3>
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-24 h-24 mb-3">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${85 * 2.83} 283`}
                    strokeLinecap="round"
                    className="rotate-[-90deg] origin-center"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">my_resume_v2.pdf</p>
              <span className="text-xs text-blue-600">AI Analyzed</span>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Upload/Replace Resume
              </button>
              <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700">
                View ATS Score
              </button>
            </div>
          </div>

          {/* AI Profile Insights Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Profile Insights</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Improve your summary to highlight leadership skills.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Add quantifiable achievements to your work experience.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Consider certifications in cloud computing for better matching.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Include a project demonstrating full-stack development expertise.</span>
              </li>
            </ul>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View Insights
            </button>
          </div>

          {/* Your Profile Strength Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="mb-3">
              <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                Moderate
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Based on your current profile completeness and relevance to industry standards.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Complete all missing sections for a 100% profile.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Update your 'Work Experience' with recent roles.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Showcase your 'Portfolio Links' to stand out.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Review 'Career Preferences' for accurate job matching.</span>
              </li>
            </ul>
            <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              Improve My Profile
            </button>
          </div>
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <nav className="space-y-6">
                {profileSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">{section.category}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <button
                            className={`w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 ${
                              sectionIndex === 0 && itemIndex === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            {item.name}
                            {itemIndex < section.items.length - 1 && (
                              <span className="float-right text-gray-400">→</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              {profileSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-8' : ''}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.category}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          {!item.hasInfo && (
                            <p className="text-sm text-gray-500">
                              No information added yet. Add details
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => {
                            if (section.category === 'PERSONAL DETAILS' && item.name === 'Basic Information') {
                              setIsBasicInfoModalOpen(true);
                            }
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Edit &gt;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Basic Information Modal */}
      {isBasicInfoModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsBasicInfoModalOpen(false)}
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
                  onClick={() => setIsBasicInfoModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                    onClick={() => setIsBasicInfoModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsBasicInfoModalOpen(false)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

