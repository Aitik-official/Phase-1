'use client';

import { useState, useEffect, useRef } from 'react';

interface VisaWorkAuthorizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VisaWorkAuthorizationData) => void;
  initialData?: VisaWorkAuthorizationData;
}

export interface VisaDocument {
  id: string;
  file: File | string;
  name: string;
  size?: number;
}

export interface VisaDetailsSection {
  id: string;
  visaType: string;
  visaStatus: string;
  itemFamilyNumber?: string;
  visaExpiryDate?: string;
  documents: VisaDocument[];
}

export interface VisaWorkAuthorizationData {
  selectedDestination: string;
  visaDetailsInitial?: VisaDetailsSection;
  visaDetailsExpected?: VisaDetailsSection;
  visaWorkpermitRequired: string;
  openForAll: boolean;
  additionalRemarks?: string;
}

const COUNTRIES = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SG', name: 'Singapore' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NZ', name: 'New Zealand' },
];

const VISA_TYPES = [
  'Citizen / Permanent Resident',
  'Work Visa',
  'Student Visa',
  'Tourist Visa',
  'Business Visa',
  'Dependent Visa',
  'Other'
];

const VISA_STATUSES = [
  'Active',
  'Expired',
  'Pending',
  'Renewal Required'
];

const VISA_WORKPERMIT_OPTIONS = [
  'YES, I DON\'T HAVE ONE YET',
  'YES, I ALREADY HAVE ONE',
  'NO, I DON\'T REQUIRE ONE'
];

const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
};

