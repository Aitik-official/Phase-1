'use client';

import { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  placeholder?: string;
  options?: DropdownOption[];
  className?: string;
}

export default function Dropdown({ placeholder = "Select...", options = [], className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
      >
        <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
          {selectedValue ? options.find(opt => opt.value === selectedValue)?.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  selectedValue === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


