'use client';

import { useState, useEffect, useRef } from 'react';

interface VaccinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: VaccinationData) => void;
  initialData?: VaccinationData;
}

export interface VaccinationItem {
  id: string;
  vaccineType: string;
  lastVaccinationDate: string;
  certificate?: File | string;
}

export interface VaccinationData {
  vaccinationStatus: 'Yes' | 'No' | '';
  vaccinations: VaccinationItem[];
}

const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
};

export default function VaccinationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: VaccinationModalProps) {
  const [vaccinationStatus, setVaccinationStatus] = useState<'Yes' | 'No' | ''>(initialData?.vaccinationStatus || '');
  const [vaccineType, setVaccineType] = useState('');
  const [lastVaccinationDate, setLastVaccinationDate] = useState('');
  const [certificate, setCertificate] = useState<File | string | null>(null);
  const [vaccinations, setVaccinations] = useState<VaccinationItem[]>(initialData?.vaccinations || []);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setVaccinationStatus(initialData.vaccinationStatus || '');
      setVaccinations(initialData.vaccinations || []);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setVaccinationStatus('');
    setVaccineType('');
    setLastVaccinationDate('');
    setCertificate(null);
    setVaccinations([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      // Check file type
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, PNG, or JPG file');
        return;
      }
      setCertificate(file);
    }
  };

  const handleRemoveFile = () => {
    setCertificate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddVaccination = () => {
    if (!vaccineType.trim()) {
      alert('Please enter vaccine type.');
      return;
    }
    if (!lastVaccinationDate) {
      alert('Please select last vaccination date.');
      return;
    }

    const newVaccination: VaccinationItem = {
      id: Date.now().toString(),
      vaccineType: vaccineType.trim(),
      lastVaccinationDate,
      certificate: certificate || undefined,
    };

    setVaccinations([...vaccinations, newVaccination]);
    setVaccineType('');
    setLastVaccinationDate('');
    setCertificate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveVaccination = (id: string) => {
    setVaccinations(vaccinations.filter(v => v.id !== id));
  };

  const toggleExpand = (id: string) => {
    setExpandedItems({
      ...expandedItems,
      [id]: !expandedItems[id],
    });
  };

  const handleSave = () => {
    if (!vaccinationStatus) {
      alert('Please select your vaccination status.');
      return;
    }

    onSave({
      vaccinationStatus,
      vaccinations,
    });
    onClose();
  };

  const formatDateRange = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isFormComplete = vaccineType.trim() && lastVaccinationDate;

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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Vaccination Details</h2>
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
            <p className="text-sm text-gray-600 mb-6">
              Provide your vaccination status if required for specific job roles or workplace policies.
            </p>

            <div className="space-y-6">
              {/* Vaccination Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Vaccination Status <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vaccinationStatus"
                      value="Yes"
                      checked={vaccinationStatus === 'Yes'}
                      onChange={(e) => setVaccinationStatus(e.target.value as 'Yes')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vaccinationStatus"
                      value="No"
                      checked={vaccinationStatus === 'No'}
                      onChange={(e) => setVaccinationStatus(e.target.value as 'No')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Vaccine Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccine Type
                </label>
                <input
                  type="text"
                  value={vaccineType}
                  onChange={(e) => setVaccineType(e.target.value)}
                  placeholder="eg. Yellow Fever"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Last Vaccination Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Vaccination Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={lastVaccinationDate}
                    onChange={(e) => setLastVaccinationDate(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <p className="mt-1 text-xs text-gray-500">
                  Optional. The date of your last vaccination.
                </p>
              </div>

              {/* Vaccination Certificate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccination Certificate
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {!certificate ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Choose File
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <svg
                      className="w-6 h-6 text-[#9095A1]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {certificate instanceof File ? certificate.name : certificate}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="text-[#9095A1] hover:text-red-600"
                      title="Remove file"
                    >
                      <svg
                        width="18"
                        height="18"
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
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Optional. Upload only if required by the employer.
                </p>
              </div>

              {/* Add Button */}
              {isFormComplete && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddVaccination}
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
                    Add Vaccination
                  </button>
                </div>
              )}

              {/* Added Vaccinations List */}
              {vaccinations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">Added Vaccinations</h3>
                  {vaccinations.map((vaccination) => (
                    <div
                      key={vaccination.id}
                      className="border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {vaccination.vaccineType}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDateRange(vaccination.lastVaccinationDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveVaccination(vaccination.id)}
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
                            onClick={() => toggleExpand(vaccination.id)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            title="Expand"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`transition-transform ${expandedItems[vaccination.id] ? 'rotate-180' : ''}`}
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
                      {expandedItems[vaccination.id] && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-gray-500">Vaccine Type:</span>
                              <p className="text-sm text-gray-900">{vaccination.vaccineType}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Last Vaccination Date:</span>
                              <p className="text-sm text-gray-900">
                                {formatDateForDisplay(vaccination.lastVaccinationDate)}
                              </p>
                            </div>
                            {vaccination.certificate && (
                              <div>
                                <span className="text-xs text-gray-500">Certificate:</span>
                                <p className="text-sm text-gray-900">
                                  {vaccination.certificate instanceof File
                                    ? vaccination.certificate.name
                                    : vaccination.certificate}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-gray-600">
                  Vaccination details may be shared with employers only if required for workplace compliance.
                </p>
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
                Save & Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