export default function VisaWorkAuthorizationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: VisaWorkAuthorizationModalProps) {
  const [selectedDestination, setSelectedDestination] = useState(initialData?.selectedDestination || '');
  const [visaDetailsInitial, setVisaDetailsInitial] = useState<VisaDetailsSection | undefined>(
    initialData?.visaDetailsInitial || { id: 'initial', visaType: '', visaStatus: 'Active', documents: [] }
  );
  const [visaDetailsExpected, setVisaDetailsExpected] = useState<VisaDetailsSection | undefined>(
    initialData?.visaDetailsExpected || { id: 'expected', visaType: '', visaStatus: 'Active', documents: [] }
  );
  const [visaWorkpermitRequired, setVisaWorkpermitRequired] = useState(initialData?.visaWorkpermitRequired || '');
  const [openForAll, setOpenForAll] = useState(initialData?.openForAll || false);
  const [additionalRemarks, setAdditionalRemarks] = useState(initialData?.additionalRemarks || '');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    initial: true,
    expected: true
  });

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const dragCounter = useRef<{ [key: string]: number }>({ initial: 0, expected: 0 });

  useEffect(() => {
    if (initialData) {
      setSelectedDestination(initialData.selectedDestination || '');
      setVisaDetailsInitial(initialData.visaDetailsInitial || { id: 'initial', visaType: '', visaStatus: 'Active', documents: [] });
      setVisaDetailsExpected(initialData.visaDetailsExpected || { id: 'expected', visaType: '', visaStatus: 'Active', documents: [] });
      setVisaWorkpermitRequired(initialData.visaWorkpermitRequired || '');
      setOpenForAll(initialData.openForAll || false);
      setAdditionalRemarks(initialData.additionalRemarks || '');
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setSelectedDestination('');
    setVisaDetailsInitial({ id: 'initial', visaType: '', visaStatus: 'Active', documents: [] });
    setVisaDetailsExpected({ id: 'expected', visaType: '', visaStatus: 'Active', documents: [] });
    setVisaWorkpermitRequired('');
    setOpenForAll(false);
    setAdditionalRemarks('');
    setExpandedSections({ initial: true, expected: true });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };

  const handleVisaDetailChange = (section: 'initial' | 'expected', field: keyof VisaDetailsSection, value: string) => {
    if (section === 'initial') {
      setVisaDetailsInitial({
        ...visaDetailsInitial!,
        [field]: value
      });
    } else {
      setVisaDetailsExpected({
        ...visaDetailsExpected!,
        [field]: value
      });
    }
  };

  const handleFileSelect = (section: 'initial' | 'expected', files: FileList | null) => {
    if (!files) return;
    
    const newDocuments: VisaDocument[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: File size must be less than 5MB`);
        continue;
      }
      // Check file type
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}: Please upload a PDF, PNG, or JPG file`);
        continue;
      }
      newDocuments.push({
        id: Date.now().toString() + i,
        file,
        name: file.name,
        size: file.size
      });
    }

    if (section === 'initial') {
      setVisaDetailsInitial({
        ...visaDetailsInitial!,
        documents: [...(visaDetailsInitial?.documents || []), ...newDocuments]
      });
    } else {
      setVisaDetailsExpected({
        ...visaDetailsExpected!,
        documents: [...(visaDetailsExpected?.documents || []), ...newDocuments]
      });
    }
  };

  const handleFileInputChange = (section: 'initial' | 'expected', e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(section, e.target.files);
    // Reset input so same file can be selected again
    if (fileInputRefs.current[section]) {
      fileInputRefs.current[section]!.value = '';
    }
  };

  const handleRemoveFile = (section: 'initial' | 'expected', documentId: string) => {
    if (section === 'initial') {
      setVisaDetailsInitial({
        ...visaDetailsInitial!,
        documents: visaDetailsInitial?.documents.filter(doc => doc.id !== documentId) || []
      });
    } else {
      setVisaDetailsExpected({
        ...visaDetailsExpected!,
        documents: visaDetailsExpected?.documents.filter(doc => doc.id !== documentId) || []
      });
    }
  };

  const handleDragEnter = (section: 'initial' | 'expected', e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current[section] = (dragCounter.current[section] || 0) + 1;
  };

  const handleDragLeave = (section: 'initial' | 'expected', e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current[section] = (dragCounter.current[section] || 0) - 1;
    if (dragCounter.current[section] === 0) {
      // Reset drag state
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (section: 'initial' | 'expected', e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current[section] = 0;
    handleFileSelect(section, e.dataTransfer.files);
  };

  const handleSave = () => {
    // Validate required fields
    if (!selectedDestination) {
      alert('Please select a destination country.');
      return;
    }

    if (visaDetailsInitial && !visaDetailsInitial.visaType) {
      alert('Please select Visa Type for Visa Details Initial.');
      return;
    }

    if (visaDetailsExpected && !visaDetailsExpected.visaType) {
      alert('Please select Visa Type for Visa Details Expected.');
      return;
    }

    onSave({
      selectedDestination,
      visaDetailsInitial,
      visaDetailsExpected,
      visaWorkpermitRequired,
      openForAll,
      additionalRemarks,
    });
    onClose();
  };

  if (!isOpen) return null;

  const renderVisaDetailsSection = (section: VisaDetailsSection | undefined, sectionId: 'initial' | 'expected', title: string) => {
    const isExpanded = expandedSections[sectionId] !== false;
    const sectionData = section || { id: sectionId, visaType: '', visaStatus: 'Active', documents: [] };

    return (
      <div className="border border-gray-200 rounded-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => toggleSection(sectionId)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-900"
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
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {title}
          </button>
        </div>

        {/* Section Content */}
        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Visa Type and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visa Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={sectionData.visaType}
                  onChange={(e) => handleVisaDetailChange(sectionId, 'visaType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Visa Type</option>
                  {VISA_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visa Status
                </label>
                <select
                  value={sectionData.visaStatus}
                  onChange={(e) => handleVisaDetailChange(sectionId, 'visaStatus', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {VISA_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visa Expiry Date (only for Expected section) */}
            {sectionId === 'expected' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visa Expiry Date
                </label>
                <input
                  type="date"
                  value={sectionData.visaExpiryDate || ''}
                  onChange={(e) => handleVisaDetailChange(sectionId, 'visaExpiryDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Visa must always be valid for your assignment
                </p>
              </div>
            )}

            {/* Item/Family Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item/Family Number
              </label>
              <input
                type="text"
                value={sectionData.itemFamilyNumber || ''}
                onChange={(e) => handleVisaDetailChange(sectionId, 'itemFamilyNumber', e.target.value)}
                placeholder="Enter item/family number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {sectionId === 'initial' ? 'Related Visa/Work Permit Document' : 'Upload Visa/Work Permit Document'}
              </label>
              
              {/* Drag and Drop Area */}
              <div
                onDragEnter={(e) => handleDragEnter(sectionId, e)}
                onDragLeave={(e) => handleDragLeave(sectionId, e)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(sectionId, e)}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50"
              >
                <input
                  ref={(el) => { fileInputRefs.current[sectionId] = el; }}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileInputChange(sectionId, e)}
                  multiple
                  className="hidden"
                />
                <svg
                  className="mx-auto h-12 w-12 text-[#9095A1] mb-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-gray-600 mb-1">
                  Drag and drop files here or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[sectionId]?.click()}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Browse files
                  </button>
                </p>
                {sectionId === 'initial' && (
                  <p className="text-xs text-gray-500">Associated HRC info, Visa docs here</p>
                )}
              </div>

              {/* Uploaded Files List */}
              {sectionData.documents && sectionData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Existing Work Permit/Visa ({sectionData.documents.length} {sectionData.documents.length === 1 ? 'file' : 'files'})
                  </p>
                  {sectionData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-[#9095A1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-900">{doc.name}</p>
                          {doc.size && (
                            <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm"
                          title="View"
                        >
                          View
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleRemoveFile(sectionId, doc.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                          title="Delete"
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

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
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Visa & Work Authorization</h2>
              <p className="text-sm text-gray-600 mt-1">Tell us where you are going to work and upload supporting documents.</p>
            </div>
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
              {/* Select Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Destination
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a destination...</option>
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Select all countries where you are legally authorized to work.
                </p>
              </div>

              {/* Visa Details Initial */}
              {renderVisaDetailsSection(visaDetailsInitial, 'initial', 'Visa Details Initial')}

              {/* Visa Details Expected */}
              {renderVisaDetailsSection(visaDetailsExpected, 'expected', 'Visa Details (Expected)')}

              {/* Visa/Workpermit Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Visa/Workpermit Required?
                </label>
                <div className="space-y-2">
                  {VISA_WORKPERMIT_OPTIONS.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visaWorkpermit"
                        value={option}
                        checked={visaWorkpermitRequired === option}
                        onChange={(e) => setVisaWorkpermitRequired(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={openForAll}
                      onChange={(e) => setOpenForAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Open for all?</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Please ensure location/country may require a Visa/Work permit and if so depending on the end country.
                </p>
              </div>

              {/* Additional Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Remarks
                </label>
                <textarea
                  value={additionalRemarks}
                  onChange={(e) => setAdditionalRemarks(e.target.value)}
                  placeholder="Add any further information about your visa or work authorization."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
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
                Save Visa & Work Authorization
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
