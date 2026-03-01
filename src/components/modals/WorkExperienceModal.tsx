'use client';

import { useState, useEffect } from 'react';
import GapExplanationModal, { GapExplanationData } from './GapExplanationModal';

interface WorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: WorkExperienceData) => void;
  initialData?: WorkExperienceData;
}

export interface WorkExperienceEntry {
  id: string;
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

export interface WorkExperienceData {
  workExperiences: WorkExperienceEntry[];
}

export default function WorkExperienceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: WorkExperienceModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [industryDomain, setIndustryDomain] = useState('');
  const [numberOfReportees, setNumberOfReportees] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);
  const [workLocation, setWorkLocation] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [companyProfile, setCompanyProfile] = useState('');
  const [companyTurnover, setCompanyTurnover] = useState('');
  const [keyResponsibilities, setKeyResponsibilities] = useState('');
  const [achievements, setAchievements] = useState('');
  const [workSkillsInput, setWorkSkillsInput] = useState('');
  const [workSkills, setWorkSkills] = useState<string[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceEntry[]>(initialData?.workExperiences || []);
  const [expandedEntries, setExpandedEntries] = useState<{ [key: string]: boolean }>({});
  const [isGapModalOpen, setIsGapModalOpen] = useState(false);
  const [gapInfo, setGapInfo] = useState<{
    gapYears: number;
    gapMonths: number;
    gapDays?: number;
    fromDate: string;
    toDate: string;
  } | null>(null);
  const [gapExplanationData, setGapExplanationData] = useState<GapExplanationData | undefined>();

  useEffect(() => {
    if (initialData) {
      setWorkExperiences(initialData.workExperiences || []);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const clearFormFields = () => {
    setJobTitle('');
    setCompanyName('');
    setEmploymentType('');
    setIndustryDomain('');
    setNumberOfReportees('');
    setStartDate('');
    setEndDate('');
    setCurrentlyWorkHere(false);
    setWorkLocation('');
    setWorkMode('');
    setCompanyProfile('');
    setCompanyTurnover('');
    setKeyResponsibilities('');
    setAchievements('');
    setWorkSkillsInput('');
    setWorkSkills([]);
  };

  const resetForm = () => {
    clearFormFields();
    setWorkExperiences([]);
    setExpandedEntries({});
  };

  const handleAddWorkExperience = () => {
    if (!jobTitle.trim()) {
      alert('Please enter Job Title.');
      return;
    }
    if (!companyName.trim()) {
      alert('Please enter Company Name.');
      return;
    }
    if (!employmentType) {
      alert('Please select Employment Type.');
      return;
    }
    if (!startDate) {
      alert('Please select Start Date.');
      return;
    }

    // Check for gap before adding (only if there are existing experiences and gap modal is not already open)
    if (!isGapModalOpen) {
      const hasGap = checkForGapAndShowModal(startDate);
      
      if (hasGap) {
        // Don't add yet, wait for user to acknowledge the gap in the modal
        return;
      }
    } else {
      // If gap modal is already open, don't check again - user needs to close or save it first
      return;
    }

    // If no gap or first experience, proceed with adding
    addWorkExperienceEntry();
  };

  const addWorkExperienceEntry = () => {
    const newEntry: WorkExperienceEntry = {
      id: Date.now().toString(),
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
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
    };

    // Add the new entry to the list
    setWorkExperiences([...workExperiences, newEntry]);
    
    // Clear only the form fields for the next entry
    clearFormFields();
    
    // Close gap modal if open
    setIsGapModalOpen(false);
    setGapInfo(null);
  };

  const handleGapExplanationSave = (data: GapExplanationData) => {
    setGapExplanationData(data);
    // Close the gap modal
    setIsGapModalOpen(false);
    // After saving gap explanation, proceed to add the work experience
    addWorkExperienceEntry();
  };

  const getGapDurationText = () => {
    if (!gapInfo) return '6 months - 1 year';
    const { gapYears, gapMonths } = gapInfo;
    
    if (gapYears === 0 && gapMonths < 3) {
      return 'Less than 3 months';
    } else if (gapYears === 0 && gapMonths < 6) {
      return '3-6 months';
    } else if (gapYears === 0) {
      return '6 months - 1 year';
    } else if (gapYears === 1) {
      return '1-2 years';
    } else {
      return 'More than 2 years';
    }
  };

  const handleRemoveWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(entry => entry.id !== id));
  };

  const toggleExpandEntry = (id: string) => {
    setExpandedEntries({
      ...expandedEntries,
      [id]: !expandedEntries[id]
    });
  };

  const formatDateRange = (startDate: string, endDate: string, currentlyWorkHere: boolean) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const day = String(start.getDate()).padStart(2, '0');
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const year = start.getFullYear();
    const startFormatted = `${day}-${month}-${year}`;
    
    if (currentlyWorkHere || !endDate) {
      return `${startFormatted} - Present`;
    }
    
    const end = new Date(endDate);
    const endDay = String(end.getDate()).padStart(2, '0');
    const endMonth = String(end.getMonth() + 1).padStart(2, '0');
    const endYear = end.getFullYear();
    const endFormatted = `${endDay}-${endMonth}-${endYear}`;
    
    return `${startFormatted} - ${endFormatted}`;
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    try {
      // Handle YYYY-MM-DD format (from date input)
      if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return new Date(dateString + 'T00:00:00');
      }
      
      // Handle DD-MM-YYYY format
      if (dateString.includes('-') && dateString.split('-').length === 3) {
        const parts = dateString.split('-');
        if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
          // DD-MM-YYYY
          return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`);
        }
      }
      
      // Handle MM/DD/YYYY or DD/MM/YYYY format
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          // Try MM/DD/YYYY first (most common)
          const month = parseInt(parts[0]);
          const day = parseInt(parts[1]);
          if (month > 12) {
            // Must be DD/MM/YYYY
            return new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T00:00:00`);
          } else {
            // Assume MM/DD/YYYY
            return new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}T00:00:00`);
          }
        }
      }
      
      // Try default Date parsing
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date;
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return null;
    }
  };

  const calculateGap = (previousEndDate: string, newStartDate: string) => {
    if (!previousEndDate || !newStartDate) {
      console.log('Missing dates for gap calculation');
      return null;
    }
    
    const prevEnd = parseDate(previousEndDate);
    const newStart = parseDate(newStartDate);
    
    if (!prevEnd || !newStart) {
      console.log('Invalid dates - prevEnd:', prevEnd, 'newStart:', newStart);
      return null;
    }
    
    // Check if dates are valid
    if (isNaN(prevEnd.getTime()) || isNaN(newStart.getTime())) {
      console.log('Invalid date values');
      return null;
    }
    
    console.log('Comparing dates - Previous End:', prevEnd.toISOString(), 'New Start:', newStart.toISOString());
    
    // Check if new start date is actually after previous end date
    // Add 1 day buffer to account for same-day transitions
    const prevEndPlusOne = new Date(prevEnd);
    prevEndPlusOne.setDate(prevEndPlusOne.getDate() + 1);
    
    if (newStart <= prevEndPlusOne) {
      console.log('No gap - new start is not after previous end (or within 1 day)');
      return null; // No gap, dates overlap or are continuous (within 1 day)
    }
    
    // Calculate the difference in milliseconds
    const diffTime = newStart.getTime() - prevEnd.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    console.log('Days difference:', diffDays);
    
    // Calculate years, months, and days
    let gapYears = 0;
    let gapMonths = 0;
    let gapDays = diffDays;
    
    // Calculate years
    if (diffDays >= 365) {
      gapYears = Math.floor(diffDays / 365);
      gapDays = diffDays % 365;
    }
    
    // Calculate months from remaining days
    if (gapDays >= 30) {
      gapMonths = Math.floor(gapDays / 30);
      gapDays = gapDays % 30;
    }
    
    console.log('Gap calculated - Years:', gapYears, 'Months:', gapMonths, 'Days:', gapDays);
    
    // Return gap info for ANY gap (even if just days)
    return {
      gapYears,
      gapMonths,
      gapDays,
      fromDate: previousEndDate,
      toDate: newStartDate,
    };
  };

  const checkForGapAndShowModal = (newStartDate: string) => {
    if (!newStartDate || workExperiences.length === 0) {
      console.log('Cannot check gap - missing start date or no previous experiences');
      return false;
    }
    
    const lastExperience = workExperiences[workExperiences.length - 1];
    let previousEndDate = lastExperience.endDate;
    
    console.log('Checking gap - Last experience:', lastExperience);
    console.log('Previous end date:', previousEndDate);
    console.log('Currently working:', lastExperience.currentlyWorkHere);
    
    // If currently working or no end date, use today's date
    if (lastExperience.currentlyWorkHere || !previousEndDate) {
      const today = new Date();
      previousEndDate = today.toISOString().split('T')[0];
      console.log('Using today as previous end date:', previousEndDate);
    }
    
    console.log('Calculating gap between:', previousEndDate, 'and', newStartDate);
    
    // Calculate gap - returns gap info for ANY gap (days, months, or years)
    const gap = calculateGap(previousEndDate, newStartDate);
    
    if (gap) {
      console.log('Gap detected! Opening modal. Gap info:', gap);
      // Show modal for ANY gap detected (days, months, or years)
      setGapInfo(gap);
      setIsGapModalOpen(true);
      return true; // Gap detected
    }
    
    console.log('No gap detected');
    return false; // No gap detected
  };

  const handleStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);
    
    // Check for gap when start date is selected
    checkForGapAndShowModal(newStartDate);
  };


  const isFormComplete = jobTitle.trim() && companyName.trim() && employmentType && startDate;

  const handleSave = () => {
    onSave({
      workExperiences,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Gap Explanation Modal */}
      <GapExplanationModal
        isOpen={isGapModalOpen}
        onClose={() => {
          // When closing without saving, allow user to add experience anyway
          setIsGapModalOpen(false);
          // Keep gapInfo in case user wants to add experience
        }}
        onSave={handleGapExplanationSave}
        initialData={gapInfo ? {
          gapCategory: 'Professional',
          reasonForGap: '',
          gapDuration: getGapDurationText(),
          selectedSkills: [],
          coursesText: '',
          preferredSupport: {
            flexibleRole: false,
            hybridRemote: false,
            midLevelReEntry: false,
            skillRefresher: false,
          },
        } : undefined}
        gapInfo={gapInfo || undefined}
      />

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
                    type="date"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
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
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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

            {/* Add Button */}
            {isFormComplete && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddWorkExperience}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3.33333V12.6667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.33333 8H12.6667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add Work Experience
                </button>
              </div>
            )}

            {/* Added Work Experiences List */}
            {workExperiences.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Added Work Experiences</h3>
                {workExperiences.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {entry.jobTitle} at {entry.companyName}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateRange(entry.startDate, entry.endDate, entry.currentlyWorkHere)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveWorkExperience(entry.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleExpandEntry(entry.id)}
                          className="text-gray-500 hover:text-gray-700 p-1"
                          title="Expand"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${expandedEntries[entry.id] ? 'rotate-180' : ''}`}
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {expandedEntries[entry.id] && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-500">Job Title:</span>
                            <p className="text-sm text-gray-900">{entry.jobTitle}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Company:</span>
                            <p className="text-sm text-gray-900">{entry.companyName}</p>
                          </div>
                          {entry.employmentType && (
                            <div>
                              <span className="text-xs text-gray-500">Employment Type:</span>
                              <p className="text-sm text-gray-900">{entry.employmentType}</p>
                            </div>
                          )}
                          {entry.workLocation && (
                            <div>
                              <span className="text-xs text-gray-500">Location:</span>
                              <p className="text-sm text-gray-900">{entry.workLocation}</p>
                            </div>
                          )}
                          {entry.workMode && (
                            <div>
                              <span className="text-xs text-gray-500">Work Mode:</span>
                              <p className="text-sm text-gray-900">{entry.workMode}</p>
                            </div>
                          )}
                          {entry.keyResponsibilities && (
                            <div>
                              <span className="text-xs text-gray-500">Key Responsibilities:</span>
                              <p className="text-sm text-gray-900">{entry.keyResponsibilities}</p>
                            </div>
                          )}
                          {entry.achievements && (
                            <div>
                              <span className="text-xs text-gray-500">Achievements:</span>
                              <p className="text-sm text-gray-900">{entry.achievements}</p>
                            </div>
                          )}
                          {entry.workSkills && entry.workSkills.length > 0 && (
                            <div>
                              <span className="text-xs text-gray-500">Skills:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {entry.workSkills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
              Save Work Experience
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
