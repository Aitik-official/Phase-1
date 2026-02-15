'use client';

import { useState, useEffect } from 'react';

interface LanguagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: LanguagesData) => void;
  initialData?: LanguagesData;
}

export interface Language {
  name: string;
  proficiency: string;
  speak: boolean;
  read: boolean;
  write: boolean;
  certification?: string;
}

export interface LanguagesData {
  languages: Language[];
}

const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese',
  'Korean', 'Arabic', 'Hindi', 'Russian', 'Dutch', 'Swedish', 'Norwegian', 'Danish',
  'Polish', 'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Other'
];

const PROFICIENCY_LEVELS = [
  'Beginner',
  'Elementary',
  'Intermediate',
  'Advanced',
  'Fluent / Native'
];

export default function LanguagesModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: LanguagesModalProps) {
  const [languages, setLanguages] = useState<Language[]>(initialData?.languages || []);
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState('');
  const [newSpeak, setNewSpeak] = useState(false);
  const [newRead, setNewRead] = useState(false);
  const [newWrite, setNewWrite] = useState(false);

  // Update values when initialData changes
  useEffect(() => {
    if (initialData) {
      setLanguages(initialData.languages || []);
    } else {
      setLanguages([]);
    }
  }, [initialData, isOpen]);

  const handleAddLanguage = () => {
    if (newLanguage && newProficiency) {
      const language: Language = {
        name: newLanguage,
        proficiency: newProficiency,
        speak: newSpeak,
        read: newRead,
        write: newWrite,
      };
      setLanguages([...languages, language]);
      // Reset form
      setNewLanguage('');
      setNewProficiency('');
      setNewSpeak(false);
      setNewRead(false);
      setNewWrite(false);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleUpdateLanguage = (index: number, field: keyof Language, value: any) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLanguages(updatedLanguages);
  };

  const handleSave = () => {
    onSave({
      languages,
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
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Add Language</h2>
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
              {/* Languages Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Language Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Proficiency</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Speak</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Read</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Write</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Existing Languages */}
                    {languages.map((language, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <select
                            value={language.name}
                            onChange={(e) => handleUpdateLanguage(index, 'name', e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            {LANGUAGE_OPTIONS.map((lang) => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={language.proficiency}
                            onChange={(e) => handleUpdateLanguage(index, 'proficiency', e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            {PROFICIENCY_LEVELS.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={language.speak}
                            onChange={(e) => handleUpdateLanguage(index, 'speak', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={language.read}
                            onChange={(e) => handleUpdateLanguage(index, 'read', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={language.write}
                            onChange={(e) => handleUpdateLanguage(index, 'write', e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleRemoveLanguage(index)}
                            className="text-red-500 hover:text-red-700"
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
                        </td>
                      </tr>
                    ))}
                    
                    {/* Add New Language Row */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <select
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">Select Language</option>
                          {LANGUAGE_OPTIONS.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={newProficiency}
                          onChange={(e) => setNewProficiency(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">Select proficiency level</option>
                          {PROFICIENCY_LEVELS.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={newSpeak}
                          onChange={(e) => setNewSpeak(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={newRead}
                          onChange={(e) => setNewRead(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={newWrite}
                          onChange={(e) => setNewWrite(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={handleAddLanguage}
                          disabled={!newLanguage || !newProficiency}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Certification Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., TOEFL, IELTS, DELE"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                Save Language
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
