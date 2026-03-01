'use client';

import { useState, useEffect } from 'react';

interface AcademicAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AcademicAchievementData) => void;
  initialData?: AcademicAchievementData;
}

export interface AcademicAchievementData {
  achievementTitle: string;
  awardedBy: string;
  yearReceived: string;
  categoryType: string;
  description: string;
}

export default function AcademicAchievementModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AcademicAchievementModalProps) {
  const [achievementTitle, setAchievementTitle] = useState(initialData?.achievementTitle || '');
  const [awardedBy, setAwardedBy] = useState(initialData?.awardedBy || '');
  const [yearReceived, setYearReceived] = useState(initialData?.yearReceived || '');
  const [categoryType, setCategoryType] = useState(initialData?.categoryType || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Update values when initialData changes
  useEffect(() => {
    if (initialData) {
      setAchievementTitle(initialData.achievementTitle || '');
      setAwardedBy(initialData.awardedBy || '');
      setYearReceived(initialData.yearReceived || '');
      setCategoryType(initialData.categoryType || '');
      setDescription(initialData.description || '');
    } else {
      // Clear all fields for "Add" mode
      setAchievementTitle('');
      setAwardedBy('');
      setYearReceived('');
      setCategoryType('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    onSave({
      achievementTitle,
      awardedBy,
      yearReceived,
      categoryType,
      description,
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
            <h2 className="text-xl font-semibold text-gray-900">Add Academic Achievement</h2>
            <button
              onClick={onClose}
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
            <div className="space-y-6">
              {/* Achievement Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={achievementTitle}
                  onChange={(e) => setAchievementTitle(e.target.value)}
                  placeholder="e.g., Academic Excellence Award, Top 1% in Class, Dean's List"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Awarded By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Awarded By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={awardedBy}
                  onChange={(e) => setAwardedBy(e.target.value)}
                  placeholder="University / Board / Institution name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Year Received */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Received <span className="text-red-500">*</span>
                </label>
                <select
                  value={yearReceived}
                  onChange={(e) => setYearReceived(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Select year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category / Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category / Type <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2399A1AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="Academic Excellence">Academic Excellence</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Competition">Competition</option>
                  <option value="Research">Research</option>
                  <option value="Publication">Publication</option>
                  <option value="Honor Society">Honor Society</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of the achievement, criteria, rank, and significance."
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
                  Upload Your Academic Achievements Certificates/Documents
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
                Save Achievement
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
