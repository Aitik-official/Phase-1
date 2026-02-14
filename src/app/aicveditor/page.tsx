'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function AICVEditorPage() {
  const router = useRouter();
  const [summary, setSummary] = useState('Experienced software engineer with a strong background in full-stack development and cloud technologies. Proven ability to lead projects, mentor junior developers, and deliver high-quality solutions on time.');
  const [suggestedSummary, setSuggestedSummary] = useState('Proven leadership in developing scalable microservices architecture, reducing system latency by 40%, and mentoring cross-functional teams. Expert in Node.js, Python, and cloud platforms with a track record of delivering enterprise-grade solutions.');
  
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: 'Jan 2020',
      endDate: 'Present',
      responsibilities: 'Designed and implemented microservices architecture, reducing system latency by 40%. Maintained and optimized backend services using Node.js and Python. Collaborated with cross-functional teams to deliver scalable solutions.',
    },
    {
      id: 2,
      title: 'Senior Software Engineer',
      company: 'Innovate Systems',
      startDate: 'Jul 2017',
      endDate: 'Dec 2019',
      responsibilities: 'Designed and implemented RESTful APIs for mobile and web applications. Collaborated with product managers to define technical requirements and project timelines.',
    },
  ]);

  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      institution: 'State University',
      startYear: '2015',
      endYear: '2017',
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Electrical Engineering',
      institution: 'Polytechnic Institute',
      startYear: '2011',
      endYear: '2015',
    },
  ]);

  const [existingSkills, setExistingSkills] = useState([
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 
    'TypeScript', 'JavaScript', 'SQL', 'MongoDB', 'Git', 'Agile', 
    'Microservices', 'System Design'
  ]);

  const [aiSuggestedSkills, setAiSuggestedSkills] = useState([
    'Leadership', 'Project Management', 'Cloud Architecture', 
    'Frontend Development', 'Backend Development', 'CI/CD', 
    'Database Management', 'Security Best Practices', 'Machine Learning Basics'
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [aiRewriteSuggestions, setAiRewriteSuggestions] = useState([
    {
      id: 1,
      original: 'Designed and implemented microservices architecture, reducing system latency by 40%.',
      improved: 'Architected and deployed scalable microservices infrastructure, achieving 40% latency reduction through optimized service communication and caching strategies.',
    },
    {
      id: 2,
      original: 'Designed and implemented RESTful APIs for mobile and web applications.',
      improved: 'Developed robust RESTful API solutions serving mobile and web platforms, implementing authentication, rate limiting, and comprehensive error handling.',
    },
  ]);

  const [highPriorityKeywords] = useState([
    'Software Engineering', 'Microservices', 'Cloud Computing', 
    'Full-stack Development', 'Machine Learning'
  ]);

  const [recommendedKeywords] = useState([
    'DevOps', 'API Development', 'Agile Methodologies'
  ]);

  const [optionalKeywords] = useState([
    'Data Structures', 'Algorithms', 'System Architecture'
  ]);

  const [expandedSection, setExpandedSection] = useState<string | null>('summary');

  const toggleSection = (section: string) => {
    // If clicking on an already expanded section, collapse it
    // Otherwise, expand the clicked section and collapse all others
    setExpandedSection(prev => prev === section ? null : section);
  };

  const removeSkill = (skill: string) => {
    setExistingSkills(prev => prev.filter(s => s !== skill));
  };

  const addSkill = (skill: string) => {
    if (skill && !existingSkills.includes(skill)) {
      setExistingSkills(prev => [...prev, skill]);
      setNewSkill('');
    }
  };

  const addAiSuggestedSkill = (skill: string) => {
    if (!existingSkills.includes(skill)) {
      setExistingSkills(prev => [...prev, skill]);
      setAiSuggestedSkills(prev => prev.filter(s => s !== skill));
    }
  };

  const applyRewrite = (suggestionId: number) => {
    const suggestion = aiRewriteSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      const expIndex = experiences.findIndex(exp => 
        exp.responsibilities.includes(suggestion.original)
      );
      if (expIndex !== -1) {
        const updated = [...experiences];
        updated[expIndex].responsibilities = updated[expIndex].responsibilities.replace(
          suggestion.original,
          suggestion.improved
        );
        setExperiences(updated);
      }
      setAiRewriteSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    }
  };

  const discardRewrite = (suggestionId: number) => {
    setAiRewriteSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleSubmit = () => {
    // Redirect to dashboard page
    router.push('/candidate-dashboard');
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        width: '1440px',
        minHeight: '4127px',
        background: '#F8F9FA',
        boxShadow: '0 3px 6px 0 rgba(18, 15, 40, 0.12)',
        margin: '0 auto',
      }}
    >
      <Header />

      <main className="flex-1 px-6 py-8" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {/* Export CV Button */}
        <div className="mb-6">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Export CV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - CV Preview */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ABIGAIL HALL</h1>
              <p className="text-xl text-gray-600">Senior Software Engineer</p>
            </div>

            {/* Summary */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Summary</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Experience</h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.responsibilities}</p>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Education</h2>
              {educations.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </section>

            {/* Key Achievements */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Key Achievements</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Enhanced Data Integration</li>
                <li>Improved System Performance</li>
              </ul>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {existingSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Certification */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Certification</h2>
              <p className="text-sm text-gray-700">[Certification details]</p>
            </section>
          </div>

          {/* Right Column - AI Editing Tools */}
          <div className="space-y-6">
            {/* Summary Editing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Summary Editing</h3>
                <button
                  onClick={() => toggleSection('summary')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {expandedSection === 'summary' && (
                <div className="space-y-4">
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    rows={4}
                  />
                  <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors">
                    AI Improve Summary
                  </button>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Suggested improvement:</p>
                    <p className="text-sm text-gray-900">{suggestedSummary}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Experience Editing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Experience Editing</h3>
                <button
                  onClick={() => toggleSection('experience')}
                  className="text-gray-400 hover:text-gray-600 transition-transform"
                  style={{
                    transform: expandedSection === 'experience' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {expandedSection === 'experience' && (
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const updated = experiences.map(ex => ex.id === exp.id ? { ...ex, title: e.target.value } : ex);
                            setExperiences(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Job Title"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = experiences.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex);
                            setExperiences(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Company"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = experiences.map(ex => ex.id === exp.id ? { ...ex, startDate: e.target.value } : ex);
                            setExperiences(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Start Date"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updated = experiences.map(ex => ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex);
                            setExperiences(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="End Date"
                        />
                      </div>
                      <textarea
                        value={exp.responsibilities}
                        onChange={(e) => {
                          const updated = experiences.map(ex => ex.id === exp.id ? { ...ex, responsibilities: e.target.value } : ex);
                          setExperiences(updated);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                        rows={3}
                        placeholder="Responsibilities"
                      />
                      <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors">
                        AI Rewrite Responsibilities
                      </button>
                    </div>
                  ))}
                  <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                    Add Experience
                  </button>
                </div>
              )}
            </div>

            {/* Education Editing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Education Editing</h3>
                <button
                  onClick={() => toggleSection('education')}
                  className="text-gray-400 hover:text-gray-600 transition-transform"
                  style={{
                    transform: expandedSection === 'education' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {expandedSection === 'education' && (
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = educations.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed);
                          setEducations(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = educations.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed);
                          setEducations(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Institution"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) => {
                            const updated = educations.map(ed => ed.id === edu.id ? { ...ed, startYear: e.target.value } : ed);
                            setEducations(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Start Year"
                        />
                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) => {
                            const updated = educations.map(ed => ed.id === edu.id ? { ...ed, endYear: e.target.value } : ed);
                            setEducations(updated);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="End Year"
                        />
                      </div>
                      <button className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors">
                        AI Improve Education Details
                      </button>
                    </div>
                  ))}
                  <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                    Add Education
                  </button>
                </div>
              )}
            </div>

            {/* Skills Editing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Skills Editing</h3>
                <button
                  onClick={() => toggleSection('skills')}
                  className="text-gray-400 hover:text-gray-600 transition-transform"
                  style={{
                    transform: expandedSection === 'skills' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {expandedSection === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Existing Skills</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {existingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Add new skill"
                      />
                      <button
                        onClick={() => addSkill(newSkill)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Skill
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">AI Suggested Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() => addAiSuggestedSkill(skill)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            +
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Rewrite Suggestions */}
            {aiRewriteSuggestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Review and apply AI generated improvements.</h3>
                  <button
                    onClick={() => toggleSection('aiRewrite')}
                    className="text-gray-400 hover:text-gray-600 transition-transform"
                    style={{
                      transform: expandedSection === 'aiRewrite' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {expandedSection === 'aiRewrite' && (
                  <div className="space-y-4">
                    {aiRewriteSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">AI Rewrite Suggestion</p>
                        <p className="text-sm text-gray-600 mb-2 line-through">{suggestion.original}</p>
                        <p className="text-sm text-gray-900 mb-4">{suggestion.improved}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => discardRewrite(suggestion.id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Discard
                          </button>
                          <button
                            onClick={() => applyRewrite(suggestion.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Keyword Suggestions (ATS) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Optimize your CV with relevant industry keywords.</h3>
                <button
                  onClick={() => toggleSection('keywords')}
                  className="text-gray-400 hover:text-gray-600 transition-transform"
                  style={{
                    transform: expandedSection === 'keywords' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {expandedSection === 'keywords' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">High Priority Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {highPriorityKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommended Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendedKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Optional Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {optionalKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              className="w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg rounded-lg transition-colors shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
