'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import SearchView from '../../components/ui/SearchView';
import EditText from '../../components/ui/EditText';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import Image from 'next/image';

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
}

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false)
  
  // Screening form states
  const [experienceAnswer, setExperienceAnswer] = useState<string | null>('yes') // Default to 'yes' as shown in image
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
      // Simulate API call
      setTimeout(() => {
        const mockJobs: JobListing[] = [
          {
            id: 1,
            title: 'Project Coordinator',
            company: 'Project Alpha Inc.',
            logo: '/images/img_image_29.png',
            location: 'New York, NY',
            salary: '$70k - $85k / Year',
            type: 'Full-time',
            skills: ['Agile', 'Jira', 'Reporting'],
            match: '85% Match',
            timeAgo: '3 days ago',
            isHighlighted: true
          },
          {
            id: 2,
            title: 'Software Engineer',
            company: 'Tech Solutions LLC',
            logo: '/images/img_image_30.png',
            location: 'Remote',
            salary: '$100k - $130k / Year',
            type: 'Full-time',
            skills: ['React', 'Node.js', 'AWS'],
            match: '92% Match',
            timeAgo: '1 day ago'
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
            timeAgo: '5 days ago'
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
            timeAgo: '2 days ago'
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
            timeAgo: 'Just now'
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
            timeAgo: '5 days ago'
          }
        ]
        setJobListings(mockJobs)
        setSelectedJob(mockJobs[0]) // Default to first job
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load job listings:', error)
      setLoading(false)
    }
  }

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setLocationQuery('')
    // Reset other filters
  }

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job)
  }

  const handleApplyNow = () => {
    setIsScreeningModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsScreeningModalOpen(false)
    // Reset form
    setExperienceAnswer('yes')
    setNightShiftValue('')
    setNightShiftFocused(false)
    setExcelProficiency(0)
    setJoiningAvailability(null)
  }
  
  const handleSubmitScreening = () => {
    // Handle form submission
    console.log({
      experience: experienceAnswer,
      nightShift: nightShiftValue,
      excelProficiency,
      joiningAvailability
    })
    // Close modal or navigate to next step
    handleCloseModal()
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

  const renderJobCard = (job: JobListing) => (
    <div
      key={job.id}
      onClick={() => handleJobClick(job)}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md mb-3 ${
        job.isHighlighted 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 bg-white'
      } ${selectedJob?.id === job.id ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex items-start gap-4 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0" style={{ 
          backgroundColor: job.id % 3 === 1 ? "#E0F2FE" : job.id % 3 === 2 ? "#D1FAE5" : "#FEF3C7",
          border: `1px solid ${job.id % 3 === 1 ? "#BAE6FD" : job.id % 3 === 2 ? "#A7F3D0" : "#FDE68A"}`
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left wing - curved rectangle */}
            <rect x="2" y="9" width="3.5" height="9" rx="1.5" fill={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"}/>
            {/* Central structure - taller with arched entrance */}
            <path d="M6.5 18V13C6.5 12.4477 6.94772 12 7.5 12H12.5C13.0523 12 13.5 12.4477 13.5 13V18H6.5Z" fill={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"}/>
            <rect x="7.5" y="5" width="5" height="7" rx="0.5" fill={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"}/>
            {/* Arched entrance base */}
            <path d="M7.5 13C7.5 12.4477 7.94772 12 8.5 12H11.5C12.0523 12 12.5 12.4477 12.5 13V13.5C12.5 13.7761 12.2761 14 12 14H8C7.72386 14 7.5 13.7761 7.5 13.5V13Z" fill={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"}/>
            {/* Windows - three horizontal lines */}
            <line x1="8.5" y1="7.5" x2="11.5" y2="7.5" stroke={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"} strokeWidth="0.8"/>
            <line x1="8.5" y1="9" x2="11.5" y2="9" stroke={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"} strokeWidth="0.8"/>
            <line x1="8.5" y1="10.5" x2="11.5" y2="10.5" stroke={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"} strokeWidth="0.8"/>
            {/* Right wing - curved rectangle */}
            <rect x="14.5" y="9" width="3.5" height="9" rx="1.5" fill={job.id % 3 === 1 ? "#0EA5E9" : job.id % 3 === 2 ? "#10B981" : "#F59E0B"}/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M2 5C2 4.44772 2.44772 4 3 4H13C13.5523 4 14 4.44772 14 5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V5Z"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4V2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2V4"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-base font-medium text-gray-900">{job.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1">
          <Image
            src="/images/img_map_pin_blue_500.svg"
            alt="Location"
            width={16}
            height={16}
          />
          <span className="text-gray-600">{job.location}</span>
        </div>
        <span className="text-green-600 font-medium">{job.salary}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          {job.match}
        </span>
        <span className="text-xs text-gray-500">{job.timeAgo}</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f8eacf, #d0b484)" }}>
      <Header />
      
      <main className="w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Filters Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
            <div>
              {/* Primary Search Row */}
              <div className="flex flex-col lg:flex-row gap-4 items-start mb-4">
                <div className="flex-1 w-full lg:w-auto">
                  <SearchView
                    placeholder="Search job titles, skills, companies"
                    value={searchQuery}
                    onSubmit={handleSearchSubmit}
                    className="w-full"
                  />
                </div>
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      placeholder="City, state or country"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="w-full lg:w-auto lg:min-w-[120px]">
                  <Dropdown
                    placeholder="Job Type"
                    options={jobTypeOptions}
                    className="w-full"
                  />
                </div>
                <div className="w-full lg:w-auto lg:min-w-[120px]">
                  <Dropdown
                    placeholder="Work Mode"
                    options={workModeOptions}
                    className="w-full"
                  />
                </div>
                <div className="w-full lg:w-auto lg:min-w-[140px]">
                  <Dropdown
                    placeholder="Experience Level"
                    options={experienceLevelOptions}
                    className="w-full"
                  />
                </div>
                <div className="w-full lg:w-auto lg:min-w-[130px]">
                  <Dropdown
                    placeholder="Salary Range"
                    options={salaryRangeOptions}
                    className="w-full"
                  />
                </div>
                <div className="w-full lg:w-auto lg:min-w-[110px]">
                  <Dropdown
                    placeholder="Industry"
                    options={industryOptions}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Reset Filters Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleResetFilters}
                  text="Reset Filters"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Left Sidebar - Job Listings */}
            <div className="w-full" style={{ maxWidth: "580px", width: "100%", marginLeft: "-40px", marginRight: "10px", paddingLeft: "40px" }}>
              <div 
                className="bg-white border border-gray-200 p-4"
                style={{
                  width: "374px",
                  minHeight: "1331px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  opacity: 1
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Most Recent Jobs</h2>
                  <a href="/jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    View All
                  </a>
                </div>

                <div className="space-y-1">
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-32 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    jobListings.slice(0, 6).map(renderJobCard)
                  )}
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gray-200"></div>

            {/* Right Content - Job Details */}
            <div className="flex-1">
              {selectedJob ? (
                <div className="bg-gray-50 p-8 min-h-screen" style={{ maxWidth: "1150px", width: "100%", marginLeft: "-20px", paddingLeft: "20px" }}>
                  {/* Job Header */}
                  <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0" style={{ maxWidth: "85%" }}>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          Software Engineer
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">Google - Mountain View, CA</p>
                        <p className="text-base text-gray-600">
                          $150,000 - $180,000/year | 3-5 Years Experience
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleApplyNow}
                          className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm flex items-center justify-center font-medium transition-colors"
                          style={{ 
                            width: "122px",
                            height: "40px",
                            borderRadius: "10px",
                            opacity: 1,
                            padding: 0
                          }}
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={handleSaveJob}
                          className="bg-gray-50 border border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center font-medium transition-colors"
                          style={{ 
                            width: "122px",
                            height: "40px",
                            borderRadius: "10px",
                            opacity: 1,
                            padding: 0
                          }}
                        >
                          Save Job
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 mb-8"></div>

                    {/* Job Content */}
                    <div className="flex flex-col xl:flex-row gap-8">
                      <div className="flex-1">
                        {/* About the Role */}
                        <section className="mb-8">
                          <h2 className="text-xl font-medium text-gray-900 mb-4">About the Role</h2>
                          <p className="text-base text-gray-600 leading-6 mb-8">
                            As a Software Engineer at Google, you will work on a mission-driven team to develop innovative solutions that impact millions of users globally. You will be responsible for designing, developing, testing, and deploying scalable software systems. This role requires strong problem-solving skills and a passion for technology.
                          </p>

                          <h3 className="text-xl font-medium text-gray-900 mb-4">Responsibilities</h3>
                          <div className="space-y-3 mb-8">
                            {[
                              'Design, develop, test, deploy, and maintain software.',
                              'Manage individual project priorities, deadlines, and deliverables.',
                              'Collaborate with other engineers and cross-functional teams.',
                              'Contribute to architectural design and code reviews.',
                              'Troubleshoot and debug complex issues across distributed systems.'
                            ].map((responsibility, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <Image
                                  src="/circle-check-big.svg"
                                  alt="Check"
                                  width={17}
                                  height={17}
                                  className="mt-0.5 flex-shrink-0"
                                />
                                <p className="text-base text-gray-600">{responsibility}</p>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Required Skills */}
                        <section className="mb-8">
                          <h2 className="text-xl font-medium text-gray-900 mb-4">Required Skills</h2>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {['Python', 'Java', 'AWS', 'Distributed Systems', 'Data Structures'].map((skill) => (
                              <span
                                key={skill}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Nice-to-have Skills */}
                        <section className="mb-8">
                          <h2 className="text-xl font-medium text-gray-900 mb-4">Nice-to-have Skills</h2>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {['Machine Learning', 'Go', 'Kubernetes', 'Microservices'].map((skill) => (
                              <span
                                key={skill}
                                className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Job Information */}
                        <section className="mb-8">
                          <h2 className="text-xl font-medium text-gray-900 mb-4">Job Information</h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Employment Type</h4>
                              <p className="text-base font-medium text-gray-900">Full-time</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Work Mode</h4>
                              <p className="text-base font-medium text-gray-900">Hybrid (3 days in office)</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Industry</h4>
                              <p className="text-base font-medium text-gray-900">Technology</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Department</h4>
                              <p className="text-base font-medium text-gray-900">Engineering</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Experience Level</h4>
                              <p className="text-base font-medium text-gray-900">3-5 Years</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-gray-600 mb-1">Posted Date</h4>
                              <p className="text-base font-medium text-gray-900">7/29/2024</p>
                            </div>
                          </div>
                        </section>

                        {/* AI Job Fit Score */}
                        <section className="mb-8">
                          <div 
                            className="bg-gradient-to-r from-orange-100 via-blue-100 to-blue-200 p-8"
                            style={{
                              width: "680px",
                              height: "380px",
                              borderRadius: "16.05px",
                              opacity: 1,
                              boxShadow: "0px 5.35px 6.69px -4.01px rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                              {/* Score Section */}
                              <div className="lg:w-1/3 bg-white bg-opacity-75 rounded-lg p-6 flex flex-col items-center justify-center" style={{ marginTop: "-5px" }}>
                                <div className="text-center mb-6">
                                  <p className="text-xs font-medium text-gray-700 mb-1">AI Job Fit Score</p>
                                  <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-lg inline-block">
                                    POWERED BY SAASA AI
                                  </div>
                                </div>
                                <div className="text-center mb-6">
                                  <div className="relative w-28 h-28 mx-auto">
                                    <svg viewBox="0 0 100 100" className="w-28 h-28">
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
                                        strokeDasharray={`${82 * 2.83} 283`}
                                        strokeLinecap="round"
                                        className="rotate-[-90deg] origin-center"
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-3xl font-medium text-gray-900">82%</span>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                  <Button
                                    text="Improve CV for this job"
                                    className="bg-gray-900 text-white text-xs px-5 py-2 rounded-lg shadow-sm"
                                  />
                                </div>
                              </div>

                              {/* Details Section */}
                              <div 
                                className="lg:w-2/3 bg-white bg-opacity-75 rounded-lg flex flex-col justify-center"
                                style={{
                                  padding: "20px",
                                  minHeight: "auto",
                                  height: "fit-content",
                                  marginTop: "-5px"
                                }}
                              >
                                <div className="space-y-5">
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2.5">
                                      Strengths
                                    </h4>
                                    <div className="space-y-1.5">
                                      {[
                                        'Strong experience with React and Node.js',
                                        'Proficient in TypeScript development',
                                        'Experience with cloud platforms like AWS',
                                        'Solid understanding of SQL databases'
                                      ].map((strength, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                          <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mt-0.5 flex-shrink-0"
                                          >
                                            <path
                                              d="M10 3L4.5 8.5L2 6"
                                              stroke="#22C55E"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <p className="text-xs text-gray-700 leading-relaxed">{strength}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2.5">
                                      Gaps
                                    </h4>
                                    <div className="space-y-1.5">
                                      {[
                                        'Limited experience with Kubernetes',
                                        'Less exposure to GraphQL APIs'
                                      ].map((gap, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                          <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mt-0.5 flex-shrink-0"
                                          >
                                            <path
                                              d="M3 3L9 9M9 3L3 9"
                                              stroke="#EF4444"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                          <p className="text-xs text-gray-700 leading-relaxed">{gap}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2.5">
                                      Missing Keywords
                                    </h4>
                                    <div className="flex gap-2" style={{ flexWrap: "nowrap" }}>
                                      {['CI/CD', 'Agile Methodologies', 'Microservices Architecture'].map((keyword) => (
                                        <span
                                          key={keyword}
                                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md whitespace-nowrap"
                                        >
                                          {keyword}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Sidebar - Company Info */}
                      <div className="w-full xl:w-auto">
                        <div className="space-y-6">
                          <div 
                            className="bg-white rounded-xl p-6 shadow-sm"
                            style={{
                              width: "260px",
                              height: "273px"
                            }}
                          >
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Overview</h3>
                            <p className="text-sm text-gray-600 leading-5 mb-4">
                              Google's mission is to organize the world's information and make it universally accessible and useful. We build products and provide services that improve the lives of billions of people each day.
                            </p>
                            <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                              View Google Profile
                            </a>
                          </div>

                          <div 
                            className="bg-white rounded-xl p-6 shadow-sm"
                            style={{
                              width: "270px",
                              height: "273px"
                            }}
                          >
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Quick Highlights</h3>
                            <div className="space-y-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-gray-600">Experience Level</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Image
                                      src="/images/img_award.svg"
                                      alt="Award"
                                      width={14}
                                      height={14}
                                    />
                                    <span className="text-xs font-medium text-gray-900">Mid-Senior Level</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Work Mode</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Image
                                      src="/images/img_briefcase_business.svg"
                                      alt="Briefcase"
                                      width={12}
                                      height={12}
                                    />
                                    <span className="text-xs font-medium text-gray-900">Hybrid</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-gray-600">Visa Sponsorship</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Image
                                      src="/images/img_graduation_cap.svg"
                                      alt="Graduation"
                                      width={14}
                                      height={14}
                                    />
                                    <span className="text-xs font-medium text-gray-900">Available</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Applicants</p>
                                  <span className="text-xs font-medium text-gray-900">300+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 flex items-center justify-center min-h-96">
                  <p className="text-gray-500">Select a job to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quick Screening Questions Modal */}
      {isScreeningModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleCloseModal}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-lg shadow-xl overflow-y-auto border border-blue-200"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "600px",
                maxHeight: "85vh"
              }}
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Screening Questions</h2>
                <p className="text-lg text-gray-900 mb-1">Senior Frontend Engineer — Tech Innovators Inc.</p>
                <p className="text-sm text-gray-600">
                  These quick questions help us understand if you are a good fit for the role.
                </p>
                <div className="h-px bg-blue-300 mt-4"></div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 space-y-8">
                {/* Question 1: Experience */}
                <div>
                  <label className="block text-base font-medium text-gray-900 mb-3">
                    Do you have at least 2 years of experience for this role?
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setExperienceAnswer('yes')}
                      className={`px-6 py-2.5 rounded-lg border font-medium transition-colors ${
                        experienceAnswer === 'yes'
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      style={{
                        borderRadius: "8px"
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setExperienceAnswer('no')}
                      className={`px-6 py-2.5 rounded-lg border font-medium transition-colors ${
                        experienceAnswer === 'no'
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                      style={{
                        borderRadius: "8px"
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Question 2: Night Shift - Floating Label */}
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
                      className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        nightShiftFocused || nightShiftValue ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "100%",
                        height: "48.19px",
                        borderRadius: "5.02px",
                        border: "1px solid #99A1AF",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="maybe">Maybe</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        nightShiftFocused || nightShiftValue
                          ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-4 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        nightShiftFocused || nightShiftValue
                          ? {
                              color: "#239CD2",
                            }
                          : undefined
                      }
                    >
                      Select an option
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="#99A1AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={excelProficiency}
                        onChange={(e) => setExcelProficiency(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${excelProficiency}%, #e5e7eb ${excelProficiency}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <p className="text-sm text-blue-500">
                      Current selection: {getProficiencyLabel(excelProficiency)}
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
                        className={`px-6 py-2.5 rounded-lg border font-medium transition-colors ${
                          joiningAvailability === option
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        style={{
                          borderRadius: "8px"
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-blue-500 font-medium hover:text-blue-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitScreening}
                  className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Submit & Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default DashboardPage

