'use client';

import { useState, useEffect } from 'react';

interface CompetitiveExamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CompetitiveExamsData) => void;
  initialData?: CompetitiveExamsData;
}

export interface CompetitiveExamsData {
  examName: string;
  yearTaken: string;
  resultStatus: string;
  scoreMarks: string;
  scoreType: string;
  validUntil: string;
  additionalNotes: string;
}

export default function CompetitiveExamsModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CompetitiveExamsModalProps) {
  const [examName, setExamName] = useState(initialData?.examName || '');
  const [yearTaken, setYearTaken] = useState(initialData?.yearTaken || '');
  const [resultStatus, setResultStatus] = useState(initialData?.resultStatus || '');
  const [scoreMarks, setScoreMarks] = useState(initialData?.scoreMarks || '');
  const [scoreType, setScoreType] = useState(initialData?.scoreType || '');
  const [validUntil, setValidUntil] = useState(initialData?.validUntil || '');
  const [additionalNotes, setAdditionalNotes] = useState(initialData?.additionalNotes || '');

  // Update values when initialData changes
  useEffect(() => {
    if (initialData) {
      setExamName(initialData.examName || '');
      setYearTaken(initialData.yearTaken || '');
      setResultStatus(initialData.resultStatus || '');
      setScoreMarks(initialData.scoreMarks || '');
      setScoreType(initialData.scoreType || '');
      setValidUntil(initialData.validUntil || '');
      setAdditionalNotes(initialData.additionalNotes || '');
    } else {
      // Clear all fields for "Add" mode
      setExamName('');
      setYearTaken('');
      setResultStatus('');
      setScoreMarks('');
      setScoreType('');
      setValidUntil('');
      setAdditionalNotes('');
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    onSave({
      examName,
      yearTaken,
      resultStatus,
      scoreMarks,
      scoreType,
      validUntil,
      additionalNotes,
    });
    onClose();
  };

  // Generate year options (last 50 years to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear; i >= currentYear - 50; i--) {
    yearOptions.push(i);
  }

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
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Add Competitive Exam</h2>
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
            <div className="space-y-6">
              {/* Exam Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    <option value="">Select exam...</option>
                    <option value="GATE">GATE</option>
                    <option value="CAT">CAT</option>
                    <option value="UPSC">UPSC</option>
                    <option value="GRE">GRE</option>
                    <option value="GMAT">GMAT</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="IELTS">IELTS</option>
                    <option value="SSC">SSC</option>
                    <option value="Bank PO">Bank PO</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                    <option value="CLAT">CLAT</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Year Taken */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Taken <span className="text-red-500">*</span>
                </label>
                <select
                  value={yearTaken}
                  onChange={(e) => setYearTaken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Select year</option>
                  {yearOptions.map((yearOption) => (
                    <option key={yearOption} value={yearOption.toString()}>
                      {yearOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Result Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Result Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={resultStatus}
                  onChange={(e) => setResultStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Select status</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                  <option value="Appeared">Appeared</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Not Qualified">Not Qualified</option>
                </select>
              </div>

              {/* Score / Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score / Marks <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={scoreMarks}
                  onChange={(e) => setScoreMarks(e.target.value)}
                  placeholder="e.g., 7.5 Bands, 320 / 340, 98 Percentile, AIR 56, 82 Marks"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Score Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score Type
                </label>
                <select
                  value={scoreType}
                  onChange={(e) => setScoreType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Select score type</option>
                  <option value="Bands">Bands</option>
                  <option value="Score">Score</option>
                  <option value="Percentile">Percentile</option>
                  <option value="Rank">Rank</option>
                  <option value="Marks">Marks</option>
                  <option value="Percentage">Percentage</option>
                  <option value="CGPA">CGPA</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Valid Until */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  placeholder="Pick a date"
                  onFocus={(e) => {
                    if (e.target.type !== 'date') {
                      e.target.type = 'date';
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      e.target.type = 'text';
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Add any notes such as attempts, section scores, or additional details..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Upload Documents */}
              <div>
                <button
                  type="button"
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Your Competitive Exam Certificates/Documents
                </button>
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
                Save Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
