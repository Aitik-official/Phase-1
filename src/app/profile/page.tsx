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
import EducationModal, { EducationData } from '../../components/modals/EducationModal';
import AcademicAchievementModal, { AcademicAchievementData } from '../../components/modals/AcademicAchievementModal';
import CompetitiveExamsModal, { CompetitiveExamsData } from '../../components/modals/CompetitiveExamsModal';
import SkillsModal, { SkillsData } from '../../components/modals/SkillsModal';
import LanguagesModal, { LanguagesData } from '../../components/modals/LanguagesModal';
import ProjectModal, { ProjectData } from '../../components/modals/ProjectModal';
import PortfolioLinksModal, { PortfolioLinksData } from '../../components/modals/PortfolioLinksModal';
import CertificationModal, { CertificationsData } from '../../components/modals/CertificationModal';

export default function ProfilePage() {
  const router = useRouter();
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isGapExplanationModalOpen, setIsGapExplanationModalOpen] = useState(false);
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isAcademicAchievementModalOpen, setIsAcademicAchievementModalOpen] = useState(false);
  const [isCompetitiveExamsModalOpen, setIsCompetitiveExamsModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPortfolioLinksModalOpen, setIsPortfolioLinksModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  
  // Sidebar expansion state
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'PERSONAL DETAILS': true, // Default to expanded
    'WORK HISTORY': true,
    'EDUCATION': true,
    'SKILLS': true,
    'PROJECTS': true,
    'CERTIFICATIONS': true,
    'PREFERENCES': true,
    'GLOBAL ELIGIBILITY': true,
    'RESUME': true,
  });

  // Selected sidebar item state
  const [selectedItem, setSelectedItem] = useState<{ category: string; itemName: string } | null>({
    category: 'PERSONAL DETAILS',
    itemName: 'Basic Information'
  });

  // Summary form state
  const [summaryText, setSummaryText] = useState('Experienced software engineer with a strong background in full-stack development and cloud technologies. Proven ability to lead projects, mentor junior developers, and deliver high-quality solutions on time. Passionate about creating scalable and user-centric applications, with a keen interest in AI/ML integration for improved user experiences. Seeking a challenging role to leverage technical expertise and contribute to innovative product development.');

  // Data storage for modals
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoData | undefined>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    phoneCode: '+1 (USA)',
    dob: 'July 20th, 1990',
    city: 'New York',
    gender: 'Male',
    country: 'United States',
    employment: 'Employed',
    notice: '60 days'
  });
  const [gapExplanationData, setGapExplanationData] = useState<GapExplanationData | undefined>();
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperienceData | undefined>();
  const [internshipData, setInternshipData] = useState<InternshipData | undefined>();
  const [educationData, setEducationData] = useState<EducationData | undefined>();
  const [academicAchievementData, setAcademicAchievementData] = useState<AcademicAchievementData | undefined>();
  const [competitiveExamsData, setCompetitiveExamsData] = useState<CompetitiveExamsData | undefined>();
  const [skillsData, setSkillsData] = useState<SkillsData | undefined>();
  const [languagesData, setLanguagesData] = useState<LanguagesData | undefined>();
  const [projectData, setProjectData] = useState<ProjectData | undefined>();
  const [portfolioLinksData, setPortfolioLinksData] = useState<PortfolioLinksData | undefined>();
  const [certificationsData, setCertificationsData] = useState<CertificationsData | undefined>();

  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

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
    } else if (category === 'EDUCATION' && itemName === 'Education') {
      setIsEducationModalOpen(true);
    } else if (category === 'EDUCATION' && itemName === 'Academic Achievements') {
      setIsAcademicAchievementModalOpen(true);
    } else if (category === 'EDUCATION' && itemName === 'Competitive Exams') {
      setIsCompetitiveExamsModalOpen(true);
    } else if (category === 'SKILLS' && itemName === 'Skills') {
      setIsSkillsModalOpen(true);
    } else if (category === 'SKILLS' && itemName === 'Languages') {
      setIsLanguagesModalOpen(true);
    } else if (category === 'PROJECTS' && itemName === 'Projects') {
      setIsProjectModalOpen(true);
    } else if (category === 'PROJECTS' && itemName === 'Portfolio Links') {
      setIsPortfolioLinksModalOpen(true);
    } else if (category === 'CERTIFICATIONS' && itemName === 'Certifications') {
      setIsCertificationModalOpen(true);
    }
  };

  const handleAddClick = (category: string, itemName: string) => {
    // Set data to undefined to show empty fields
    if (category === 'PERSONAL DETAILS' && itemName === 'Basic Information') {
      setBasicInfoData(undefined);
      setIsBasicInfoModalOpen(true);
    } else if (category === 'PERSONAL DETAILS' && itemName === 'Summary') {
      setSummaryText('');
      setIsSummaryModalOpen(true);
    } else if (category === 'PERSONAL DETAILS' && itemName === 'Gap Explanation') {
      setGapExplanationData(undefined);
      setIsGapExplanationModalOpen(true);
    } else if (category === 'WORK HISTORY' && itemName === 'Work Experience') {
      setWorkExperienceData(undefined);
      setIsWorkExperienceModalOpen(true);
    } else if (category === 'WORK HISTORY' && itemName === 'Internships') {
      setInternshipData(undefined);
      setIsInternshipModalOpen(true);
    } else if (category === 'EDUCATION' && itemName === 'Education') {
      setEducationData(undefined);
      setIsEducationModalOpen(true);
    } else if (category === 'EDUCATION' && itemName === 'Academic Achievements') {
      setAcademicAchievementData(undefined);
      setIsAcademicAchievementModalOpen(true);
    } else if (category === 'EDUCATION' && itemName === 'Competitive Exams') {
      setCompetitiveExamsData(undefined);
      setIsCompetitiveExamsModalOpen(true);
    } else if (category === 'SKILLS' && itemName === 'Skills') {
      setSkillsData(undefined);
      setIsSkillsModalOpen(true);
    } else if (category === 'SKILLS' && itemName === 'Languages') {
      setLanguagesData(undefined);
      setIsLanguagesModalOpen(true);
    } else if (category === 'PROJECTS' && itemName === 'Projects') {
      setProjectData(undefined);
      setIsProjectModalOpen(true);
    } else if (category === 'PROJECTS' && itemName === 'Portfolio Links') {
      setPortfolioLinksData(undefined);
      setIsPortfolioLinksModalOpen(true);
    } else if (category === 'CERTIFICATIONS' && itemName === 'Certifications') {
      setCertificationsData(undefined);
      setIsCertificationModalOpen(true);
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
                    className="-rotate-90 origin-center"
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
                {profileSections.map((section, sectionIndex) => {
                  const isExpanded = expandedSections[section.category] ?? true;
                  return (
                  <div key={sectionIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">{section.category}</h4>
                        <button
                          onClick={() => toggleSection(section.category)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-transform"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease-in-out'
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>
                      {isExpanded && (
                    <ul className="space-y-1">
                          {section.items.map((item, itemIndex) => {
                            const isSelected = selectedItem?.category === section.category && selectedItem?.itemName === item.name;
                            return (
                        <li key={itemIndex}>
                          <button
                                  onClick={() => setSelectedItem({ category: section.category, itemName: item.name })}
                                  className={`w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-50 flex items-center justify-between ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                                >
                                  <span>{item.name}</span>
                                  <span className="text-gray-400">→</span>
                          </button>
                        </li>
                            );
                          })}
                    </ul>
                      )}
                  </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            {selectedItem && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                {/* Header with Edit and Add buttons */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedItem.itemName}</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(selectedItem.category, selectedItem.itemName)}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50"
                    >
                      Edit
                    </button>
                        <button 
                      onClick={() => handleAddClick(selectedItem.category, selectedItem.itemName)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
                    >
                      Add
                        </button>
                      </div>
                  </div>

                {/* Content based on selected item */}
                {selectedItem.itemName === 'Basic Information' && basicInfoData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">First Name</label>
                        <p className="text-base text-gray-900">{basicInfoData.firstName}</p>
                </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Email Address</label>
                        <div className="flex items-center gap-2">
                          <p className="text-base text-gray-900">{basicInfoData.email}</p>
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">Verified</span>
            </div>
          </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Phone Number</label>
                        <p className="text-base text-gray-900">{basicInfoData.phoneCode} {basicInfoData.phone}</p>
        </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Date of Birth</label>
                        <p className="text-base text-gray-900">{basicInfoData.dob}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Current City</label>
                        <p className="text-base text-gray-900">{basicInfoData.city}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Notice Period</label>
                        <p className="text-base text-gray-900">{basicInfoData.notice}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Last Name</label>
                        <p className="text-base text-gray-900">{basicInfoData.lastName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Gender</label>
                        <p className="text-base text-gray-900">{basicInfoData.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Current Country</label>
                        <p className="text-base text-gray-900">{basicInfoData.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-1 block">Employment Status</label>
                        <p className="text-base text-gray-900">{basicInfoData.employment}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem.itemName === 'Summary' && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Professional Summary</label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap">{summaryText || 'No summary added yet.'}</p>
              </div>
                )}

                {selectedItem.itemName === 'Gap Explanation' && (
                  <div>
                    {gapExplanationData ? (
                  <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Gap Category</label>
                          <p className="text-base text-gray-900">{gapExplanationData.gapCategory}</p>
                      </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Reason for Gap</label>
                          <p className="text-base text-gray-900">{gapExplanationData.reasonForGap}</p>
                    </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Gap Duration</label>
                          <p className="text-base text-gray-900">{gapExplanationData.gapDuration}</p>
                        </div>
                        {gapExplanationData.selectedSkills && gapExplanationData.selectedSkills.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Skills Continued</label>
                            <p className="text-base text-gray-900">{gapExplanationData.selectedSkills.join(', ')}</p>
                      </div>
                        )}
                        {gapExplanationData.coursesText && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Courses/Trainings</label>
                            <p className="text-base text-gray-900">{gapExplanationData.coursesText}</p>
                    </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No gap explanation added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Work Experience' && (
                  <div>
                    {workExperienceData ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Job Title</label>
                          <p className="text-base text-gray-900">{workExperienceData.jobTitle}</p>
                          </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Company Name</label>
                          <p className="text-base text-gray-900">{workExperienceData.companyName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Employment Type</label>
                          <p className="text-base text-gray-900">{workExperienceData.employmentType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Duration</label>
                          <p className="text-base text-gray-900">
                            {workExperienceData.startDate} - {workExperienceData.currentlyWorkHere ? 'Present' : workExperienceData.endDate}
                          </p>
                      </div>
                        {workExperienceData.workLocation && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Location</label>
                            <p className="text-base text-gray-900">{workExperienceData.workLocation}</p>
                    </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No work experience added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Internships' && (
                  <div>
                    {internshipData ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Internship Title</label>
                          <p className="text-base text-gray-900">{internshipData.internshipTitle}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Company Name</label>
                          <p className="text-base text-gray-900">{internshipData.companyName}</p>
                      </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Duration</label>
                          <p className="text-base text-gray-900">
                            {internshipData.startDate} - {internshipData.currentlyWorking ? 'Present' : internshipData.endDate}
                          </p>
                    </div>
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No internships added yet.</p>
                    )}
                    </div>
                )}

                {selectedItem.itemName === 'Education' && (
                  <div>
                    {educationData ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Education Level</label>
                          <p className="text-base text-gray-900">{educationData.educationLevel}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Degree / Program</label>
                          <p className="text-base text-gray-900">{educationData.degreeProgram}</p>
                      </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Institution / University</label>
                          <p className="text-base text-gray-900">{educationData.institutionName}</p>
                    </div>
                        {educationData.fieldOfStudy && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Field of Study / Major</label>
                            <p className="text-base text-gray-900">{educationData.fieldOfStudy}</p>
                  </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Duration</label>
                          <p className="text-base text-gray-900">
                            {educationData.startYear} - {educationData.currentlyStudying ? 'Present' : educationData.endYear}
                          </p>
                        </div>
                        {educationData.grade && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Grade / Percentage / GPA</label>
                            <p className="text-base text-gray-900">{educationData.grade}</p>
                          </div>
                        )}
                        {educationData.modeOfStudy && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Mode of Study</label>
                            <p className="text-base text-gray-900">{educationData.modeOfStudy}</p>
                          </div>
                        )}
                        {educationData.courseDuration && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Course Duration</label>
                            <p className="text-base text-gray-900">{educationData.courseDuration}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No education information added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Academic Achievements' && (
                  <div>
                    {academicAchievementData ? (
                  <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Achievement Title</label>
                          <p className="text-base text-gray-900">{academicAchievementData.achievementTitle}</p>
                      </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Awarded By</label>
                          <p className="text-base text-gray-900">{academicAchievementData.awardedBy}</p>
                    </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Year Received</label>
                          <p className="text-base text-gray-900">{academicAchievementData.yearReceived}</p>
                        </div>
                        {academicAchievementData.categoryType && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Category / Type</label>
                            <p className="text-base text-gray-900">{academicAchievementData.categoryType}</p>
                      </div>
                        )}
                        {academicAchievementData.description && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Description</label>
                            <p className="text-base text-gray-900 whitespace-pre-wrap">{academicAchievementData.description}</p>
                    </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No academic achievements added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Competitive Exams' && (
                  <div>
                    {competitiveExamsData ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Exam Name</label>
                          <p className="text-base text-gray-900">{competitiveExamsData.examName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Year Taken</label>
                          <p className="text-base text-gray-900">{competitiveExamsData.yearTaken}</p>
                      </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Result Status</label>
                          <p className="text-base text-gray-900">{competitiveExamsData.resultStatus}</p>
                    </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Score / Marks</label>
                          <p className="text-base text-gray-900">{competitiveExamsData.scoreMarks}</p>
                        </div>
                        {competitiveExamsData.scoreType && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Score Type</label>
                            <p className="text-base text-gray-900">{competitiveExamsData.scoreType}</p>
                      </div>
                        )}
                        {competitiveExamsData.validUntil && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Valid Until</label>
                            <p className="text-base text-gray-900">{competitiveExamsData.validUntil}</p>
                    </div>
                        )}
                        {competitiveExamsData.additionalNotes && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Additional Notes</label>
                            <p className="text-base text-gray-900 whitespace-pre-wrap">{competitiveExamsData.additionalNotes}</p>
                  </div>
                        )}
                </div>
                    ) : (
                      <p className="text-base text-gray-500">No competitive exam information added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Skills' && (
                  <div>
                    {skillsData && skillsData.skills.length > 0 ? (
                      <div className="space-y-4">
                        {/* Group skills by category */}
                        {(['Hard Skills', 'Soft Skills', 'Tools / Technologies'] as const).map((category) => {
                          const categorySkills = skillsData.skills.filter(skill => skill.category === category);
                          if (categorySkills.length === 0) return null;
                          return (
                            <div key={category}>
                              <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
                              <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5"
                                  >
                                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                    <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-300">
                                      {skill.proficiency}
                                    </span>
                </div>
                                ))}
              </div>
            </div>
                          );
                        })}
                        {skillsData.additionalNotes && (
                          <div className="mt-4">
                            <label className="text-sm font-medium text-gray-500 mb-1 block">Additional Notes</label>
                            <p className="text-base text-gray-900 whitespace-pre-wrap">{skillsData.additionalNotes}</p>
          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No skills added yet.</p>
                    )}
                  </div>
                )}

                {selectedItem.itemName === 'Languages' && (
                  <div>
                    {languagesData && languagesData.languages.length > 0 ? (
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Language Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Proficiency</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Speak</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Read</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Write</th>
                                {languagesData.languages.some(lang => lang.certification) && (
                                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Certification</th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {languagesData.languages.map((language, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                  <td className="py-3 px-4 text-base text-gray-900">{language.name}</td>
                                  <td className="py-3 px-4 text-base text-gray-900">{language.proficiency}</td>
                                  <td className="py-3 px-4 text-center">
                                    {language.speak ? (
                                      <span className="text-green-600">✓</span>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    {language.read ? (
                                      <span className="text-green-600">✓</span>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    {language.write ? (
                                      <span className="text-green-600">✓</span>
                                    ) : (
                                      <span className="text-gray-400">—</span>
                                    )}
                                  </td>
                                  {languagesData.languages.some(lang => lang.certification) && (
                                    <td className="py-3 px-4 text-base text-gray-900">
                                      {language.certification || '—'}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <p className="text-base text-gray-500">No languages added yet.</p>
                    )}
                  </div>
                )}

                {/* Default content for other items */}
                {!['Basic Information', 'Summary', 'Gap Explanation', 'Work Experience', 'Internships', 'Education', 'Academic Achievements', 'Competitive Exams', 'Skills', 'Languages'].includes(selectedItem.itemName) && (
                  <div>
                    <p className="text-base text-gray-500">Content for {selectedItem.itemName} will be displayed here.</p>
                  </div>
                )}
              </div>
            )}
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

      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        onSave={(data) => {
          setEducationData(data);
          setIsEducationModalOpen(false);
        }}
        initialData={educationData}
      />

      <AcademicAchievementModal
        isOpen={isAcademicAchievementModalOpen}
        onClose={() => setIsAcademicAchievementModalOpen(false)}
        onSave={(data) => {
          setAcademicAchievementData(data);
          setIsAcademicAchievementModalOpen(false);
        }}
        initialData={academicAchievementData}
      />

      <CompetitiveExamsModal
        isOpen={isCompetitiveExamsModalOpen}
        onClose={() => setIsCompetitiveExamsModalOpen(false)}
        onSave={(data) => {
          setCompetitiveExamsData(data);
          setIsCompetitiveExamsModalOpen(false);
        }}
        initialData={competitiveExamsData}
      />

      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        onSave={(data) => {
          setSkillsData(data);
          setIsSkillsModalOpen(false);
        }}
        initialData={skillsData}
      />

      <LanguagesModal
        isOpen={isLanguagesModalOpen}
        onClose={() => setIsLanguagesModalOpen(false)}
        onSave={(data) => {
          setLanguagesData(data);
          setIsLanguagesModalOpen(false);
        }}
        initialData={languagesData}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={(data) => {
          setProjectData(data);
          setIsProjectModalOpen(false);
        }}
        initialData={projectData}
      />

      <PortfolioLinksModal
        isOpen={isPortfolioLinksModalOpen}
        onClose={() => setIsPortfolioLinksModalOpen(false)}
        onSave={(data) => {
          setPortfolioLinksData(data);
          setIsPortfolioLinksModalOpen(false);
        }}
        initialData={portfolioLinksData}
      />

      <CertificationModal
        isOpen={isCertificationModalOpen}
        onClose={() => setIsCertificationModalOpen(false)}
        onSave={(data) => {
          setCertificationsData(data);
          setIsCertificationModalOpen(false);
        }}
        initialData={certificationsData}
      />

      <Footer />
    </div>
  );
}

