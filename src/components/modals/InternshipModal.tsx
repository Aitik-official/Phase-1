'use client';

import { useState } from 'react';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InternshipData) => void;
  initialData?: InternshipData;
}

export interface InternshipData {
  internshipTitle: string;
  companyName: string;
  internshipType: string;
  domainDepartment: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location: string;
  workMode: string;
  responsibilities: string;
  learnings: string;
  skills: string[];
}

export default function InternshipModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: InternshipModalProps) {
  const [internshipTitle, setInternshipTitle] = useState(initialData?.internshipTitle || '');
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [internshipType, setInternshipType] = useState(initialData?.internshipType || '');
  const [domainDepartment, setDomainDepartment] = useState(initialData?.domainDepartment || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [currentlyWorking, setCurrentlyWorking] = useState(initialData?.currentlyWorking ?? false);
  const [location, setLocation] = useState(initialData?.location || '');
  const [workMode, setWorkMode] = useState(initialData?.workMode || '');
  const [responsibilities, setResponsibilities] = useState(initialData?.responsibilities || '');
  const [learnings, setLearnings] = useState(initialData?.learnings || '');
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);

  const handleSave = () => {
    onSave({
      internshipTitle,
      companyName,
      internshipType,
      domainDepartment,
      startDate,
      endDate,
      currentlyWorking,
      location,
      workMode,
      responsibilities,
      learnings,
      skills,
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
            <h2 className="text-xl font-semibold text-gray-900">Edit Internship</h2>
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
                {/* Internship Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Internship Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={internshipTitle}
                    onChange={(e) => setInternshipTitle(e.target.value)}
                    placeholder="e.g., Marketing & Communications Intern"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Internship Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Internship Type
                  </label>
                  <select
                    value={internshipType}
                    onChange={(e) => setInternshipType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select internship type</option>
                    <option value="full-time">Full-time Internship</option>
                    <option value="part-time">Part-time Internship</option>
                    <option value="remote">Remote Internship</option>
                    <option value="hybrid">Hybrid Internship</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Company / Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., SAASA Corp."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Domain / Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain / Department
                  </label>
                  <select
                    value={domainDepartment}
                    onChange={(e) => setDomainDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    <option value="">Select domain / department</option>
                    <option value="marketing">Marketing</option>
                    <option value="engineering">Engineering</option>
                    <option value="finance">Finance</option>
                    <option value="hr">Human Resources</option>
                    <option value="operations">Operations</option>
                    <option value="sales">Sales</option>
                    <option value="design">Design</option>
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
                      disabled={currentlyWorking}
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
                      checked={currentlyWorking}
                      onChange={(e) => {
                        setCurrentlyWorking(e.target.checked);
                        if (e.target.checked) {
                          setEndDate('');
                        }
                      }}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm text-blue-600 font-medium">I am currently working here</span>
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
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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

            {/* Role Details Section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Role Details</h3>
              
              {/* Responsibilities / Tasks Performed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities / Tasks Performed
                </label>
                <textarea
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your main tasks, duties, and contributions..."
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Learnings or Outcomes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learnings or Outcomes <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe what you learned, skills gained, or outcomes achieved..."
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
                  Skills Applied
                </label>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          onClick={() => {
                            setSkills(skills.filter((_, i) => i !== index));
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && skillsInput.trim()) {
                        setSkills([...skills, skillsInput.trim()]);
                        setSkillsInput('');
                      }
                    }}
                    placeholder="Add skills you used during this internship..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (skillsInput.trim()) {
                        setSkills([...skills, skillsInput.trim()]);
                        setSkillsInput('');
                      }
                    }}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
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
                <span className="text-sm font-medium">Upload Your Internship Certificates/Documents</span>
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
