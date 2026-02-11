'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import BasicInfoModal, { BasicInfoData } from '../../components/modals/BasicInfoModal';
import SummaryModal from '../../components/modals/SummaryModal';
import GapExplanationModal, { GapExplanationData } from '../../components/modals/GapExplanationModal';
import WorkExperienceModal, { WorkExperienceData } from '../../components/modals/WorkExperienceModal';
import InternshipModal, { InternshipData } from '../../components/modals/InternshipModal';
import ProfileSectionCard from '../../components/profile/ProfileSectionCard';

export default function ProfilePage() {
  const router = useRouter();
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isGapExplanationModalOpen, setIsGapExplanationModalOpen] = useState(false);
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  
  // Summary form state
  const [summaryText, setSummaryText] = useState('Experienced software engineer with a strong background in full-stack development and cloud technologies. Proven ability to lead projects, mentor junior developers, and deliver high-quality solutions on time. Passionate about creating scalable and user-centric applications, with a keen interest in AI/ML integration for improved user experiences. Seeking a challenging role to leverage technical expertise and contribute to innovative product development.');
  
  // Data storage for modals
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoData | undefined>();
  const [gapExplanationData, setGapExplanationData] = useState<GapExplanationData | undefined>();
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperienceData | undefined>();
  const [internshipData, setInternshipData] = useState<InternshipData | undefined>();

  // Create profile sections with data
  const profileSections = [
    {
      category: 'PERSONAL DETAILS',
      items: [
        { 
          name: 'Basic Information', 
          status: 'Completed', 
          hasInfo: true,
          data: basicInfoData || {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            city: 'New York',
            country: 'United States'
          }
        },
        { 
          name: 'Summary', 
          status: summaryText ? 'Partially Completed' : 'Missing Info', 
          hasInfo: !!summaryText || true, // Always show as hasInfo since we have default text
          data: summaryText || 'No summary added yet.'
        },
        { 
          name: 'Gap Explanation', 
          status: gapExplanationData ? 'Completed' : 'Missing Info', 
          hasInfo: !!gapExplanationData,
          data: gapExplanationData
        }
      ]
    },
    {
      category: 'WORK HISTORY',
      items: [
        { 
          name: 'Work Experience', 
          status: 'Completed', 
          hasInfo: true,
          data: workExperienceData || {
            jobTitle: 'Software Developer',
            companyName: 'Tech Corp',
            startDate: '2020-01-01',
            endDate: '2023-12-31',
            currentlyWorkHere: false,
            workLocation: 'San Francisco, USA'
          }
        },
        { 
          name: 'Internships', 
          status: internshipData ? 'Completed' : 'Missing Info', 
          hasInfo: !!internshipData,
          data: internshipData
        }
      ]
    },
    {
      category: 'EDUCATION',
      items: [
        { name: 'Education', status: 'Completed', hasInfo: true },
        { name: 'Academic Achievements', status: 'Partially Completed', hasInfo: true },
        { name: 'Competitive Exams', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'SKILLS',
      items: [
        { name: 'Skills', status: 'Completed', hasInfo: true },
        { name: 'Languages', status: 'Completed', hasInfo: true }
      ]
    },
    {
      category: 'PROJECTS',
      items: [
        { name: 'Projects', status: 'Partially Completed', hasInfo: true },
        { name: 'Portfolio Links', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'CERTIFICATIONS',
      items: [
        { name: 'Certifications', status: 'Completed', hasInfo: true },
        { name: 'Accomplishments', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'PREFERENCES',
      items: [
        { name: 'Career Preferences', status: 'Completed', hasInfo: true },
        { name: 'Employment Details', status: 'Partially Completed', hasInfo: true }
      ]
    },
    {
      category: 'GLOBAL ELIGIBILITY',
      items: [
        { name: 'Visa & Work Authorization', status: 'Missing Info', hasInfo: false }
      ]
    },
    {
      category: 'RESUME',
      items: [
        { name: 'Resume', status: 'Completed', hasInfo: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'text-green-600';
    if (status === 'Partially Completed') return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditClick = (category: string, itemName: string) => {
    if (category === 'PERSONAL DETAILS' && itemName === 'Basic Information') {
      setIsBasicInfoModalOpen(true);
    } else if (category === 'PERSONAL DETAILS' && itemName === 'Summary') {
      setIsSummaryModalOpen(true);
    } else if (category === 'PERSONAL DETAILS' && itemName === 'Gap Explanation') {
      setIsGapExplanationModalOpen(true);
    } else if (category === 'WORK HISTORY' && itemName === 'Work Experience') {
      setIsWorkExperienceModalOpen(true);
    } else if (category === 'WORK HISTORY' && itemName === 'Internships') {
      setIsInternshipModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Main Title Area */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">View and update all sections of your SAASA profile.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit Resume
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              View Public Profile
            </button>
          </div>
        </div>

        {/* Top Section - Three Cards */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your CV/Resume Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your CV/Resume</h3>
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-24 h-24 mb-3">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${85 * 2.83} 283`}
                    strokeLinecap="round"
                    className="rotate-[-90deg] origin-center"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">85%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">my_resume_v2.pdf</p>
              <span className="text-xs text-blue-600">AI Analyzed</span>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Upload/Replace Resume
              </button>
              <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700">
                View ATS Score
              </button>
            </div>
          </div>

          {/* AI Profile Insights Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Profile Insights</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Improve your summary to highlight leadership skills.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Add quantifiable achievements to your work experience.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Consider certifications in cloud computing for better matching.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Include a project demonstrating full-stack development expertise.</span>
              </li>
            </ul>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View Insights
            </button>
          </div>

          {/* Your Profile Strength Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="mb-3">
              <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                Moderate
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Based on your current profile completeness and relevance to industry standards.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Complete all missing sections for a 100% profile.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Update your 'Work Experience' with recent roles.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Showcase your 'Portfolio Links' to stand out.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <span>Review 'Career Preferences' for accurate job matching.</span>
              </li>
            </ul>
            <button className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
              Improve My Profile
            </button>
          </div>
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <nav className="space-y-6">
                {profileSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">{section.category}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <button
                            className={`w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 ${
                              sectionIndex === 0 && itemIndex === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            {item.name}
                            {itemIndex < section.items.length - 1 && (
                              <span className="float-right text-gray-400">→</span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {profileSections.map((section, sectionIndex) => (
              <ProfileSectionCard
                key={sectionIndex}
                category={section.category}
                items={section.items}
                onEditClick={handleEditClick}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <BasicInfoModal
        isOpen={isBasicInfoModalOpen}
        onClose={() => setIsBasicInfoModalOpen(false)}
        onSave={(data) => {
          setBasicInfoData(data);
          setIsBasicInfoModalOpen(false);
        }}
        initialData={basicInfoData}
      />

      <SummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        summaryText={summaryText}
        onSummaryChange={setSummaryText}
        onSave={() => {
          setIsSummaryModalOpen(false);
        }}
      />

      <GapExplanationModal
        isOpen={isGapExplanationModalOpen}
        onClose={() => setIsGapExplanationModalOpen(false)}
        onSave={(data) => {
          setGapExplanationData(data);
          setIsGapExplanationModalOpen(false);
        }}
        initialData={gapExplanationData}
      />

      <WorkExperienceModal
        isOpen={isWorkExperienceModalOpen}
        onClose={() => setIsWorkExperienceModalOpen(false)}
        onSave={(data) => {
          setWorkExperienceData(data);
          setIsWorkExperienceModalOpen(false);
        }}
        initialData={workExperienceData}
      />

      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={() => setIsInternshipModalOpen(false)}
        onSave={(data) => {
          setInternshipData(data);
          setIsInternshipModalOpen(false);
        }}
        initialData={internshipData}
      />

      <Footer />
    </div>
  );
}

