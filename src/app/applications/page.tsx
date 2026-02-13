'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: 'Under Review' | 'Submitted' | 'Shortlisted' | 'Selected' | 'Rejected';
  appliedDate: string;
  matchScore: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Under Review':
      return 'bg-blue-100 text-blue-700';
    case 'Submitted':
      return 'bg-gray-100 text-gray-700';
    case 'Shortlisted':
      return 'bg-purple-100 text-purple-700';
    case 'Selected':
      return 'bg-green-100 text-green-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const STATUS_OPTIONS = ['All', 'Under Review', 'Submitted', 'Shortlisted', 'Selected', 'Rejected'];
const DATE_OPTIONS = ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year'];

export default function ApplicationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [displayedApplications, setDisplayedApplications] = useState(6);

  // Sample applications data
  const applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'SAASA Tech Solutions',
      status: 'Selected',
      appliedDate: '2024-08-10',
      matchScore: 95,
    },
    {
      id: '2',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Minds Studio',
      status: 'Submitted',
      appliedDate: '2023-11-01',
      matchScore: 78,
    },
    {
      id: '3',
      jobTitle: 'Product Manager',
      company: 'Global Innovations Co.',
      status: 'Shortlisted',
      appliedDate: '2023-09-15',
      matchScore: 92,
    },
    {
      id: '4',
      jobTitle: 'Data Scientist',
      company: 'Analytics Edge Ltd.',
      status: 'Selected',
      appliedDate: '2023-08-20',
      matchScore: 95,
    },
    {
      id: '5',
      jobTitle: 'Backend Engineer',
      company: 'Cloud Services Corp.',
      status: 'Rejected',
      appliedDate: '2023-10-05',
      matchScore: 60,
    },
    {
      id: '6',
      jobTitle: 'DevOps Specialist',
      company: 'Secure Systems GmbH',
      status: 'Under Review',
      appliedDate: '2023-11-10',
      matchScore: 88,
    },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchQuery === '' || 
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const displayedApps = filteredApplications.slice(0, displayedApplications);

  const handleLoadMore = () => {
    setDisplayedApplications(prev => prev + 6);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title or company"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  Status: {status}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              {DATE_OPTIONS.map((date) => (
                <option key={date} value={date}>
                  Date: {date}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {displayedApps.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedApps.map((application) => (
                <div
                  key={application.id}
                  className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    boxShadow: '0 3px 6px 0 rgba(18, 15, 40, 0.12)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-600">{application.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Applied</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(application.appliedDate)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Match Score</span>
                      <span className="text-sm font-semibold text-gray-900">{application.matchScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${application.matchScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/applications/${application.id}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Status
                  </button>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {displayedApplications < filteredApplications.length && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No applications found matching your criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
