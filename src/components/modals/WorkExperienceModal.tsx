'use client';

import { useState } from 'react';

interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: WorkExperienceData) => void;
  initialData?: WorkExperienceData;
}

export interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  employmentType: string;
  industryDomain: string;
  numberOfReportees: string;
  startDate: string;
  endDate: string;
  currentlyWorkHere: boolean;
  workLocation: string;
  workMode: string;
  companyProfile: string;
  companyTurnover: string;
  keyResponsibilities: string;
  achievements: string;
  workSkills: string[];
}

export default function WorkExperienceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: WorkExperienceModalProps) {
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [employmentType, setEmploymentType] = useState(initialData?.employmentType || '');
  const [industryDomain, setIndustryDomain] = useState(initialData?.industryDomain || '');
  const [numberOfReportees, setNumberOfReportees] = useState(initialData?.numberOfReportees || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(initialData?.currentlyWorkHere ?? true);
  const [workLocation, setWorkLocation] = useState(initialData?.workLocation || '');
  const [workMode, setWorkMode] = useState(initialData?.workMode || '');
  const [companyProfile, setCompanyProfile] = useState(initialData?.companyProfile || '');
  const [companyTurnover, setCompanyTurnover] = useState(initialData?.companyTurnover || '');
  const [keyResponsibilities, setKeyResponsibilities] = useState(initialData?.keyResponsibilities || '');
  const [achievements, setAchievements] = useState(initialData?.achievements || '');
  const [workSkillsInput, setWorkSkillsInput] = useState('');
  const [workSkills, setWorkSkills] = useState<string[]>(initialData?.workSkills || []);

  const handleSave = () => {
    onSave({
      jobTitle,
      companyName,
      employmentType,
      industryDomain,
      numberOfReportees,
      startDate,
      endDate,
      currentlyWorkHere,
      workLocation,
      workMode,
      companyProfile,
      companyTurnover,
      keyResponsibilities,
      achievements,
      workSkills,
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
            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            <button
              onClick={onClose}
              className="text-[#9095A1] hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-6 space-y-6">
            {/* Basic Information Section - Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Developer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select employment type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>

                {/* Number of Reportees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Reportees
                  </label>
                  <input
                    type="number"
                    value={numberOfReportees}
                    onChange={(e) => setNumberOfReportees(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    How many people directly reported to you in this role?
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., TCS, Deloitte, Amazon"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Industry / Domain */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry / Domain
                  </label>
                  <select
                    value={industryDomain}
                    onChange={(e) => setIndustryDomain(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select Industry / Domain</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Dates</h3>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Pick a date"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9095A1] pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Pick a date"
                    disabled={currentlyWorkHere}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9095A1] pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentlyWorkHere}
                    onChange={(e) => {
                      setCurrentlyWorkHere(e.target.checked);
                      if (e.target.checked) {
                        setEndDate('');
                      }
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm text-blue-600 font-medium">I currently work here</span>
                </label>
              </div>
            </div>
            </div>

            {/* Location & Mode Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Location & Mode</h3>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Location
                </label>
                <input
                  type="text"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Mode
                </label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                >
                  <option value="">Select work mode</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>
            </div>

            {/* Company Profile Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Company Profile</h3>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Profile
              </label>
              <div className="relative">
                <textarea
                  value={companyProfile}
                  onChange={(e) => setCompanyProfile(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none pr-16"
                  placeholder="Brief description of the company during your tenure (size, business focus)"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
                <p className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {companyProfile.length}/500
                </p>
              </div>
            </div>
            </div>

            {/* Company Turnover Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Company Turnover</h3>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Turnover
              </label>
              <select
                value={companyTurnover}
                onChange={(e) => setCompanyTurnover(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                }}
              >
                <option value="">Select annual revenue</option>
                <option value="less-than-1m">Less than $1M</option>
                <option value="1m-10m">$1M - $10M</option>
                <option value="10m-50m">$10M - $50M</option>
                <option value="50m-100m">$50M - $100M</option>
                <option value="more-than-100m">More than $100M</option>
              </select>
            </div>
            </div>

            {/* Role Details Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Role Details</h3>
              
              {/* Key Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Responsibilities
                </label>
                <textarea
                  value={keyResponsibilities}
                  onChange={(e) => setKeyResponsibilities(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your main tasks, duties, and contributions..."
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements
                </label>
                <textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Highlight major results, improvements, awards, metrics, etc."
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Skills Used Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Skills Used</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Used
                </label>
                <div className="flex gap-2">
                <input
                  type="text"
                  value={workSkillsInput}
                  onChange={(e) => setWorkSkillsInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && workSkillsInput.trim()) {
                      setWorkSkills([...workSkills, workSkillsInput.trim()]);
                      setWorkSkillsInput('');
                    }
                  }}
                  placeholder="Add skills you applied in this role..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (workSkillsInput.trim()) {
                      setWorkSkills([...workSkills, workSkillsInput.trim()]);
                      setWorkSkillsInput('');
                    }
                  }}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              {workSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {workSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => {
                          setWorkSkills(workSkills.filter((_, i) => i !== index));
                        }}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            </div>

            {/* Upload Documents Section */}
            <div>
              <button
                type="button"
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="text-sm font-medium">Upload Your Work Experience Certificates/Documents</span>
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Save Internship
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
