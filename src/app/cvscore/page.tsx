'use client';

import { useRouter } from 'next/navigation';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function CVScorePage() {
  const router = useRouter();

  const handleImproveCV = () => {
    router.push('/aicveditor');
  };

  const strengths = [
    'Demonstrated expertise in project management.',
    'Quantifiable achievements in previous roles.',
    'Strong communication and leadership skills.',
    'Relevant experience in the target industry.',
  ];

  const improvements = [
    'Limited use of industry-specific keywords.',
    'Generic phrasing in some bullet points.',
    'Inconsistent formatting of dates and titles.',
  ];

  const missingKeywords = [
    'Data Analysis',
    'Market Research',
    'Customer Relationship Management',
    'Strategic Planning',
    'Process Improvement',
    'Financial Modeling',
    'Risk Management',
    'Business Development',
  ];

  const formattingSuggestions = [
    'Ensure consistent font sizes throughout the document.',
    'Optimize margins for better readability and a professional look.',
    'Use a clear, modern template for improved visual appeal.',
    'Proofread carefully for any typographical errors.',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 py-8" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CV ATS Analysis Report
          </h1>
          <p className="text-lg text-gray-600">
            Detailed insights into your CV's compatibility with Applicant Tracking Systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - ATS Compatibility Score */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">ATS Compatibility Score</h2>
            
            {/* Modern Circular Progress Indicator */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-56 h-56 mb-6">
                {/* Outer glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 opacity-50 blur-xl"></div>
                
                <svg className="w-full h-full transform -rotate-90 relative z-10">
                  {/* Background circle with gradient */}
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F3F4F6" />
                      <stop offset="100%" stopColor="#E5E7EB" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background circle */}
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke="url(#bgGradient)"
                    strokeWidth="20"
                  />
                  
                  {/* Progress circle with gradient */}
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 100}`}
                    strokeDashoffset={`${2 * Math.PI * 100 * (1 - 0.85)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                      filter: 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))',
                    }}
                  />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <span className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                    85%
                  </span>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-gray-900 mb-6 text-center px-4">
                Your CV is highly optimized and ready for review!
              </p>
              
              {/* Modern Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: '85%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 text-center leading-relaxed max-w-md">
                This score indicates how well your CV is parsed and matched by typical ATS systems.
              </p>
            </div>
          </div>

          {/* Right Column - Analysis Sections */}
          <div className="space-y-6">
            {/* Key Strengths Identified */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Strengths Identified</h3>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Areas for Improvement</h3>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Missing Keywords</h3>
              <p className="text-sm text-gray-600 mb-4">
                Consider adding these to improve your CV's visibility.
              </p>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-900 text-sm rounded-lg border border-gray-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Formatting Suggestions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Formatting Suggestions</h3>
              <ul className="space-y-3">
                {formattingSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleImproveCV}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-lg transition-colors shadow-md"
          >
            Improve My CV & Complete Profile
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
