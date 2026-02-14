'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import SearchView from '../../components/ui/SearchView';
import EditText from '../../components/ui/EditText';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import ApplicationSuccessModal from '../../components/modals/ApplicationSuccessModal';

interface JobListing {
  id: number
  title: string
  company: string
  logo: string
  location: string
  salary: string
  type: string
  skills: string[]
  match: string
  timeAgo: string
  isHighlighted?: boolean
  description: string
  responsibilities: string[]
  requiredSkills: string[]
  niceToHaveSkills?: string[]
  companyOverview: string
  experienceLevel: string
  department?: string
  workMode: string
  industry: string
  visaAvailability: string
  applicantCount: string
  postedDate: string
  strengths?: string[]
  gaps?: string[]
}

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid')
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Screening form states
  const [experienceAnswer, setExperienceAnswer] = useState<string | null>('yes')
  const [nightShiftFocused, setNightShiftFocused] = useState(false)
  const [nightShiftValue, setNightShiftValue] = useState('')
  const [excelProficiency, setExcelProficiency] = useState(0) // 0 = Beginner, 100 = Expert
  const [joiningAvailability, setJoiningAvailability] = useState<string | null>(null)

  // Dropdown options
  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ]

  const workModeOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'on-site', label: 'On-site' }
  ]

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'executive', label: 'Executive' }
  ]

  const salaryRangeOptions = [
    { value: '0-50k', label: '$0 - $50k' },
    { value: '50k-100k', label: '$50k - $100k' },
    { value: '100k-150k', label: '$100k - $150k' },
    { value: '150k+', label: '$150k+' }
  ]

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' }
  ]

  useEffect(() => {
    loadJobListings()
  }, [])

  const loadJobListings = async () => {
    try {
      setTimeout(() => {
        const mockJobs: JobListing[] = [
          {
            id: 1,
            title: 'Software Engineer',
            company: 'Google',
            logo: '/images/img_image_29.png', // Keeping existing logo path or placeholder
            location: 'Mountain View, CA',
            salary: '$150,000 - $180,000/year',
            type: 'Full-time',
            skills: ['Python', 'Java', 'AWS'],
            match: '82% Match',
            timeAgo: '2 days ago',
            isHighlighted: true,
            description: 'As a Software Engineer at Google, you will work on a mission-driven team to develop innovative solutions that impact millions of users globally. You will be responsible for designing, developing, testing, and deploying scalable software systems. This role requires strong problem-solving skills and a passion for technology.',
            responsibilities: [
              'Design, develop, test, deploy, and maintain software.',
              'Manage individual project priorities, deadlines, and deliverables.',
              'Collaborate with other engineers and cross-functional teams.',
              'Contribute to architectural design and code reviews.',
              'Troubleshoot and debug complex issues across distributed systems.'
            ],
            requiredSkills: ['Python', 'Java', 'AWS', 'Distributed Systems', 'Data Structures'],
            niceToHaveSkills: ['Machine Learning', 'Go', 'Kubernetes', 'Microservices'],
            companyOverview: "Google's mission is to organize the world's information and make it universally accessible and useful. We build products and provide services that improve the lives of billions of people each day.",
            experienceLevel: '3-5 Years',
            department: 'Engineering',
            workMode: 'Hybrid (3 days in office)',
            industry: 'Technology',
            visaAvailability: 'Available',
            applicantCount: '300+',
            postedDate: '7/29/2024',
            strengths: [
              'Strong experience with React and Node.js',
              'Proficient in TypeScript development',
              'Experience with cloud platforms like AWS',
              'Solid understanding of SQL databases'
            ],
            gaps: [
              'Experience with cloud platforms like AWS',
              'Solid understanding of SQL databases'
            ]
          },
          {
            id: 2,
            title: 'Project Coordinator',
            company: 'Project Alpha Inc.',
            logo: '/images/img_image_29.png',
            location: 'New York, NY',
            salary: '$70k - $85k / Year',
            type: 'Full-time',
            skills: ['Agile', 'Jira', 'Reporting'],
            match: '85% Match',
            timeAgo: '3 days ago',
            isHighlighted: true,
            description: 'We are looking for a detailed-oriented Project Coordinator to join our team. You will assist project managers in organizing ongoing projects, including monitoring project plans, schedules, work hours, budgets, and expenditures.',
            responsibilities: [
              'Maintain and monitor project plans and project schedules.',
              'Organize, attend and participate in stakeholder meetings.',
              'Document and follow up on important actions and decisions from meetings.'
            ],
            requiredSkills: ['Project Management', 'Communication', 'Time Management', 'Microsoft Office'],
            companyOverview: 'Project Alpha Inc. is a leading consultancy firm specializing in project management solutions.',
            experienceLevel: 'Entry-Mid',
            workMode: 'On-site',
            industry: 'Consulting',
            visaAvailability: 'Sponsorship Available',
            applicantCount: '120+',
            postedDate: 'Jul 14, 2025'
          },
          {
            id: 3,
            title: 'Marketing Specialist',
            company: 'Global Innovations',
            logo: '/images/img_image_31.png',
            location: 'London, UK',
            salary: '£45k - £60k / Year',
            type: 'Contract',
            skills: ['SEO', 'Content', 'Analytics'],
            match: '78% Match',
            timeAgo: '5 days ago',
            description: 'We are seeking a creative Marketing Specialist to drive our digital marketing efforts. You will be responsible for creating content, managing social media, and analyzing campaign performance.',
            responsibilities: [
              'Develop and implement digital marketing strategies.',
              'Create engaging content for blog, social media, and email campaigns.',
              'Track and analyze website traffic and campaign performance metrics.'
            ],
            requiredSkills: ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Content Creation'],
            companyOverview: 'Global Innovations is a forward-thinking company dedicated to bringing new ideas to life.',
            experienceLevel: 'Mid Level',
            workMode: 'Hybrid',
            industry: 'Marketing',
            visaAvailability: 'Available',
            applicantCount: '80+',
            postedDate: 'Jul 12, 2025'
          },
          {
            id: 4,
            title: 'Data Analyst',
            company: 'Healthcare Co.',
            logo: '/images/img_image_32.png',
            location: 'Boston, MA',
            salary: '$75k - $95k / Year',
            type: 'Full-time',
            skills: ['SQL', 'Python', 'Tableau'],
            match: '88% Match',
            timeAgo: '2 days ago',
            description: 'Uncover insights from vast amounts of data to help improve patient outcomes. You will work closely with the product and clinical teams.',
            responsibilities: [
              'Interpret data, analyze results using statistical techniques and provide ongoing reports.',
              'Develop and implement databases, data collection systems, data analytics and other strategies.',
              'Acquire data from primary or secondary data sources and maintain databases/data systems.'
            ],
            requiredSkills: ['SQL', 'Python', 'Data Visualization', 'Tableau'],
            companyOverview: 'Healthcare Co. is committed to improving lives through data-driven healthcare solutions.',
            experienceLevel: 'Mid Level',
            workMode: 'On-site',
            industry: 'Healthcare',
            visaAvailability: 'Sponsorship Available',
            applicantCount: '150+',
            postedDate: 'Jul 10, 2025'
          },
          {
            id: 5,
            title: 'UI/UX Designer',
            company: 'Future Forward Agency',
            logo: '/images/img_image_33.png',
            location: 'San Francisco, CA',
            salary: '$90k - $110k / Year',
            type: 'Hybrid',
            skills: ['Figma', 'Prototyping', 'User Research'],
            match: '95% Match',
            timeAgo: 'Just now',
            description: 'Design intuitive and beautiful user interfaces for our clients. You will conduct user research and create wireframes, prototypes, and high-fidelity mockups.',
            responsibilities: [
              'Gather and evaluate user requirements in collaboration with product managers and engineers.',
              'Illustrate design ideas using storyboards, process flows and sitemaps.',
              'Design graphic user interface elements, like menus, tabs and widgets.'
            ],
            requiredSkills: ['UI/UX Design', 'Figma', 'Adobe XD', 'User Research'],
            companyOverview: 'Future Forward Agency is a premier design agency shaping the digital future.',
            experienceLevel: 'Senior Level',
            workMode: 'Hybrid',
            industry: 'Design',
            visaAvailability: 'Not Available',
            applicantCount: '40+',
            postedDate: 'Jun 28, 2025'
          },
          {
            id: 6,
            title: 'Marketing Specialist',
            company: 'Global Innovations',
            logo: '/images/img_image_34.png',
            location: 'London, UK',
            salary: '£45k - £60k / Year',
            type: 'Contract',
            skills: ['SEO', 'Content', 'Analytics'],
            match: '78% Match',
            timeAgo: '5 days ago',
            description: 'We are seeking a creative Marketing Specialist to drive our digital marketing efforts. You will be responsible for creating content, managing social media, and analyzing campaign performance.',
            responsibilities: [
              'Develop and implement digital marketing strategies.',
              'Create engaging content for blog, social media, and email campaigns.',
              'Track and analyze website traffic and campaign performance metrics.'
            ],
            requiredSkills: ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Content Creation'],
            companyOverview: 'Global Innovations is a forward-thinking company dedicated to bringing new ideas to life.',
            experienceLevel: 'Mid Level',
            workMode: 'Hybrid',
            industry: 'Marketing',
            visaAvailability: 'Available',
            applicantCount: '85+',
            postedDate: 'Jun 25, 2025'
          }
        ]
        setJobListings(mockJobs)
        setSelectedJob(mockJobs[0])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load job listings:', error)
      setLoading(false)
    }
  }

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setLocationQuery('')
  }

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job)
  }

  const handleApplyNow = () => {
    setIsScreeningModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsScreeningModalOpen(false)
    setExperienceAnswer('yes')
    setNightShiftValue('')
    setNightShiftFocused(false)
    setExcelProficiency(0)
    setJoiningAvailability(null)
  }

  const handleSubmitScreening = () => {
    console.log({
      experience: experienceAnswer,
      nightShift: nightShiftValue,
      excelProficiency,
      joiningAvailability
    })
    handleCloseModal()
    setIsSuccessModalOpen(true)
  }

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false)
  }

  const formatDate = (date: Date): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getProficiencyLabel = (value: number) => {
    if (value === 0) return 'Beginner'
    if (value <= 25) return 'Basic'
    if (value <= 50) return 'Intermediate'
    if (value <= 75) return 'Advanced'
    return 'Expert'
  }

  const handleSaveJob = () => {
    // Implement save job logic
  }

  const handleBackToGrid = () => {
    setViewMode('grid')
    setSelectedJob(null)
  }

  const renderJobCard = (job: JobListing, isCompact = false) => {
    const isActive = selectedJob?.id === job.id;

    return (
      <div
        key={job.id}
        onClick={() => handleJobClick(job)}
        className={`${isCompact ? 'p-4 mb-3' : 'p-5 mb-4'} rounded-3xl cursor-pointer transition-all duration-300 relative ${isActive
          ? 'bg-gray-900 text-white shadow-xl scale-[1.02]'
          : 'bg-white text-gray-900 hover:shadow-lg border border-gray-100'
          }`}
      >
        {/* Header: Logo, Date, Bookmark */}
        <div className={`flex justify-between items-start ${isCompact ? 'mb-3' : 'mb-4'}`}>
          <div className={`${isCompact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full overflow-hidden bg-white border border-gray-100 flex items-center justify-center p-1`}>
            <Image src="/perosn_icon.png" alt={job.company} width={48} height={48} className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>{job.postedDate}</span>
            <button className={`${isActive ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Company Name & Verified */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-semibold ${isActive ? 'text-gray-200' : 'text-gray-900'}`}>{job.company}</span>
          <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Job Title */}
        <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold ${isCompact ? 'mb-2' : 'mb-4'} ${isActive ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>

        {/* Tags */}
        <div className={`flex flex-wrap gap-2 ${isCompact ? 'mb-3' : 'mb-4'}`}>
          {/* Job Type Tag */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
            {job.type}
          </span>
          {/* Other Skills */}
          {job.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
              {skill}
            </span>
          ))}
        </div>

        {/* Salary */}
        <p className={`text-sm ${isCompact ? 'mb-3' : 'mb-6'} ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>{job.salary}</p>

        {/* Footer: Stats & Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${isActive ? 'text-gray-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className={`text-xs font-medium ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>{job.applicantCount.replace('+', '')}</span>
            </div>

            {!isCompact && (
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${isActive ? 'text-gray-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`text-xs font-medium ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>{Math.floor(Math.random() * 50) + 10}</span>
              </div>
            )}
          </div>

          <button className={`${isCompact ? 'px-4 py-1.5' : 'px-6 py-2'} rounded-full text-xs font-bold transition-transform active:scale-95 ${isActive ? 'bg-white text-gray-900 border border-white' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
            }`}>
            Details
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #fde9d4, #fafbfb, #bddffb)" }}>
      <Header />

      <main className="w-full flex-grow">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Filters Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Title / Keywords</label>
                <EditText
                  placeholder="e.g. UI Designer, Backend Developer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <EditText
                  placeholder="e.g. Remote, New York, Berlin"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Experience Level</label>
                <Dropdown
                  options={experienceLevelOptions}
                  placeholder="Select Experience Level"
                  // @ts-ignore
                  onSelect={() => { }}
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Job Type</label>
                  <Dropdown
                    options={jobTypeOptions}
                    placeholder="Select Job Type"
                    // @ts-ignore
                    onSelect={() => { }}
                    className="w-full"
                  />
                </div>
                <Button
                  text="Search"
                  // @ts-ignore
                  icon="/search-white.svg"
                  className="bg-black text-white px-8 h-[42px] mt-auto rounded-lg hover:bg-gray-800 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          {viewMode === 'grid' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Let AI find your ideal job</h2>
                  <p className="text-gray-500">Upload your CV and get matched instantly</p>
                </div>
                <Button text="Get Matched" className="bg-black text-white px-8 py-3 rounded-lg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  // Loading skeletons
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl h-64 animate-pulse"></div>
                  ))
                ) : (
                  jobListings.map(job => (
                    <div key={job.id} onClick={() => {
                      handleJobClick(job);
                      setViewMode('detail');
                    }}>
                      {renderJobCard(job)}
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={handleBackToGrid}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
                style={{ marginLeft: '4px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Grid View
              </button>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar - Job Listings */}
                <div className="w-full lg:w-[380px] flex-shrink-0">
                  <div
                    className="border border-white/60 p-4 sticky top-8 backdrop-blur-md flex flex-col"
                    style={{
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      height: "calc(100vh - 50px)",
                      maxHeight: "900px"
                    }}
                  >
                    <div className="flex items-center justify-between mb-4 px-2 flex-shrink-0">
                      <h2 className="text-lg font-semibold text-gray-900">Most Recent Jobs</h2>
                      <span className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900">View All</span>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                      {jobListings.map(job => renderJobCard(job, true))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Job Details */}
                <div className="flex-1">
                  {selectedJob ? (
                    <div
                      className="p-8 backdrop-blur-md"
                      style={{
                        borderRadius: "24px",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.02)"
                      }}
                    >
                      <div className="mb-0">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                          <div className="mb-4 lg:mb-0 max-w-[70%]">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
                            <p className="text-lg text-gray-500 mb-1">{selectedJob.company} - {selectedJob.location}</p>
                            <p className="text-lg text-gray-500">{selectedJob.salary} | {selectedJob.experienceLevel} Experience</p>
                          </div>
                          <div className="flex gap-3">
                            <button onClick={handleApplyNow} className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm">
                              Apply Now
                            </button>
                            <button onClick={handleSaveJob} className="bg-white hover:bg-blue-50 text-blue-600 font-medium px-6 py-2.5 rounded-lg border border-blue-200 transition-colors flex items-center gap-2">
                              Save Job
                            </button>
                          </div>
                        </div>

                        <div className="h-px bg-gray-200 w-full mb-8"></div>

                        <div className="flex flex-col xl:flex-row gap-8">
                          <div className="flex-1 min-w-0">
                            {/* About the Role */}
                            <section className="mb-8">
                              <h3 className="text-lg font-bold text-gray-900 mb-3">About the Role</h3>
                              <p className="text-base text-gray-600 leading-relaxed">
                                {selectedJob.description}
                              </p>
                            </section>

                            {/* Responsibilities */}
                            <section className="mb-8">
                              <h3 className="text-lg font-bold text-gray-900 mb-3">Responsibilities</h3>
                              <div className="space-y-3">
                                {selectedJob.responsibilities?.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-[2px] border-[#3b82f6] flex items-center justify-center">
                                      <svg className="w-3 h-3 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-medium">{item}</p>
                                  </div>
                                ))}
                              </div>
                            </section>

                            {/* Required Skills */}
                            <section className="mb-6">
                              <h3 className="text-lg font-bold text-gray-900 mb-3">Required Skills</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedJob.requiredSkills?.map((skill, idx) => (
                                  <span key={idx} className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full shadow-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </section>

                            {/* Nice-to-have Skills */}
                            {selectedJob.niceToHaveSkills && (
                              <section className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Nice-to-have Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJob.niceToHaveSkills.map((skill, idx) => (
                                    <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </section>
                            )}

                            {/* Job Information Grid */}
                            <section className="mb-8">
                              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Information</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Employment Type</p>
                                  <p className="font-medium text-gray-900">{selectedJob.type}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Work Mode</p>
                                  <p className="font-medium text-gray-900">{selectedJob.workMode}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                                  <p className="font-medium text-gray-900">{selectedJob.industry}</p>
                                </div>
                              </div>
                            </section>

                            {/* AI Job Fit Score Card - EXACT DESIGN MATCH */}
                            <div
                              className="rounded-[32px] p-6 relative overflow-hidden flex items-center mb-8 shadow-sm border border-blue-50"
                              style={{
                                background: "linear-gradient(135deg, #fff1e6 10%, #e8f4ff 90%)",
                                width: "632px",
                                height: "353px"
                              }}
                            >
                              <div
                                className="bg-white rounded-[24px] shadow-sm w-full h-full p-8 flex gap-8 items-center"
                              >
                                {/* Left Column: Score */}
                                <div className="flex flex-col items-center justify-between h-full min-w-[200px]">
                                  <div className="text-center space-y-1">
                                    <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">AI Job Fit Score</p>
                                    <div className="px-4 py-1.5 bg-[#3b82f6] text-white text-[10px] font-black rounded-full tracking-wider shadow-sm">
                                      Powered by SAASA AI
                                    </div>
                                  </div>

                                  <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                      <circle cx="64" cy="64" r="54" fill="transparent" stroke="#eff3f8" strokeWidth="12" />
                                      <circle
                                        cx="64"
                                        cy="64"
                                        r="54"
                                        fill="transparent"
                                        stroke="#3b82f6"
                                        strokeWidth="12"
                                        strokeDasharray={`${2 * Math.PI * 54}`}
                                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - 82 / 100)}`}
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                    <span className="absolute text-[32px] font-black text-gray-900">82%</span>
                                  </div>

                                  <button
                                    onClick={() => setIsScreeningModalOpen(true)}
                                    className="bg-[#111827] hover:bg-black text-white text-[13px] font-bold px-4 py-3 rounded-xl w-full transition-all shadow-md active:scale-95"
                                  >
                                    Improve CV for this Job
                                  </button>
                                </div>

                                {/* Right Column: Strengths & Gaps */}
                                <div className="flex-1 flex flex-col justify-center gap-8 h-full">
                                  {/* Strengths */}
                                  <div>
                                    <h4 className="text-[11px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-4">STRENGTHS</h4>
                                    <div className="space-y-3">
                                      {['Strong experience with React and Node.js', 'Proficient in TypeScript development'].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                          <div className="flex-shrink-0 w-6 h-6 rounded-full border-[2.5px] border-[#3b82f6] flex items-center justify-center mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                          </div>
                                          <p className="text-[14px] text-[#475569] font-bold leading-tight">{item}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Gaps */}
                                  <div>
                                    <h4 className="text-[11px] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-4">GAPS</h4>
                                    <div className="space-y-3">
                                      {['Experience with cloud platforms like AWS', 'Solid understanding of SQL databases'].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-[2px] border-red-500 flex items-center justify-center mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </div>
                                          <p className="text-[14px] text-[#475569] font-semibold leading-tight">{item}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Company & Highlights */}
                          <div className="w-full xl:w-[300px] flex-shrink-0 space-y-6">
                            {/* Company Overview Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-4">Company Overview</h3>
                              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                {selectedJob.companyOverview}
                              </p>
                            </div>

                            {/* Quick Highlights Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Highlights</h3>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Experience</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedJob.experienceLevel.includes('Year') ? 'Mid-Senior' : selectedJob.experienceLevel}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Mode</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedJob.workMode.split(' ')[0]}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Visa</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedJob.visaAvailability === 'Available' ? 'Available' : 'Unavailable'}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Applicants</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedJob.applicantCount}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-transparent p-8 flex items-center justify-center min-h-[500px] flex-col gap-4 text-center">
                      <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Select a job to view details</h3>
                        <p className="text-gray-500 mt-1">Click on any job card from the list to see full requirements and apply.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isScreeningModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseModal} />
          <div
            className="bg-white rounded-lg shadow-xl overflow-y-auto z-10"
            style={{
              width: "600px",
              maxHeight: "85vh",
              borderRadius: "10px",
              boxShadow: "0 0 2px 0 rgba(23, 26, 31, 0.20), 0 0 1px 0 rgba(23, 26, 31, 0.07)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Screening Questions</h2>
              <p className="text-base text-gray-700 mb-1">{selectedJob.title} — {selectedJob.company}</p>
              <p className="text-sm text-gray-600 mb-4">These quick questions help us understand if you are a good fit for the role.</p>
              <div className="h-px bg-blue-300"></div>
            </div>

            {/* Questions */}
            <div className="px-6 py-6 space-y-8">
              {/* Question 1: Experience */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-3">
                  Do you have at least 2 years of experience for this role?
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setExperienceAnswer('yes')}
                    className={`px-6 py-2.5 rounded-lg border-2 transition-colors ${experienceAnswer === 'yes'
                        ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium'
                        : 'border-blue-200 bg-white text-gray-900 hover:border-blue-300'
                      }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setExperienceAnswer('no')}
                    className={`px-6 py-2.5 rounded-lg border-2 transition-colors ${experienceAnswer === 'no'
                        ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium'
                        : 'border-blue-200 bg-white text-gray-900 hover:border-blue-300'
                      }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Question 2: Night Shift */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-3">
                  Are you willing to work in Night Shift?
                </label>
                <div className="relative">
                  <select
                    value={nightShiftValue}
                    onChange={(e) => setNightShiftValue(e.target.value)}
                    onFocus={() => setNightShiftFocused(true)}
                    onBlur={() => setNightShiftFocused(false)}
                    className={`w-full px-4 py-2.5 rounded-lg border-2 appearance-none bg-white text-gray-900 ${nightShiftFocused ? 'border-blue-500' : 'border-blue-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Question 3: Excel Proficiency */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-3">
                  Rate your proficiency in Excel
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Beginner</span>
                    <span className="text-sm text-gray-600">Expert</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={excelProficiency}
                    onChange={(e) => setExcelProficiency(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${excelProficiency}%, #e0e7ff ${excelProficiency}%, #e0e7ff 100%)`
                    }}
                  />
                  <p className="text-sm text-blue-600 font-medium">
                    Current selection: {excelProficiency < 50 ? 'Beginner' : 'Expert'}
                  </p>
                </div>
              </div>

              {/* Question 4: Joining Availability */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-3">
                  How soon can you join?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Immediate', '15 Days', '30 Days', '60 Days'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setJoiningAvailability(option)}
                      className={`px-4 py-2.5 rounded-lg border-2 transition-colors ${joiningAvailability === option
                          ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium'
                          : 'border-blue-200 bg-white text-gray-900 hover:border-blue-300'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitScreening}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Submit & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Success Modal */}
      {selectedJob && (
        <ApplicationSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          jobTitle={selectedJob.title}
          company={selectedJob.company}
          appliedDate={formatDate(new Date())}
          jobId={selectedJob.id}
        />
      )}

      <Footer />
    </div>
  )
}

export default DashboardPage
