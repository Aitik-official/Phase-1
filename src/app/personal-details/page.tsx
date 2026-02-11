"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/common/Header";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [fullNameValue, setFullNameValue] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [nationalityFocused, setNationalityFocused] = useState(false);
  const [nationalityValue, setNationalityValue] = useState("");
  const [dobFocused, setDobFocused] = useState(false);
  const [dobValue, setDobValue] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);
  const [addressValue, setAddressValue] = useState("");
  const [genderFocused, setGenderFocused] = useState(false);
  const [genderValue, setGenderValue] = useState("Male");
  const [alternateNumbers, setAlternateNumbers] = useState<string[]>(['']);
  const [alternateNumberFocused, setAlternateNumberFocused] = useState<boolean[]>([false]);
  const [countryFocused, setCountryFocused] = useState(false);
  const [countryValue, setCountryValue] = useState("");
  const [cityFocused, setCityFocused] = useState(false);
  const [cityValue, setCityValue] = useState("");
  const [maritalStatusFocused, setMaritalStatusFocused] = useState(false);
  const [maritalStatusValue, setMaritalStatusValue] = useState("");
  const [passportFocused, setPassportFocused] = useState(false);
  const [passportValue, setPassportValue] = useState("");
  const [linkedinFocused, setLinkedinFocused] = useState(false);
  const [linkedinValue, setLinkedinValue] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form switching state
  const [activeForm, setActiveForm] = useState<'personal' | 'education' | 'skills' | 'work-exp' | 'salary-exp'>('personal');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // Education form state
  interface Education {
    id: number;
    degree: string;
    institution: string;
    specialization: string;
    startYear: string;
    endYear: string;
  }
  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      degree: "",
      institution: "",
      specialization: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const [degreeFocused, setDegreeFocused] = useState<{ [key: number]: boolean }>({});
  const [degreeValue, setDegreeValue] = useState<{ [key: number]: string }>({});
  const [institutionFocused, setInstitutionFocused] = useState<{ [key: number]: boolean }>({});
  const [institutionValue, setInstitutionValue] = useState<{ [key: number]: string }>({});
  const [specializationFocused, setSpecializationFocused] = useState<{ [key: number]: boolean }>({});
  const [specializationValue, setSpecializationValue] = useState<{ [key: number]: string }>({});
  const [startYearFocused, setStartYearFocused] = useState<{ [key: number]: boolean }>({});
  const [startYearValue, setStartYearValue] = useState<{ [key: number]: string }>({});
  const [endYearFocused, setEndYearFocused] = useState<{ [key: number]: boolean }>({});
  const [endYearValue, setEndYearValue] = useState<{ [key: number]: string }>({});
  const startYearInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const endYearInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const degrees = [
    "Bachelor of Engineering",
    "Bachelor of Science",
    "Bachelor of Arts",
    "Bachelor of Commerce",
    "Master of Engineering",
    "Master of Science",
    "Master of Business Administration",
    "Doctor of Philosophy",
  ];
  const institutions = [
    "University of Mumbai",
    "Indian Institute of Technology",
    "Delhi University",
    "Bangalore University",
    "Anna University",
    "Jawaharlal Nehru University",
    "University of Delhi",
    "Calcutta University",
  ];
  const specializations = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics Engineering",
    "Information Technology",
    "Business Administration",
    "Data Science",
  ];

  const addEducation = () => {
    const newId = Math.max(...educations.map((e) => e.id), 0) + 1;
    setEducations((prev) => [
      ...prev,
      {
        id: newId,
        degree: "",
        institution: "",
        specialization: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const deleteEducation = (id: number) => {
    if (educations.length > 1) {
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
      setDegreeValue((prev) => {
        const newVal = { ...prev };
        delete newVal[id];
        return newVal;
      });
      setInstitutionValue((prev) => {
        const newVal = { ...prev };
        delete newVal[id];
        return newVal;
      });
      setSpecializationValue((prev) => {
        const newVal = { ...prev };
        delete newVal[id];
        return newVal;
      });
      setStartYearValue((prev) => {
        const newVal = { ...prev };
        delete newVal[id];
        return newVal;
      });
      setEndYearValue((prev) => {
        const newVal = { ...prev };
        delete newVal[id];
        return newVal;
      });
    }
  };

  // Skills form state
  const [userSkills, setUserSkills] = useState<string[]>([
    "Project Management",
    "Agile Methodologies",
    "Data Analysis",
    "Strategic Planning",
    "Leadership",
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [skillInputFocused, setSkillInputFocused] = useState(false);
  const [languages, setLanguages] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]);
  const [languageProficiencies, setLanguageProficiencies] = useState<{ [key: string]: string }>({
    English: "Fluent",
  });

  const aiSuggestedSkills = [
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Cybersecurity",
    "DevOps",
    "Blockchain",
  ];

  const languageChips = ["English", "Spanish", "Chinese", "Hindi", "Arabic", "French", "Portuguese"];

  const addSkill = () => {
    if (skillInput.trim() && !userSkills.includes(skillInput.trim())) {
      setUserSkills([...userSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setUserSkills(userSkills.filter((s) => s !== skill));
  };

  const addAISuggestedSkill = (skill: string) => {
    if (!userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const toggleLanguage = (value: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(value)) {
        setLanguageProficiencies((profs) => {
          const newProfs = { ...profs };
          delete newProfs[value];
          return newProfs;
        });
        return prev.filter((v) => v !== value);
      } else {
        setLanguageProficiencies((profs) => ({
          ...profs,
          [value]: "Basic",
        }));
        return [...prev, value];
      }
    });
  };

  const removeLanguage = (value: string) => {
    setSelectedLanguages((prev) => prev.filter((v) => v !== value));
    setLanguageProficiencies((profs) => {
      const newProfs = { ...profs };
      delete newProfs[value];
      return newProfs;
    });
  };

  const handleLanguageEnterKey = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      if (!selectedLanguages.includes(trimmedValue)) {
        setSelectedLanguages((prev) => [trimmedValue, ...prev]);
        setLanguageProficiencies((profs) => ({
          ...profs,
          [trimmedValue]: "Basic",
        }));
        setLanguages("");
      }
    }
  };

  const fieldStyle = {
    height: "45px",
    borderRadius: "8px",
    border: "1px solid #E1E1E1",
    backgroundColor: "#F4F4F4",
    width: "calc(100% - 24px)",
    marginLeft: "12px",
    marginRight: "12px",
  };

  const labelFloating = (focused: boolean, hasValue: boolean) =>
    focused || hasValue
      ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
      : "left-6 top-1/2 -translate-y-1/2 text-sm";

  const labelColor = (focused: boolean, hasValue: boolean) =>
    focused || hasValue
      ? {
          color: "#239CD2",
        }
      : undefined;

  // Work Experience form state
  interface WorkExperience {
    id: number;
    jobTitle: string;
    company: string;
    workLocation: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    responsibilities: string;
    isExpanded: boolean;
  }
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Innovatech Solutions",
      workLocation: "New York",
      startDate: "2024-05-01",
      endDate: "",
      isCurrent: true,
      responsibilities: "Led a team of 5 engineers in developing scalable microservices using Node.js and AWS. Designed and implemented new features, reducing processing time by 20%.",
      isExpanded: true,
    },
    {
      id: 2,
      jobTitle: "Web Developer",
      company: "TechGrowth Labs",
      workLocation: "San Francisco",
      startDate: "2021-03-01",
      endDate: "2024-04-01",
      isCurrent: false,
      responsibilities: "",
      isExpanded: false,
    },
  ]);

  const [jobTitleFocused, setJobTitleFocused] = useState<{ [key: number]: boolean }>({});
  const [jobTitleValue, setJobTitleValue] = useState<{ [key: number]: string }>({});
  const [companyFocused, setCompanyFocused] = useState<{ [key: number]: boolean }>({});
  const [companyValue, setCompanyValue] = useState<{ [key: number]: string }>({});
  const [workLocationFocused, setWorkLocationFocused] = useState<{ [key: number]: boolean }>({});
  const [workLocationValue, setWorkLocationValue] = useState<{ [key: number]: string }>({});
  const [startDateFocused, setStartDateFocused] = useState<{ [key: number]: boolean }>({});
  const [startDateValue, setStartDateValue] = useState<{ [key: number]: string }>({});
  const [endDateFocused, setEndDateFocused] = useState<{ [key: number]: boolean }>({});
  const [endDateValue, setEndDateValue] = useState<{ [key: number]: string }>({});
  const [responsibilitiesFocused, setResponsibilitiesFocused] = useState<{ [key: number]: boolean }>({});
  const [responsibilitiesValue, setResponsibilitiesValue] = useState<{ [key: number]: string }>({});
  const startDateInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const endDateInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const jobTitles = [
    "Web Developer",
    "Senior Software Engineer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Product Manager",
  ];

  const companies = [
    "Wipro",
    "Innovatech Solutions",
    "TechGrowth Labs",
    "Infosys",
    "TCS",
    "Accenture",
    "Microsoft",
    "Google",
  ];

  const workLocations = [
    "New York",
    "London",
    "Berlin",
    "Dubai",
    "Singapore",
    "San Francisco",
    "Toronto",
    "Sydney",
    "Mumbai",
    "Bangalore",
    "Delhi",
    "Hyderabad",
    "Remote",
    "Hybrid",
  ];

  const toggleExpand = (id: number) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, isExpanded: !exp.isExpanded } : exp))
    );
  };

  const deleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const addExperience = () => {
    const newId = Math.max(...experiences.map((e) => e.id), 0) + 1;
    setExperiences((prev) => [
      ...prev,
      {
        id: newId,
        jobTitle: "",
        company: "",
        workLocation: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        responsibilities: "",
        isExpanded: true,
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Salary Expectation form state
  // Current Salary states
  const [currentCurrency, setCurrentCurrency] = useState("");
  const [currentCurrencyFocused, setCurrentCurrencyFocused] = useState(false);
  const [currentSalaryType, setCurrentSalaryType] = useState("");
  const [currentSalaryTypeFocused, setCurrentSalaryTypeFocused] = useState(false);
  const [currentSalary, setCurrentSalary] = useState("");
  const [currentSalaryFocused, setCurrentSalaryFocused] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentLocationFocused, setCurrentLocationFocused] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [benefitOptions, setBenefitOptions] = useState<string[]>([
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "401(k) Matching",
    "Paid Time Off",
    "Remote Work",
    "Stock Options",
    "Gym Membership",
    "Life Insurance",
    "Disability Insurance",
    "Flexible Spending Account",
    "Health Savings Account",
    "Tuition Reimbursement",
    "Professional Development",
    "Commuter Benefits",
    "Childcare Assistance",
    "Wellness Programs",
    "Free Meals",
    "Company Car",
    "Relocation Assistance",
  ]);
  const [newBenefit, setNewBenefit] = useState("");
  const [showAddBenefit, setShowAddBenefit] = useState(false);
  
  // Preferred Salary states
  const [preferredSalary, setPreferredSalary] = useState("");
  const [preferredSalaryFocused, setPreferredSalaryFocused] = useState(false);
  const [preferredLocationInput, setPreferredLocationInput] = useState("");
  const [preferredLocationFocused, setPreferredLocationFocused] = useState(false);
  const [selectedPreferredLocations, setSelectedPreferredLocations] = useState<string[]>([]);
  const [showVisaQuestions, setShowVisaQuestions] = useState(false);
  const [currentLocationForVisa, setCurrentLocationForVisa] = useState<string>("");
  const [visaQuestionStep, setVisaQuestionStep] = useState(0);
  const [hasVisa, setHasVisa] = useState<string>("");
  const [visaStatus, setVisaStatus] = useState("");
  const [visaStatusFocused, setVisaStatusFocused] = useState(false);
  const [visaStartDate, setVisaStartDate] = useState("");
  const [visaStartDateFocused, setVisaStartDateFocused] = useState(false);
  const [visaEndDate, setVisaEndDate] = useState("");
  const [visaEndDateFocused, setVisaEndDateFocused] = useState(false);
  const [visaSponsorshipRequired, setVisaSponsorshipRequired] = useState<string>("");
  const [visaDetailsByLocation, setVisaDetailsByLocation] = useState<Record<string, {
    hasVisa: string;
    visaStatus?: string;
    visaStartDate?: string;
    visaEndDate?: string;
    visaSponsorshipRequired?: string;
  }>>({});
  const [preferredRoleInput, setPreferredRoleInput] = useState("");
  const [preferredRoleFocused, setPreferredRoleFocused] = useState(false);
  const [selectedPreferredRoles, setSelectedPreferredRoles] = useState<string[]>([]);
  const [preferredWorkMode, setPreferredWorkMode] = useState("");
  const [preferredWorkModeFocused, setPreferredWorkModeFocused] = useState(false);
  const [expectedSelectedBenefits, setExpectedSelectedBenefits] = useState<string[]>([]);
  
  // Chips for Preferred Locations and Roles
  const locationChips = ["New York", "London", "Berlin", "Dubai", "Singapore", "San Francisco", "Toronto", "Sydney"];
  const roleChips = ["Software Developer", "Tech Lead", "UX Designer", "Product Manager", "Data Scientist", "DevOps Engineer", "QA Engineer", "Business Analyst"];
  
  // Locations that require company-sponsored visa
  const locationsRequiringSponsorship = ["New York", "Singapore"];
  
  // Expected Salary states
  const [expectedCurrency, setExpectedCurrency] = useState("");
  const [expectedCurrencyFocused, setExpectedCurrencyFocused] = useState(false);
  const [expectedSalaryType, setExpectedSalaryType] = useState("");
  const [expectedSalaryTypeFocused, setExpectedSalaryTypeFocused] = useState(false);
  
  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY", "CNY"];
  const salaryTypes = ["Annual", "Monthly", "Hourly"];
  const workModes = ["Remote", "Hybrid", "On-site"];
  const visaStatusOptions = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa", "Tourist Visa", "No Visa Required", "Other"];
  
  const salaryFieldStyle = {
    height: "48.19px",
    borderRadius: "5.02px",
    border: "1px solid #99A1AF",
    backgroundColor: "#FFFFFF",
  };

  const salaryLabelFloating = (focused: boolean, hasValue: boolean) =>
    focused || hasValue
      ? "left-4 -top-2.5 text-xs font-medium bg-white px-1"
      : "left-4 top-1/2 -translate-y-1/2 text-sm";

  const salaryLabelColor = (focused: boolean, hasValue: boolean) =>
    focused || hasValue
      ? {
          color: "#239CD2",
        }
      : undefined;
  
  // Toggle functions for Preferred Locations and Roles
  const toggleLocation = (value: string) => {
    setSelectedPreferredLocations((prev) => {
      const isCurrentlySelected = prev.includes(value);
      const newLocations = isCurrentlySelected 
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      
      // Show visa questions when a new location is added (if not already completed for this location)
      if (!isCurrentlySelected && newLocations.length > 0 && !visaDetailsByLocation[value]) {
        setCurrentLocationForVisa(value);
        setShowVisaQuestions(true);
        setVisaQuestionStep(0);
        setHasVisa("");
        setVisaStatus("");
        setVisaStartDate("");
        setVisaEndDate("");
        setVisaSponsorshipRequired("");
      } else if (isCurrentlySelected && newLocations.length === 0) {
        // Remove visa details when location is removed
        setVisaDetailsByLocation((prev) => {
          const newDetails = { ...prev };
          delete newDetails[value];
          return newDetails;
        });
        resetVisaQuestions();
      }
      
      return newLocations;
    });
  };
  
  const removeLocation = (value: string) => {
    setSelectedPreferredLocations((prev) => {
      const newLocations = prev.filter((v) => v !== value);
      // Remove visa details when location is removed
      setVisaDetailsByLocation((prev) => {
        const newDetails = { ...prev };
        delete newDetails[value];
        return newDetails;
      });
      if (newLocations.length === 0) {
        resetVisaQuestions();
      }
      return newLocations;
    });
  };
  
  const handleLocationEnterKey = (value: string) => {
    if (value.trim() && !selectedPreferredLocations.includes(value.trim())) {
      const newLocations = [value.trim(), ...selectedPreferredLocations];
      setSelectedPreferredLocations(newLocations);
      setPreferredLocationInput("");
      // Show visa questions for new location (if not already completed)
      if (!visaDetailsByLocation[value.trim()]) {
        setCurrentLocationForVisa(value.trim());
        setShowVisaQuestions(true);
        setVisaQuestionStep(0);
        setHasVisa("");
        setVisaStatus("");
        setVisaStartDate("");
        setVisaEndDate("");
        setVisaSponsorshipRequired("");
      }
    }
  };
  
  // Get visa summary text for a specific location
  const getVisaSummaryForLocation = (location: string) => {
    const details = visaDetailsByLocation[location];
    if (!details || !details.hasVisa) return "";
    if (details.hasVisa === "yes") {
      if (details.visaStatus === "Citizen" || details.visaStatus === "Permanent Resident") {
        return `Yes - ${details.visaStatus}`;
      } else if (details.visaStatus) {
        return `Yes - ${details.visaStatus}${details.visaStartDate && details.visaEndDate ? ` (${details.visaStartDate} to ${details.visaEndDate})` : ""}`;
      }
      return "Yes";
    } else if (details.hasVisa === "no") {
      if (details.visaSponsorshipRequired) {
        return `No - Sponsorship: ${details.visaSponsorshipRequired === "yes" ? "Yes" : details.visaSponsorshipRequired === "no" ? "No" : "Not sure"}`;
      }
      return "No";
    }
    return "";
  };
  
  const saveVisaDetailsForCurrentLocation = (endDateValue?: string) => {
    if (!currentLocationForVisa) return;
    const finalEndDate = endDateValue !== undefined ? endDateValue : visaEndDate;
    setVisaDetailsByLocation((prev) => ({
      ...prev,
      [currentLocationForVisa]: {
        hasVisa,
        ...(hasVisa === "yes" && visaStatus && { visaStatus }),
        ...(hasVisa === "yes" && visaStartDate && { visaStartDate }),
        ...(hasVisa === "yes" && finalEndDate && { visaEndDate: finalEndDate }),
        ...(hasVisa === "no" && visaSponsorshipRequired && { visaSponsorshipRequired }),
      },
    }));
  };
  
  const resetVisaQuestions = () => {
    setShowVisaQuestions(false);
    setVisaQuestionStep(0);
    setHasVisa("");
    setVisaStatus("");
    setVisaStartDate("");
    setVisaEndDate("");
    setVisaSponsorshipRequired("");
    setCurrentLocationForVisa("");
  };
  
  const handleVisaNext = (hasVisaValue?: string, visaStatusValue?: string, sponsorshipValue?: string) => {
    const currentHasVisa = hasVisaValue !== undefined ? hasVisaValue : hasVisa;
    const currentVisaStatus = visaStatusValue !== undefined ? visaStatusValue : visaStatus;
    const currentSponsorship = sponsorshipValue !== undefined ? sponsorshipValue : visaSponsorshipRequired;

    if (visaQuestionStep === 0) {
      if (currentHasVisa === "yes") {
        setVisaQuestionStep(1); // Yes → Visa Status
      } else if (currentHasVisa === "no") {
        setVisaQuestionStep(3); // No → Visa Sponsorship
      }
    } else if (visaQuestionStep === 1) {
      if (currentVisaStatus && (currentVisaStatus === "Work Visa" || currentVisaStatus === "Student Visa" || currentVisaStatus === "Tourist Visa" || currentVisaStatus === "Other")) {
        setVisaQuestionStep(2); // Work/Student/Tourist/Other → Visa Dates
      } else if (currentVisaStatus && (currentVisaStatus === "Citizen" || currentVisaStatus === "Permanent Resident")) {
        saveVisaDetailsForCurrentLocation();
        resetVisaQuestions();
      }
    } else if (visaQuestionStep === 2) {
      // Completion logic handled directly in onChange of endDate
      saveVisaDetailsForCurrentLocation();
      resetVisaQuestions();
    } else if (visaQuestionStep === 3) {
      if (currentSponsorship) {
        saveVisaDetailsForCurrentLocation();
        resetVisaQuestions();
      }
    }
  };

  const handleVisaBack = () => {
    if (visaQuestionStep > 0) {
      setVisaQuestionStep(visaQuestionStep - 1);
    }
  };

  const toggleRole = (value: string) => {
    setSelectedPreferredRoles((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  
  const removeRole = (value: string) => {
    setSelectedPreferredRoles((prev) => prev.filter((v) => v !== value));
  };
  
  const handleRoleEnterKey = (value: string) => {
    if (value.trim() && !selectedPreferredRoles.includes(value.trim())) {
      setSelectedPreferredRoles([value.trim(), ...selectedPreferredRoles]);
      setPreferredRoleInput("");
    }
  };

  const handleSaveChanges = () => {
    if (activeForm === 'personal') {
      setSlideDirection('right');
      setTimeout(() => {
        setActiveForm('education');
      }, 50);
    } else if (activeForm === 'education') {
      setSlideDirection('right');
      setTimeout(() => {
        setActiveForm('skills');
      }, 50);
    } else if (activeForm === 'skills') {
      setSlideDirection('right');
      setTimeout(() => {
        setActiveForm('work-exp');
      }, 50);
    } else if (activeForm === 'work-exp') {
      setSlideDirection('right');
      setTimeout(() => {
        setActiveForm('salary-exp');
      }, 50);
    }
  };

  const steps = [
    { number: 1, label: "Personal Details", active: true },
    { number: 2, label: "Educational Details", active: false },
    { number: 3, label: "Work Experience", active: false },
    { number: 4, label: "Manage Your Skills", active: false },
    { number: 5, label: "Career Preferences", active: false },
    { number: 6, label: "Salary Expectation", active: false },
    { number: 7, label: "Work Locations & Eligibility", active: false },
    { number: 8, label: "Profile Completion Summary", active: false },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#E5E7EA",
      }}
    >
      {/* Header */}
      <Header />


      {/* Main Content */}
      <main className="mx-auto px-6 flex justify-center" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
        {/* Form */}
        <form className="mx-auto flex flex-col items-center">
          <style dangerouslySetInnerHTML={{__html: `
            input[type="radio"][name="gender"] {
              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;
            }
            input[type="radio"][name="gender"]:checked {
              background-color: #fcd34d !important;
              border: 1px solid #cbd5e1 !important;
              outline: none !important;
              box-shadow: inset 0 0 0 2px white !important;
            }
            .form-slide-container {
              position: relative;
              width: 100%;
              overflow: hidden;
            }
            .form-slide {
              transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
              width: 100%;
            }
            .form-slide.slide-out-left {
              transform: translateX(-100%);
              opacity: 0;
            }
            .form-slide.slide-out-right {
              transform: translateX(100%);
              opacity: 0;
            }
            .form-slide.slide-in-left {
              transform: translateX(0);
              opacity: 1;
            }
            .form-slide.slide-in-right {
              transform: translateX(0);
              opacity: 1;
            }
            .form-slide.enter-from-right {
              transform: translateX(100%);
              opacity: 0;
            }
            .form-slide.enter-from-left {
              transform: translateX(-100%);
              opacity: 0;
            }
          `}} />
          {/* White Card Container */}
          <div
            className="flex w-full flex-col"
            style={{
              width: "1134px",
              minHeight: "1105px",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              padding: "30px",
              gap: "30px",
            }}
          >
            <div className="flex w-full" style={{ gap: "24px" }}>
              {/* Sidebar */}
              <aside
                className="flex flex-col items-center"
                style={{
                  width: "25%",
                  minWidth: "220px",
                  borderRight: "1px solid #e5e7eb",
                  paddingRight: "16px",
                  paddingTop: "24px",
                  gap: "14px",
                }}
              >
                <div className="flex flex-col items-center text-center" style={{ gap: "8px" }}>
                  <div className="relative" style={{ width: "100px", height: "100px" }}>
                    <div
                      className="flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <Image src="/Gemini_Generated_Image_xxo7twxxo7twxxo7.png" alt="Profile" width={100} height={100} className="object-cover" />
                    </div>
                    <button
                      type="button"
                      className="absolute flex items-center justify-center rounded-full"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#FF8C00",
                        bottom: "0",
                        right: "0",
                        border: "2px solid #FFFFFF",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68607 11.9447 1.59131C12.1731 1.49655 12.4178 1.44775 12.6667 1.44775C12.9155 1.44775 13.1602 1.49655 13.3886 1.59131C13.617 1.68607 13.8249 1.82493 14 2.00004C14.1751 2.17515 14.314 2.38305 14.4087 2.61146C14.5035 2.83987 14.5523 3.08458 14.5523 3.33337C14.5523 3.58216 14.5035 3.82687 14.4087 4.05528C14.314 4.28369 14.1751 4.49159 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Sachin Dubey</p>
                    <p className="text-xs text-slate-500">Software Developer</p>
                  </div>
                </div>
                <nav className="flex w-full flex-col" style={{ gap: "6px" }}>
                  {[
                    { label: "Personal Information", icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                        <path d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z" fill="currentColor"/>
                      </svg>
                    )},
                    { label: "Educational Details", icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 6H11M5 9H11M5 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )},
                    { label: "Manage Your Skills", icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L10.1631 5.52786L16 6.11146L12 10.4721L12.9443 16L8 13.1115L3.05569 16L4 10.4721L0 6.11146L5.83686 5.52786L8 0Z" fill="currentColor"/>
                      </svg>
                    )},
                    { label: "Work Experience", icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M5 6L7 8L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )},
                    { label: "Career Preferences", icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <circle cx="8" cy="8" r="2" fill="currentColor"/>
                      </svg>
                    )},
                  ].map((item, idx) => {
                    const tabKey = idx === 0 ? 'personal' : idx === 1 ? 'education' : idx === 2 ? 'skills' : idx === 3 ? 'work-exp' : item.label.toLowerCase().replace(/\s+/g, '-');
                    const active = (idx === 0 && activeForm === 'personal') || (idx === 1 && activeForm === 'education') || (idx === 2 && activeForm === 'skills') || (idx === 3 && activeForm === 'work-exp');
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          if (idx === 0) {
                            setSlideDirection('left');
                            setTimeout(() => setActiveForm('personal'), 50);
                          } else if (idx === 1) {
                            setSlideDirection('right');
                            setTimeout(() => setActiveForm('education'), 50);
                          } else if (idx === 2) {
                            setSlideDirection('right');
                            setTimeout(() => setActiveForm('skills'), 50);
                          } else if (idx === 3) {
                            setSlideDirection('right');
                            setTimeout(() => setActiveForm('work-exp'), 50);
                          }
                        }}
                        className={`text-left text-sm transition flex items-center gap-2 ${
                          active
                            ? "font-semibold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "6px",
                          backgroundColor: active ? "#FFF8F0" : "transparent",
                          color: active ? "#FF8C00" : undefined,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: active ? "#FF8C00" : undefined }}>
                          {item.icon}
                        </span>
                        <span style={{ color: active ? "#FF8C00" : undefined }}>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <section className="flex flex-col" style={{ width: "75%", gap: "26px", paddingTop: "24px", position: "relative", overflow: "hidden" }}>
                <div className="form-slide-container" style={{ position: 'relative', minHeight: '1200px', overflow: 'visible' }}>
                  {/* Personal Information Form */}
                  <div 
                    className={`form-slide ${activeForm === 'personal' 
                      ? (slideDirection === 'right' ? 'slide-in-left' : 'slide-in-right')
                      : (slideDirection === 'right' ? 'slide-out-left' : 'slide-out-right')
                    }`}
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '26px',
                      top: 0,
                      left: 0,
                      opacity: activeForm === 'personal' ? 1 : 0,
                      pointerEvents: activeForm === 'personal' ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="font-medium text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32.12px",
                          lineHeight: "40.2px",
                          letterSpacing: "0%",
                        }}
                      >
                        Personal Information
                      </h2>
                      <Image
                        src="/auto_ai.png"
                        alt="Auto-filled by AI"
                        width={109}
                        height={25}
                        className="h-auto w-auto"
                      />
                    </div>

                {/* Name / Email */}
                <div className="flex w-full" style={{ gap: "24px" }}>
                  <div className="relative flex-1">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                      <Image src="/perosn_icon.png" alt="Person" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={fullNameValue}
                      onChange={(e) => setFullNameValue(e.target.value)}
                      onFocus={() => setFullNameFocused(true)}
                      onBlur={() => setFullNameFocused(false)}
                      className={`px-4 pb-2 pl-12 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        fullNameFocused || fullNameValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        fullNameFocused || fullNameValue.length > 0
                          ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-12 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={fullNameFocused || fullNameValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                      <Image src="/email_icon.png" alt="Email" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className={`px-4 pb-2 pl-12 pr-28 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        emailFocused || emailValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        emailFocused || emailValue.length > 0
                          ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-12 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={emailFocused || emailValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Email address
                    </label>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
                      <Image src="/green_tick.png" alt="Verified" width={18} height={18} className="h-4.5 w-4.5" />
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: "#00ab08",
                        }}
                      >
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex w-full" style={{ gap: "24px" }}>
                  <div className="relative flex-1">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                      <Image src="/telephone_icon.png" alt="Telephone" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      value={phoneValue}
                      onChange={(e) => setPhoneValue(e.target.value)}
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
                      className={`px-4 pb-2 pl-12 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        phoneFocused || phoneValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        phoneFocused || phoneValue.length > 0
                          ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-12 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={phoneFocused || phoneValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                      <Image src="/telephone_icon.png" alt="Telephone" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      value={alternateNumbers[0]}
                      onChange={(e) => {
                        const newNumbers = [...alternateNumbers];
                        newNumbers[0] = e.target.value;
                        setAlternateNumbers(newNumbers);
                      }}
                      onFocus={() => {
                        const newFocused = [...alternateNumberFocused];
                        newFocused[0] = true;
                        setAlternateNumberFocused(newFocused);
                      }}
                      onBlur={() => {
                        const newFocused = [...alternateNumberFocused];
                        newFocused[0] = false;
                        setAlternateNumberFocused(newFocused);
                      }}
                      className={`px-4 pb-2 pl-12 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        alternateNumberFocused[0] || alternateNumbers[0].length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        alternateNumberFocused[0] || alternateNumbers[0].length > 0
                          ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-12 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={
                        alternateNumberFocused[0] || alternateNumbers[0].length > 0 ? { color: "#239CD2" } : undefined
                      }
                    >
                      Alternate Phone Number (optional)
                    </label>
                  </div>
                </div>

                {/* Profile Photo Upload */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "calc(100% - 24px)",
                    marginLeft: "12px",
                    marginRight: "12px",
                    height: "258px",
                    borderRadius: "8px",
                    backgroundColor: "#F4F4F4",
                    border: "1px solid #E1E1E1",
                    boxShadow: undefined,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPhotoFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                    <div
                      className="relative rounded-full border-2 border-gray-300 overflow-hidden"
                      style={{
                        width: "94px",
                        height: "94px",
                        borderRadius: "47px",
                      }}
                    >
                      {photoPreview ? (
                        <Image src={photoPreview} alt="Profile Photo" fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Image src="/image%2064.png" alt="User" width={94} height={94} className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                    <p
                      className="text-center mt-2"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0px",
                        color: "#5F5F5F",
                      }}
                    >
                      Profile Photo
                    </p>
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "0px",
                        color: "#5F5F5F",
                        marginTop: "12px",
                      }}
                    >
                      Upload a new photo (PNG, JPG, up to 5MB)
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
                      style={{
                        width: "156.42px",
                        height: "40px",
                        borderRadius: "6px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #C1C1C1",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "22px",
                        letterSpacing: "0%",
                        color: "#0A65CC",
                      }}
                    >
                      <Image src="/cloud-upload.png" alt="Upload" width={18} height={18} />
                      Upload Photo
                    </button>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col" style={{ gap: "12px", marginLeft: "16px" }}>
                  <span className="text-[13px] text-slate-600 font-medium">Gender</span>
                  <div className="flex items-center text-sm text-slate-700" style={{ gap: "24px" }}>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        defaultChecked
                        onChange={(e) => setGenderValue(e.target.value)}
                        className="h-4 w-4 rounded-full"
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          boxShadow: "none",
                          accentColor: "#fbbf24",
                        }}
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={(e) => setGenderValue(e.target.value)}
                        className="h-4 w-4 rounded-full"
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          boxShadow: "none",
                          accentColor: "#fbbf24",
                        }}
                      />
                      Female
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        onChange={(e) => setGenderValue(e.target.value)}
                        className="h-4 w-4 rounded-full"
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          boxShadow: "none",
                          accentColor: "#fbbf24",
                        }}
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Date of Birth / Marital Status */}
                <div className="flex w-full" style={{ gap: "24px" }}>
                  <div className="relative flex-1">
                    <div
                      className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                      onClick={() => dateInputRef.current?.showPicker()}
                    >
                      <Image src="/calendar_icon.png" alt="Calendar" width={16} height={16} className="h-4 w-4" />
                    </div>
                    <input
                      ref={dateInputRef}
                      type="date"
                      value={dobValue}
                      onChange={(e) => setDobValue(e.target.value)}
                      onFocus={() => setDobFocused(true)}
                      onBlur={() => setDobFocused(false)}
                      onClick={() => dateInputRef.current?.showPicker()}
                      className={`px-4 pb-2 pl-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        dobFocused || dobValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                        color: dobValue ? "#1e293b" : "transparent",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        dobFocused || dobValue.length > 0
                          ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-12 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={dobFocused || dobValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Date of Birth
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <select
                      value={maritalStatusValue}
                      onChange={(e) => setMaritalStatusValue(e.target.value)}
                      onFocus={() => setMaritalStatusFocused(true)}
                      onBlur={() => setMaritalStatusFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        maritalStatusFocused || maritalStatusValue.length > 0 ? "pt-5" : "py-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                        appearance: "none",
                        backgroundImage:
                          maritalStatusValue.length > 0
                            ? "none"
                            : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2399A1AF' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "32px",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        maritalStatusFocused || maritalStatusValue.length > 0
                          ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-6 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={maritalStatusFocused || maritalStatusValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Marital Status
                    </label>
                  </div>
                </div>

                {/* Country / City */}
                <div className="flex w-full" style={{ gap: "24px" }}>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={countryValue}
                      onChange={(e) => setCountryValue(e.target.value)}
                      onFocus={() => setCountryFocused(true)}
                      onBlur={() => setCountryFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        countryFocused || countryValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        countryFocused || countryValue.length > 0
                          ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-6 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={countryFocused || countryValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Country
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={cityValue}
                      onChange={(e) => setCityValue(e.target.value)}
                      onFocus={() => setCityFocused(true)}
                      onBlur={() => setCityFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        cityFocused || cityValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                        boxShadow: undefined,
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        cityFocused || cityValue.length > 0
                          ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-6 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={cityFocused || cityValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      City
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div className="relative w-full">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                    <Image src="/location_icon.png" alt="Location" width={16} height={16} className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={addressValue}
                    onChange={(e) => setAddressValue(e.target.value)}
                    onFocus={() => setAddressFocused(true)}
                    onBlur={() => setAddressFocused(false)}
                    className={`px-4 pb-2 pl-12 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                      addressFocused || addressValue.length > 0 ? "pt-5" : "pt-3"
                    }`}
                    style={{
                      width: "calc(100% - 24px)",
                      marginLeft: "12px",
                      marginRight: "12px",
                      height: "67px",
                      borderRadius: "8px",
                      border: "1px solid #E1E1E1",
                      backgroundColor: "#F4F4F4",
                      boxShadow: undefined,
                    }}
                  />
                  <label
                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                      addressFocused || addressValue.length > 0
                        ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                        : "left-12 top-1/2 -translate-y-1/2 text-sm"
                    }`}
                    style={addressFocused || addressValue.length > 0 ? { color: "#239CD2" } : undefined}
                  >
                    Address
                  </label>
                </div>

                {/* Nationality / Passport */}
                <div className="flex w-full" style={{ gap: "24px" }}>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={nationalityValue}
                      onChange={(e) => setNationalityValue(e.target.value)}
                      onFocus={() => setNationalityFocused(true)}
                      onBlur={() => setNationalityFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        nationalityFocused || nationalityValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                        boxShadow: undefined,
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        nationalityFocused || nationalityValue.length > 0
                          ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-6 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={nationalityFocused || nationalityValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Nationality
                    </label>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={passportValue}
                      onChange={(e) => setPassportValue(e.target.value)}
                      onFocus={() => setPassportFocused(true)}
                      onBlur={() => setPassportFocused(false)}
                      className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                        passportFocused || passportValue.length > 0 ? "pt-5" : "pt-3"
                      }`}
                      style={{
                        width: "calc(100% - 24px)",
                        marginLeft: "12px",
                        marginRight: "12px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "1px solid #E1E1E1",
                        backgroundColor: "#F4F4F4",
                        boxShadow: undefined,
                      }}
                    />
                    <label
                      className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                        passportFocused || passportValue.length > 0
                          ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                          : "left-6 top-1/2 -translate-y-1/2 text-sm"
                      }`}
                      style={passportFocused || passportValue.length > 0 ? { color: "#239CD2" } : undefined}
                    >
                      Passport Number (Optional)
                    </label>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="relative w-full">
                  <input
                    type="url"
                    value={linkedinValue}
                    onChange={(e) => setLinkedinValue(e.target.value)}
                    onFocus={() => setLinkedinFocused(true)}
                    onBlur={() => setLinkedinFocused(false)}
                    className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                      linkedinFocused || linkedinValue.length > 0 ? "pt-5" : "pt-3"
                    }`}
                    style={{
                      width: "calc(100% - 24px)",
                      marginLeft: "12px",
                      marginRight: "12px",
                      height: "40px",
                      borderRadius: "8px",
                      border: "1px solid #E1E1E1",
                      backgroundColor: "#F4F4F4",
                      boxShadow: undefined,
                    }}
                  />
                  <label
                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                      linkedinFocused || linkedinValue.length > 0
                        ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                        : "left-6 top-1/2 -translate-y-1/2 text-sm"
                    }`}
                    style={linkedinFocused || linkedinValue.length > 0 ? { color: "#239CD2" } : undefined}
                  >
                    LinkedIn Profile URL
                  </label>
                </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3" style={{ marginRight: "48px" }}>
                      <button
                        type="button"
                        className="transition"
                        style={{
                          width: "181.53px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #0A65CC",
                          borderStyle: "solid",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#0A65CC",
                        }}
                      >
                        Discard Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="text-white transition hover:opacity-90"
                        style={{
                          width: "161px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FF8C00",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Educational Details Form */}
                  <div 
                    className={`form-slide ${activeForm === 'education' 
                      ? (slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left')
                      : (slideDirection === 'right' ? 'slide-out-right' : 'slide-out-left')
                    }`}
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '26px',
                      top: 0,
                      left: 0,
                      opacity: activeForm === 'education' ? 1 : 0,
                      pointerEvents: activeForm === 'education' ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="font-medium text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32.12px",
                          lineHeight: "40.2px",
                          letterSpacing: "0%",
                        }}
                      >
                        Educational Details
                      </h2>
                      <Image
                        src="/auto_ai.png"
                        alt="Auto-filled by AI"
                        width={109}
                        height={25}
                        className="h-auto w-auto"
                      />
                    </div>

                    {/* Education Entries */}
                    {educations.map((edu, index) => (
                      <div key={edu.id} className="w-full" style={{ width: "100%", marginBottom: "21px" }}>
                        {/* Education Header */}
                        <div className="flex w-full items-center justify-between mb-4">
                          <h3
                            className="font-semibold text-slate-900"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "18px",
                              lineHeight: "1.5",
                            }}
                          >
                            Education {index + 1}
                          </h3>
                          {educations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => deleteEducation(edu.id)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Delete education"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Degree */}
                        <div className="relative" style={{ marginBottom: "21px" }}>
                          <div className="relative">
                            <select
                              value={degreeValue[edu.id] || edu.degree}
                              onChange={(event) => {
                                setDegreeValue({ ...degreeValue, [edu.id]: event.target.value });
                                setEducations((prev) =>
                                  prev.map((eduItem) => (eduItem.id === edu.id ? { ...eduItem, degree: event.target.value } : eduItem))
                                );
                              }}
                              onFocus={() => setDegreeFocused({ ...degreeFocused, [edu.id]: true })}
                              onBlur={() => setDegreeFocused({ ...degreeFocused, [edu.id]: false })}
                              className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                degreeFocused[edu.id] || (degreeValue[edu.id] || edu.degree) ? "pt-5" : "pt-3"
                              }`}
                              style={{
                                width: "calc(100% - 24px)",
                                marginLeft: "12px",
                                marginRight: "12px",
                                height: "45px",
                                borderRadius: "8px",
                                border: "1px solid #E1E1E1",
                                backgroundColor: "#F4F4F4",
                                appearance: "none",
                                boxShadow: undefined,
                              }}
                            >
                              <option value="" disabled hidden></option>
                              {degrees.map((degree) => (
                                <option key={degree} value={degree}>
                                  {degree}
                                </option>
                              ))}
                            </select>
                            <label
                              className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                degreeFocused[edu.id] || (degreeValue[edu.id] || edu.degree)
                                  ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                  : "left-6 top-1/2 -translate-y-1/2 text-sm"
                              }`}
                              style={
                                degreeFocused[edu.id] || (degreeValue[edu.id] || edu.degree)
                                  ? { color: "#239CD2" }
                                  : undefined
                              }
                            >
                              Degree
                            </label>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Institution */}
                        <div className="relative" style={{ marginBottom: "21px" }}>
                          <div className="relative">
                            <select
                              value={institutionValue[edu.id] || edu.institution}
                              onChange={(event) => {
                                setInstitutionValue({ ...institutionValue, [edu.id]: event.target.value });
                                setEducations((prev) =>
                                  prev.map((eduItem) => (eduItem.id === edu.id ? { ...eduItem, institution: event.target.value } : eduItem))
                                );
                              }}
                              onFocus={() => setInstitutionFocused({ ...institutionFocused, [edu.id]: true })}
                              onBlur={() => setInstitutionFocused({ ...institutionFocused, [edu.id]: false })}
                              className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                institutionFocused[edu.id] || (institutionValue[edu.id] || edu.institution) ? "pt-5" : "pt-3"
                              }`}
                              style={{
                                width: "calc(100% - 24px)",
                                marginLeft: "12px",
                                marginRight: "12px",
                                height: "45px",
                                borderRadius: "8px",
                                border: "1px solid #E1E1E1",
                                backgroundColor: "#F4F4F4",
                                appearance: "none",
                                boxShadow: undefined,
                              }}
                            >
                              <option value="" disabled hidden></option>
                              {institutions.map((institution) => (
                                <option key={institution} value={institution}>
                                  {institution}
                                </option>
                              ))}
                            </select>
                            <label
                              className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                institutionFocused[edu.id] || (institutionValue[edu.id] || edu.institution)
                                  ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                  : "left-6 top-1/2 -translate-y-1/2 text-sm"
                              }`}
                              style={
                                institutionFocused[edu.id] || (institutionValue[edu.id] || edu.institution)
                                  ? { color: "#239CD2" }
                                  : undefined
                              }
                            >
                              Institution
                            </label>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Specialization */}
                        <div className="relative" style={{ marginBottom: "21px" }}>
                          <div className="relative">
                            <select
                              value={specializationValue[edu.id] || edu.specialization}
                              onChange={(event) => {
                                setSpecializationValue({ ...specializationValue, [edu.id]: event.target.value });
                                setEducations((prev) =>
                                  prev.map((eduItem) => (eduItem.id === edu.id ? { ...eduItem, specialization: event.target.value } : eduItem))
                                );
                              }}
                              onFocus={() => setSpecializationFocused({ ...specializationFocused, [edu.id]: true })}
                              onBlur={() => setSpecializationFocused({ ...specializationFocused, [edu.id]: false })}
                              className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                specializationFocused[edu.id] || (specializationValue[edu.id] || edu.specialization) ? "pt-5" : "pt-3"
                              }`}
                              style={{
                                width: "calc(100% - 24px)",
                                marginLeft: "12px",
                                marginRight: "12px",
                                height: "45px",
                                borderRadius: "8px",
                                border: "1px solid #E1E1E1",
                                backgroundColor: "#F4F4F4",
                                appearance: "none",
                                boxShadow: undefined,
                              }}
                            >
                              <option value="" disabled hidden></option>
                              {specializations.map((specialization) => (
                                <option key={specialization} value={specialization}>
                                  {specialization}
                                </option>
                              ))}
                            </select>
                            <label
                              className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                specializationFocused[edu.id] || (specializationValue[edu.id] || edu.specialization)
                                  ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                  : "left-6 top-1/2 -translate-y-1/2 text-sm"
                              }`}
                              style={
                                specializationFocused[edu.id] || (specializationValue[edu.id] || edu.specialization)
                                  ? { color: "#239CD2" }
                                  : undefined
                              }
                            >
                              Specialization
                            </label>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Start Year and End Year Row */}
                        <div className="flex items-center" style={{ gap: "23px", marginBottom: "21px" }}>
                          <div className="relative" style={{ flex: 1 }}>
                            <div className="relative">
                              <div
                                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                                onClick={() => startYearInputRefs.current[edu.id]?.showPicker()}
                              >
                                <Image src="/calendar_icon.png" alt="Calendar" width={16} height={16} className="h-4 w-4" />
                              </div>
                              <input
                                ref={(el) => {
                                  startYearInputRefs.current[edu.id] = el;
                                }}
                                type="date"
                                value={startYearValue[edu.id] || edu.startYear}
                                onChange={(event) => {
                                  setStartYearValue({ ...startYearValue, [edu.id]: event.target.value });
                                  setEducations((prev) =>
                                    prev.map((eduItem) => (eduItem.id === edu.id ? { ...eduItem, startYear: event.target.value } : eduItem))
                                  );
                                }}
                                onFocus={() => setStartYearFocused({ ...startYearFocused, [edu.id]: true })}
                                onBlur={() => setStartYearFocused({ ...startYearFocused, [edu.id]: false })}
                                onClick={() => startYearInputRefs.current[edu.id]?.showPicker()}
                                className={`px-4 pb-2 pl-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  startYearFocused[edu.id] || (startYearValue[edu.id] || edu.startYear) ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "calc(100% - 24px)",
                                  marginLeft: "12px",
                                  marginRight: "12px",
                                  height: "45px",
                                  borderRadius: "8px",
                                  border: "1px solid #E1E1E1",
                                  backgroundColor: "#F4F4F4",
                                  color: startYearValue[edu.id] || edu.startYear ? "#1e293b" : "transparent",
                                  boxShadow: undefined,
                                }}
                              />
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                  startYearFocused[edu.id] || (startYearValue[edu.id] || edu.startYear)
                                    ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                                    : "left-12 top-1/2 -translate-y-1/2 text-sm"
                                }`}
                                style={
                                  startYearFocused[edu.id] || (startYearValue[edu.id] || edu.startYear)
                                    ? { color: "#239CD2" }
                                    : undefined
                                }
                              >
                                Start Year
                              </label>
                            </div>
                          </div>
                          <div className="relative" style={{ flex: 1 }}>
                            <div className="relative">
                              <div
                                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                                onClick={() => endYearInputRefs.current[edu.id]?.showPicker()}
                              >
                                <Image src="/calendar_icon.png" alt="Calendar" width={16} height={16} className="h-4 w-4" />
                              </div>
                              <input
                                ref={(el) => {
                                  endYearInputRefs.current[edu.id] = el;
                                }}
                                type="date"
                                value={endYearValue[edu.id] || edu.endYear}
                                onChange={(event) => {
                                  setEndYearValue({ ...endYearValue, [edu.id]: event.target.value });
                                  setEducations((prev) =>
                                    prev.map((eduItem) => (eduItem.id === edu.id ? { ...eduItem, endYear: event.target.value } : eduItem))
                                  );
                                }}
                                onFocus={() => setEndYearFocused({ ...endYearFocused, [edu.id]: true })}
                                onBlur={() => setEndYearFocused({ ...endYearFocused, [edu.id]: false })}
                                onClick={() => endYearInputRefs.current[edu.id]?.showPicker()}
                                className={`px-4 pb-2 pl-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  endYearFocused[edu.id] || (endYearValue[edu.id] || edu.endYear) ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "calc(100% - 24px)",
                                  marginLeft: "12px",
                                  marginRight: "12px",
                                  height: "45px",
                                  borderRadius: "8px",
                                  border: "1px solid #E1E1E1",
                                  backgroundColor: "#F4F4F4",
                                  color: endYearValue[edu.id] || edu.endYear ? "#1e293b" : "transparent",
                                  boxShadow: undefined,
                                }}
                              />
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                  endYearFocused[edu.id] || (endYearValue[edu.id] || edu.endYear)
                                    ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                                    : "left-12 top-1/2 -translate-y-1/2 text-sm"
                                }`}
                                style={
                                  endYearFocused[edu.id] || (endYearValue[edu.id] || edu.endYear)
                                    ? { color: "#239CD2" }
                                    : undefined
                                }
                              >
                                End Year
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add More Button */}
                    <div className="flex items-center gap-3" style={{ width: "100%" }}>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-sky-500 bg-white px-4 py-3 font-medium text-sky-600 transition hover:bg-sky-50"
                        style={{
                          width: "38%",
                          height: "48.19px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <Image src="/plus-icopn.png" alt="Add" width={20} height={20} className="h-5 w-5" />
                        Add More
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3" style={{ marginRight: "48px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSlideDirection('left');
                          setTimeout(() => setActiveForm('personal'), 50);
                        }}
                        className="transition"
                        style={{
                          width: "181.53px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #0A65CC",
                          borderStyle: "solid",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#0A65CC",
                        }}
                      >
                        Discard Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="text-white transition hover:opacity-90"
                        style={{
                          width: "161px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FF8C00",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Skills Form */}
                  <div 
                    className={`form-slide ${activeForm === 'skills' 
                      ? (slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left')
                      : (slideDirection === 'right' ? 'slide-out-right' : 'slide-out-left')
                    }`}
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '26px',
                      top: 0,
                      left: 0,
                      opacity: activeForm === 'skills' ? 1 : 0,
                      pointerEvents: activeForm === 'skills' ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="font-medium text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32.12px",
                          lineHeight: "40.2px",
                          letterSpacing: "0%",
                        }}
                      >
                        Manage Your Skills
                      </h2>
                      <Image
                        src="/auto_ai.png"
                        alt="Auto-filled by AI"
                        width={109}
                        height={25}
                        className="h-auto w-auto"
                      />
                    </div>

                    {/* Your Skills Section */}
                    <div className="w-full">
                      {/* Input Field and Add Button */}
                      <div className="mb-4 flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onFocus={() => setSkillInputFocused(true)}
                            onBlur={() => setSkillInputFocused(false)}
                            onKeyPress={handleKeyPress}
                            className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                              skillInputFocused || skillInput.length > 0 ? "pt-5" : "pt-3"
                            }`}
                            style={{
                              width: "calc(100% - 24px)",
                              marginLeft: "12px",
                              marginRight: "12px",
                              height: "45px",
                              borderRadius: "8px",
                              border: "1px solid #E1E1E1",
                              backgroundColor: "#F4F4F4",
                              boxShadow: undefined,
                            }}
                          />
                          <label
                            className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                              skillInputFocused || skillInput.length > 0
                                ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                : "left-6 top-1/2 -translate-y-1/2 text-sm"
                            }`}
                            style={
                              skillInputFocused || skillInput.length > 0
                                ? { color: "#239CD2" }
                                : undefined
                            }
                          >
                            Your skills
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={addSkill}
                          className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 shadow-sm"
                          style={{
                            height: "45px",
                            borderRadius: "8px",
                            minWidth: "82px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "16px",
                          }}
                        >
                          Add
                        </button>
                      </div>

                      {/* Skills List */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {userSkills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 font-medium"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              borderColor: "#E5E7EB",
                              color: "#374151",
                            }}
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-slate-600 hover:text-slate-800"
                              aria-label={`Remove ${skill}`}
                              style={{
                                color: "#374151",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6L6 18" />
                                <path d="M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Suggested Skills Section */}
                    <div className="w-full" style={{ marginTop: "16px" }}>
                      <h3
                        className="mb-3 font-semibold text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "18px",
                          lineHeight: "1.5",
                        }}
                      >
                        AI Suggested Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestedSkills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                            }}
                          >
                            <span>{skill}</span>
                            <span
                              className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-600"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "12px",
                              }}
                            >
                              AI Suggested
                            </span>
                            <button
                              type="button"
                              onClick={() => addAISuggestedSkill(skill)}
                              className="text-sky-600 hover:text-sky-800"
                              aria-label={`Add ${skill}`}
                              disabled={userSkills.includes(skill)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 5v14" />
                                <path d="M5 12h14" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages Known Section */}
                    <div className="w-full" style={{ marginTop: "32px" }}>
                      <LanguageFieldBlock
                        label="Languages Known"
                        placeholder="Enter the names of the languages you know"
                        value={languages}
                        onChange={setLanguages}
                        onEnterKey={handleLanguageEnterKey}
                        chips={languageChips}
                        selectedChips={selectedLanguages}
                        onToggle={toggleLanguage}
                        onRemove={removeLanguage}
                        proficiencies={languageProficiencies}
                        onProficiencyChange={(language, proficiency) => {
                          setLanguageProficiencies((profs) => ({
                            ...profs,
                            [language]: proficiency,
                          }));
                        }}
                        fieldStyle={fieldStyle}
                        labelFloating={labelFloating}
                        labelColor={labelColor}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3" style={{ marginRight: "48px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSlideDirection('left');
                          setTimeout(() => setActiveForm('education'), 50);
                        }}
                        className="transition"
                        style={{
                          width: "181.53px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #0A65CC",
                          borderStyle: "solid",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#0A65CC",
                        }}
                      >
                        Discard Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="text-white transition hover:opacity-90"
                        style={{
                          width: "161px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FF8C00",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Work Experience Form */}
                  <div 
                    className={`form-slide ${activeForm === 'work-exp' 
                      ? (slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left')
                      : (slideDirection === 'right' ? 'slide-out-right' : 'slide-out-left')
                    }`}
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '26px',
                      top: 0,
                      left: 0,
                      opacity: activeForm === 'work-exp' ? 1 : 0,
                      pointerEvents: activeForm === 'work-exp' ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="font-medium text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32.12px",
                          lineHeight: "40.2px",
                          letterSpacing: "0%",
                        }}
                      >
                        Work Experience
                      </h2>
                      <Image
                        src="/auto_ai.png"
                        alt="Auto-filled by AI"
                        width={109}
                        height={25}
                        className="h-auto w-auto"
                      />
                    </div>

                    {/* Work Experience Entries */}
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="w-full"
                        style={{ marginBottom: "21px" }}
                      >
                        {/* Entry Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <h3
                              className="font-semibold text-slate-900"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "16px",
                                lineHeight: "1.5",
                              }}
                            >
                              {exp.jobTitle || "Job Title"} {exp.company ? `at ${exp.company}` : ""}
                            </h3>
                            <p
                              className="mt-1 text-slate-600"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {exp.startDate ? formatDate(exp.startDate) : "Start Date"} -{" "}
                              {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "End Date"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => deleteExperience(exp.id)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Delete experience"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6L6 18" />
                                <path d="M6 6l12 12" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpand(exp.id)}
                              className="text-slate-400 hover:text-slate-600"
                              aria-label={exp.isExpanded ? "Collapse" : "Expand"}
                            >
                              {exp.isExpanded ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 15l-6-6-6 6" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {exp.isExpanded && (
                          <div className="mt-4 space-y-4">
                            {/* Job Title */}
                            <div className="relative">
                              <div className="relative">
                                <select
                                  value={jobTitleValue[exp.id] || exp.jobTitle}
                                  onChange={(event) => {
                                    setJobTitleValue({ ...jobTitleValue, [exp.id]: event.target.value });
                                    setExperiences((prev) =>
                                      prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, jobTitle: event.target.value } : expItem))
                                    );
                                  }}
                                  onFocus={() => setJobTitleFocused({ ...jobTitleFocused, [exp.id]: true })}
                                  onBlur={() => setJobTitleFocused({ ...jobTitleFocused, [exp.id]: false })}
                                  className={`px-4 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    jobTitleFocused[exp.id] || (jobTitleValue[exp.id] || exp.jobTitle) ? "pt-4 pb-1" : "pt-3 pb-1"
                                  }`}
                                  style={{
                                    width: "calc(100% - 24px)",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    height: "45px",
                                    borderRadius: "8px",
                                    border: "1px solid #E1E1E1",
                                    backgroundColor: "#F4F4F4",
                                    appearance: "none",
                                    boxShadow: undefined,
                                    lineHeight: "1.5",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {jobTitles.map((title) => (
                                    <option key={title} value={title}>
                                      {title}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                    jobTitleFocused[exp.id] || (jobTitleValue[exp.id] || exp.jobTitle)
                                      ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                      : "left-6 top-1/2 -translate-y-1/2 text-sm"
                                  }`}
                                  style={
                                    jobTitleFocused[exp.id] || (jobTitleValue[exp.id] || exp.jobTitle)
                                      ? { color: "#239CD2" }
                                      : undefined
                                  }
                                >
                                  Job Title eg. Web Developer
                                </label>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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

                            {/* Company */}
                            <div className="relative">
                              <div className="relative">
                                <select
                                  value={companyValue[exp.id] || exp.company}
                                  onChange={(event) => {
                                    setCompanyValue({ ...companyValue, [exp.id]: event.target.value });
                                    setExperiences((prev) =>
                                      prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, company: event.target.value } : expItem))
                                    );
                                  }}
                                  onFocus={() => setCompanyFocused({ ...companyFocused, [exp.id]: true })}
                                  onBlur={() => setCompanyFocused({ ...companyFocused, [exp.id]: false })}
                                  className={`px-4 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    companyFocused[exp.id] || (companyValue[exp.id] || exp.company) ? "pt-4 pb-1" : "pt-3 pb-1"
                                  }`}
                                  style={{
                                    width: "calc(100% - 24px)",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    height: "45px",
                                    borderRadius: "8px",
                                    border: "1px solid #E1E1E1",
                                    backgroundColor: "#F4F4F4",
                                    appearance: "none",
                                    boxShadow: undefined,
                                    lineHeight: "1.5",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {companies.map((company) => (
                                    <option key={company} value={company}>
                                      {company}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                    companyFocused[exp.id] || (companyValue[exp.id] || exp.company)
                                      ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                      : "left-6 top-1/2 -translate-y-1/2 text-sm"
                                  }`}
                                  style={
                                    companyFocused[exp.id] || (companyValue[exp.id] || exp.company)
                                      ? { color: "#239CD2" }
                                      : undefined
                                  }
                                >
                                  Company eg. Wipro
                                </label>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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

                            {/* Work Location */}
                            <div className="relative">
                              <div className="relative">
                                <select
                                  value={workLocationValue[exp.id] || exp.workLocation}
                                  onChange={(event) => {
                                    setWorkLocationValue({ ...workLocationValue, [exp.id]: event.target.value });
                                    setExperiences((prev) =>
                                      prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, workLocation: event.target.value } : expItem))
                                    );
                                  }}
                                  onFocus={() => setWorkLocationFocused({ ...workLocationFocused, [exp.id]: true })}
                                  onBlur={() => setWorkLocationFocused({ ...workLocationFocused, [exp.id]: false })}
                                  className={`px-4 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    workLocationFocused[exp.id] || (workLocationValue[exp.id] || exp.workLocation) ? "pt-4 pb-1" : "pt-3 pb-1"
                                  }`}
                                  style={{
                                    width: "calc(100% - 24px)",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    height: "45px",
                                    borderRadius: "8px",
                                    border: "1px solid #E1E1E1",
                                    backgroundColor: "#F4F4F4",
                                    appearance: "none",
                                    boxShadow: undefined,
                                    lineHeight: "1.5",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {workLocations.map((location) => (
                                    <option key={location} value={location}>
                                      {location}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                    workLocationFocused[exp.id] || (workLocationValue[exp.id] || exp.workLocation)
                                      ? "left-6 -top-2.5 text-xs font-medium bg-white px-1"
                                      : "left-6 top-1/2 -translate-y-1/2 text-sm"
                                  }`}
                                  style={
                                    workLocationFocused[exp.id] || (workLocationValue[exp.id] || exp.workLocation)
                                      ? { color: "#239CD2" }
                                      : undefined
                                  }
                                >
                                  Work Location
                                </label>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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

                            {/* Start Date and End Date Row */}
                            <div className="flex items-center" style={{ gap: "24px" }}>
                              <div className="relative" style={{ flex: 1 }}>
                                <div className="relative">
                                  <div
                                    className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                                    onClick={() => startDateInputRefs.current[exp.id]?.showPicker()}
                                  >
                                    <Image
                                      src="/calendar_icon.png"
                                      alt="Calendar"
                                      width={16}
                                      height={16}
                                      className="h-4 w-4"
                                    />
                                  </div>
                                  <input
                                    ref={(el) => {
                                      startDateInputRefs.current[exp.id] = el;
                                    }}
                                    type="date"
                                    value={startDateValue[exp.id] || exp.startDate}
                                    onChange={(event) => {
                                      setStartDateValue({ ...startDateValue, [exp.id]: event.target.value });
                                      setExperiences((prev) =>
                                        prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, startDate: event.target.value } : expItem))
                                      );
                                    }}
                                    onFocus={() => setStartDateFocused({ ...startDateFocused, [exp.id]: true })}
                                    onBlur={() => setStartDateFocused({ ...startDateFocused, [exp.id]: false })}
                                    onClick={() => startDateInputRefs.current[exp.id]?.showPicker()}
                                    className={`px-4 pl-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                      startDateFocused[exp.id] || (startDateValue[exp.id] || exp.startDate) ? "pt-4 pb-1" : "pt-3 pb-1"
                                    }`}
                                    style={{
                                      width: "calc(100% - 24px)",
                                      marginLeft: "12px",
                                      marginRight: "12px",
                                      height: "45px",
                                      borderRadius: "8px",
                                      border: "1px solid #E1E1E1",
                                      backgroundColor: "#F4F4F4",
                                      color: startDateValue[exp.id] || exp.startDate ? "#1e293b" : "transparent",
                                      boxShadow: undefined,
                                      lineHeight: "1.5",
                                    }}
                                  />
                                  <label
                                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                      startDateFocused[exp.id] || (startDateValue[exp.id] || exp.startDate)
                                        ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                                        : "left-12 top-1/2 -translate-y-1/2 text-sm"
                                    }`}
                                    style={
                                      startDateFocused[exp.id] || (startDateValue[exp.id] || exp.startDate)
                                        ? { color: "#239CD2" }
                                        : undefined
                                    }
                                  >
                                    Start Date
                                  </label>
                                </div>
                              </div>
                              <div className="relative" style={{ flex: 1 }}>
                                <div className="relative">
                                  <div
                                    className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                                    onClick={() => endDateInputRefs.current[exp.id]?.showPicker()}
                                  >
                                    <Image
                                      src="/calendar_icon.png"
                                      alt="Calendar"
                                      width={16}
                                      height={16}
                                      className="h-4 w-4"
                                    />
                                  </div>
                                  <input
                                    ref={(el) => {
                                      endDateInputRefs.current[exp.id] = el;
                                    }}
                                    type="date"
                                    value={endDateValue[exp.id] || exp.endDate}
                                    onChange={(event) => {
                                      setEndDateValue({ ...endDateValue, [exp.id]: event.target.value });
                                      setExperiences((prev) =>
                                        prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, endDate: event.target.value, isCurrent: false } : expItem))
                                      );
                                    }}
                                    onFocus={() => setEndDateFocused({ ...endDateFocused, [exp.id]: true })}
                                    onBlur={() => setEndDateFocused({ ...endDateFocused, [exp.id]: false })}
                                    onClick={() => endDateInputRefs.current[exp.id]?.showPicker()}
                                    disabled={exp.isCurrent}
                                    className={`px-4 pl-12 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                      endDateFocused[exp.id] || (endDateValue[exp.id] || exp.endDate) ? "pt-4 pb-1" : "pt-3 pb-1"
                                    } ${exp.isCurrent ? "opacity-50 cursor-not-allowed" : ""}`}
                                    style={{
                                      width: "calc(100% - 24px)",
                                      marginLeft: "12px",
                                      marginRight: "12px",
                                      height: "45px",
                                      borderRadius: "8px",
                                      border: "1px solid #E1E1E1",
                                      backgroundColor: "#F4F4F4",
                                      color: endDateValue[exp.id] || exp.endDate ? "#1e293b" : "transparent",
                                      boxShadow: undefined,
                                      lineHeight: "1.5",
                                    }}
                                  />
                                  <label
                                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                      endDateFocused[exp.id] || (endDateValue[exp.id] || exp.endDate)
                                        ? "left-12 -top-2.5 text-xs font-medium bg-white px-1"
                                        : "left-12 top-1/2 -translate-y-1/2 text-sm"
                                    }`}
                                    style={
                                      endDateFocused[exp.id] || (endDateValue[exp.id] || exp.endDate)
                                        ? { color: "#239CD2" }
                                        : undefined
                                    }
                                  >
                                    End Date
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* I currently work here checkbox */}
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                checked={exp.isCurrent}
                                onChange={(event) => {
                                  setExperiences((prev) =>
                                    prev.map((expItem) =>
                                      expItem.id === exp.id
                                        ? { ...expItem, isCurrent: event.target.checked, endDate: event.target.checked ? "" : expItem.endDate }
                                        : expItem
                                    )
                                  );
                                }}
                                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                              />
                              <label
                                htmlFor={`current-${exp.id}`}
                                className="text-slate-700"
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "14px",
                                }}
                              >
                                I currently work here
                              </label>
                            </div>

                            {/* Responsibilities */}
                            <div className="relative">
                              <div className="relative">
                                <textarea
                                  value={responsibilitiesValue[exp.id] || exp.responsibilities}
                                  onChange={(event) => {
                                    setResponsibilitiesValue({ ...responsibilitiesValue, [exp.id]: event.target.value });
                                    setExperiences((prev) =>
                                      prev.map((expItem) => (expItem.id === exp.id ? { ...expItem, responsibilities: event.target.value } : expItem))
                                    );
                                  }}
                                  onFocus={() => setResponsibilitiesFocused({ ...responsibilitiesFocused, [exp.id]: true })}
                                  onBlur={() => setResponsibilitiesFocused({ ...responsibilitiesFocused, [exp.id]: false })}
                                  rows={4}
                                  className={`px-4 pb-2 pt-5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 resize-none`}
                                  style={{
                                    width: "calc(100% - 24px)",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    minHeight: "100px",
                                    borderRadius: "8px",
                                    border: "1px solid #E1E1E1",
                                    backgroundColor: "#F4F4F4",
                                    boxShadow: undefined,
                                  }}
                                />
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${
                                    responsibilitiesFocused[exp.id] || (responsibilitiesValue[exp.id] || exp.responsibilities)
                                      ? "left-6 top-1.5 text-xs font-medium bg-white px-1"
                                      : "left-6 top-4 text-sm"
                                  }`}
                                  style={
                                    responsibilitiesFocused[exp.id] || (responsibilitiesValue[exp.id] || exp.responsibilities)
                                      ? { color: "#239CD2" }
                                      : undefined
                                  }
                                >
                                  Responsibilities
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add More Experience Button */}
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={addExperience}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-sky-500 bg-white px-4 py-3 font-medium text-sky-600 transition hover:bg-sky-50"
                        style={{
                          height: "48.19px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <Image
                          src="/plus-icopn.png"
                          alt="Add"
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                        Add More Experience
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3" style={{ marginRight: "48px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSlideDirection('left');
                          setTimeout(() => setActiveForm('skills'), 50);
                        }}
                        className="transition"
                        style={{
                          width: "181.53px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #0A65CC",
                          borderStyle: "solid",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#0A65CC",
                        }}
                      >
                        Discard Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="text-white transition hover:opacity-90"
                        style={{
                          width: "161px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FF8C00",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Salary Expectation Form */}
                  <div 
                    className={`form-slide ${activeForm === 'salary-exp' 
                      ? (slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left')
                      : (slideDirection === 'right' ? 'slide-out-right' : 'slide-out-left')
                    }`}
                    style={{ 
                      position: 'absolute',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '26px',
                      top: 0,
                      left: 0,
                      opacity: activeForm === 'salary-exp' ? 1 : 0,
                      pointerEvents: activeForm === 'salary-exp' ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="font-medium text-slate-900"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "32.12px",
                          lineHeight: "40.2px",
                          letterSpacing: "0%",
                        }}
                      >
                        Salary Expectation
                      </h2>
                      <Image
                        src="/auto_ai.png"
                        alt="Auto-filled by AI"
                        width={109}
                        height={25}
                        className="h-auto w-auto"
                      />
                    </div>

                    {/* Two Column Section: Current Salary and Expected Salary */}
                    <div className="w-full flex items-start justify-center" style={{ width: "700px", gap: "0px" }}>
                      {/* Current Salary Section - Left Column */}
                      <div className="flex-1 pr-6" style={{ maxWidth: "50%" }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current</h3>
                        <div className="space-y-4">
                          {/* Currency and Salary Type in one row */}
                          <div className="flex items-center gap-2">
                            {/* Currency */}
                            <div className="relative flex-1">
                              <div className="relative">
                                <select
                                  value={currentCurrency}
                                  onChange={(e) => setCurrentCurrency(e.target.value)}
                                  onFocus={() => setCurrentCurrencyFocused(true)}
                                  onBlur={() => setCurrentCurrencyFocused(false)}
                                  className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    currentCurrencyFocused || currentCurrency ? "pt-5" : "pt-3"
                                  }`}
                                  style={{
                                    width: "100%",
                                    ...salaryFieldStyle,
                                    appearance: "none",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {currencies.map((curr) => (
                                    <option key={curr} value={curr}>
                                      {curr}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(currentCurrencyFocused, !!currentCurrency)}`}
                                  style={salaryLabelColor(currentCurrencyFocused, !!currentCurrency)}
                                >
                                  Currency
                                </label>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            {/* Salary Type */}
                            <div className="relative flex-1">
                              <div className="relative">
                                <select
                                  value={currentSalaryType}
                                  onChange={(e) => setCurrentSalaryType(e.target.value)}
                                  onFocus={() => setCurrentSalaryTypeFocused(true)}
                                  onBlur={() => setCurrentSalaryTypeFocused(false)}
                                  className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    currentSalaryTypeFocused || currentSalaryType ? "pt-5" : "pt-3"
                                  }`}
                                  style={{
                                    width: "100%",
                                    ...salaryFieldStyle,
                                    appearance: "none",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {salaryTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(currentSalaryTypeFocused, !!currentSalaryType)}`}
                                  style={salaryLabelColor(currentSalaryTypeFocused, !!currentSalaryType)}
                                >
                                  Salary Type
                                </label>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Current Salary */}
                          <div className="relative">
                            <div className="relative">
                              <input
                                type="number"
                                value={currentSalary}
                                onChange={(e) => setCurrentSalary(e.target.value)}
                                onFocus={() => setCurrentSalaryFocused(true)}
                                onBlur={() => setCurrentSalaryFocused(false)}
                                className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  currentSalaryFocused || currentSalary ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "100%",
                                  ...salaryFieldStyle,
                                }}
                              />
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(currentSalaryFocused, !!currentSalary)}`}
                                style={salaryLabelColor(currentSalaryFocused, !!currentSalary)}
                              >
                                Current Salary
                              </label>
                            </div>
                          </div>
                          {/* Current Location */}
                          <div className="relative">
                            <div className="relative">
                              <input
                                type="text"
                                value={currentLocation}
                                onChange={(e) => setCurrentLocation(e.target.value)}
                                onFocus={() => setCurrentLocationFocused(true)}
                                onBlur={() => setCurrentLocationFocused(false)}
                                className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  currentLocationFocused || currentLocation ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "100%",
                                  ...salaryFieldStyle,
                                }}
                              />
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(currentLocationFocused, !!currentLocation)}`}
                                style={salaryLabelColor(currentLocationFocused, !!currentLocation)}
                              >
                                Current Location
                              </label>
                            </div>
                          </div>
                          {/* Benefits */}
                          <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-3" style={{ color: "#239CD2" }}>
                              Benefits
                            </label>
                            <div className="space-y-2.5" style={{ maxHeight: "200px", overflowY: "auto" }}>
                              {benefitOptions.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`benefit-${benefit}`}
                                    checked={selectedBenefits.includes(benefit)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedBenefits([...selectedBenefits, benefit]);
                                      } else {
                                        setSelectedBenefits(selectedBenefits.filter((b) => b !== benefit));
                                      }
                                    }}
                                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer"
                                    style={{
                                      accentColor: "#239CD2",
                                    }}
                                  />
                                  <label
                                    htmlFor={`benefit-${benefit}`}
                                    className="text-sm text-slate-700 cursor-pointer select-none"
                                  >
                                    {benefit}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {showAddBenefit ? (
                              <div className="flex items-center gap-2 mt-3">
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
                                    className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                      newBenefit ? "pt-5" : "pt-3"
                                    }`}
                                    style={{
                                      width: "100%",
                                      ...salaryFieldStyle,
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter" && newBenefit.trim()) {
                                        setBenefitOptions([...benefitOptions, newBenefit.trim()]);
                                        setSelectedBenefits([...selectedBenefits, newBenefit.trim()]);
                                        setNewBenefit("");
                                        setShowAddBenefit(false);
                                      }
                                    }}
                                  />
                                  <label
                                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(!!newBenefit, !!newBenefit)}`}
                                    style={salaryLabelColor(!!newBenefit, !!newBenefit)}
                                  >
                                    Enter new benefit
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newBenefit.trim()) {
                                      setBenefitOptions([...benefitOptions, newBenefit.trim()]);
                                      setSelectedBenefits([...selectedBenefits, newBenefit.trim()]);
                                      setNewBenefit("");
                                      setShowAddBenefit(false);
                                    }
                                  }}
                                  className="px-4 py-2 text-sm bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                                  style={{
                                    height: "48.19px",
                                    borderRadius: "5.02px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddBenefit(false);
                                    setNewBenefit("");
                                  }}
                                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition text-slate-700"
                                  style={{
                                    height: "48.19px",
                                    borderRadius: "5.02px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowAddBenefit(true)}
                                className="mt-3 flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium transition"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Add Other
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Vertical Divider Line */}
                      <div className="w-px bg-gray-300 h-full shrink-0" style={{ minHeight: "200px" }}></div>

                      {/* Expected Salary Section - Right Column */}
                      <div className="flex-1 pl-6" style={{ maxWidth: "50%" }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred</h3>
                        <div className="space-y-4">
                          {/* Currency and Salary Type in one row */}
                          <div className="flex items-center gap-2">
                            {/* Currency */}
                            <div className="relative flex-1">
                              <div className="relative">
                                <select
                                  value={expectedCurrency}
                                  onChange={(e) => setExpectedCurrency(e.target.value)}
                                  onFocus={() => setExpectedCurrencyFocused(true)}
                                  onBlur={() => setExpectedCurrencyFocused(false)}
                                  className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    expectedCurrencyFocused || expectedCurrency ? "pt-5" : "pt-3"
                                  }`}
                                  style={{
                                    width: "100%",
                                    ...salaryFieldStyle,
                                    appearance: "none",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {currencies.map((curr) => (
                                    <option key={curr} value={curr}>
                                      {curr}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(expectedCurrencyFocused, !!expectedCurrency)}`}
                                  style={salaryLabelColor(expectedCurrencyFocused, !!expectedCurrency)}
                                >
                                  Currency
                                </label>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            {/* Salary Type */}
                            <div className="relative flex-1">
                              <div className="relative">
                                <select
                                  value={expectedSalaryType}
                                  onChange={(e) => setExpectedSalaryType(e.target.value)}
                                  onFocus={() => setExpectedSalaryTypeFocused(true)}
                                  onBlur={() => setExpectedSalaryTypeFocused(false)}
                                  className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                    expectedSalaryTypeFocused || expectedSalaryType ? "pt-5" : "pt-3"
                                  }`}
                                  style={{
                                    width: "100%",
                                    ...salaryFieldStyle,
                                    appearance: "none",
                                  }}
                                >
                                  <option value="" disabled hidden></option>
                                  {salaryTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                                <label
                                  className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(expectedSalaryTypeFocused, !!expectedSalaryType)}`}
                                  style={salaryLabelColor(expectedSalaryTypeFocused, !!expectedSalaryType)}
                                >
                                  Salary Type
                                </label>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Preferred Salary */}
                          <div className="relative">
                            <div className="relative">
                              <input
                                type="number"
                                value={preferredSalary}
                                onChange={(e) => setPreferredSalary(e.target.value)}
                                onFocus={() => setPreferredSalaryFocused(true)}
                                onBlur={() => setPreferredSalaryFocused(false)}
                                className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  preferredSalaryFocused || preferredSalary ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "100%",
                                  ...salaryFieldStyle,
                                }}
                              />
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(preferredSalaryFocused, !!preferredSalary)}`}
                                style={salaryLabelColor(preferredSalaryFocused, !!preferredSalary)}
                              >
                                Preferred Salary
                              </label>
                            </div>
                          </div>
                          {/* Preferred Locations */}
                          <div className="relative">
                            <PreferredLocationFieldBlock
                              label="Preferred Locations"
                              placeholder="Enter your preferred location"
                              value={preferredLocationInput}
                              onChange={setPreferredLocationInput}
                              onEnterKey={(val) => handleLocationEnterKey(val)}
                              chips={locationChips}
                              selectedChips={selectedPreferredLocations}
                              onToggle={(value) => toggleLocation(value)}
                              onRemove={(value) => removeLocation(value)}
                              fieldStyle={salaryFieldStyle}
                              labelFloating={salaryLabelFloating}
                              labelColor={salaryLabelColor}
                              focused={preferredLocationFocused}
                              setFocused={setPreferredLocationFocused}
                              visaDetailsByLocation={visaDetailsByLocation}
                              getVisaSummaryForLocation={getVisaSummaryForLocation}
                            />
                            
                            {/* Visa Questions - Rendered directly below locations */}
                            {showVisaQuestions && (
                              <div className="mt-4 space-y-4">
                                {/* Step 0: Do you have visa? */}
                                {visaQuestionStep === 0 && (
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Do you have a visa?</h3>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setHasVisa("yes");
                                          setVisaStatus("");
                                          setVisaStartDate("");
                                          setVisaEndDate("");
                                          setVisaSponsorshipRequired("");
                                          handleVisaNext("yes");
                                        }}
                                        className={`flex-1 px-4 py-2 text-sm rounded-lg border-2 font-medium transition ${
                                          hasVisa === "yes"
                                            ? "bg-sky-600 border-sky-600 text-white"
                                            : "bg-white border-gray-300 text-gray-700 hover:border-sky-300"
                                        }`}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setHasVisa("no");
                                          setVisaStatus("");
                                          setVisaStartDate("");
                                          setVisaEndDate("");
                                          setVisaSponsorshipRequired("");
                                          handleVisaNext("no");
                                        }}
                                        className={`flex-1 px-4 py-2 text-sm rounded-lg border-2 font-medium transition ${
                                          hasVisa === "no"
                                            ? "bg-sky-600 border-sky-600 text-white"
                                            : "bg-white border-gray-300 text-gray-700 hover:border-sky-300"
                                        }`}
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Step 1: Visa Status (if Yes) */}
                                {visaQuestionStep === 1 && (
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <h3 className="text-sm font-semibold text-gray-900">Visa Status</h3>
                                      <button
                                        onClick={handleVisaBack}
                                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                                      >
                                        ← Back
                                      </button>
                                    </div>
                                    <div className="relative">
                                      <select
                                        value={visaStatus}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setVisaStatus(value);
                                          if (value) {
                                            handleVisaNext(undefined, value);
                                          }
                                        }}
                                        onFocus={() => setVisaStatusFocused(true)}
                                        onBlur={() => setVisaStatusFocused(false)}
                                        className={`w-full px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                          visaStatusFocused || visaStatus ? "pt-5" : "pt-3"
                                        }`}
                                        style={{
                                          ...salaryFieldStyle,
                                          appearance: "none",
                                        }}
                                      >
                                        <option value="" disabled hidden>Select visa status</option>
                                        {visaStatusOptions.map((status) => (
                                          <option key={status} value={status}>
                                            {status}
                                          </option>
                                        ))}
                                      </select>
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Step 2: Visa Dates (if Work/Student/Tourist/Other visa) */}
                                {visaQuestionStep === 2 && (
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <h3 className="text-sm font-semibold text-gray-900">Visa Dates</h3>
                                      <button
                                        type="button"
                                        onClick={handleVisaBack}
                                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                                      >
                                        ← Back
                                      </button>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="relative">
                                        <input
                                          type="date"
                                          value={visaStartDate}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setVisaStartDate(value);
                                            if (value && visaEndDate) {
                                              requestAnimationFrame(() => {
                                                handleVisaNext();
                                              });
                                            }
                                          }}
                                          onFocus={() => setVisaStartDateFocused(true)}
                                          onBlur={() => {
                                            setVisaStartDateFocused(false);
                                            if (visaStartDate && visaEndDate) {
                                              requestAnimationFrame(() => {
                                                handleVisaNext();
                                              });
                                            }
                                          }}
                                          className={`w-full px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                            visaStartDateFocused || visaStartDate ? "pt-5" : "pt-3"
                                          }`}
                                          style={salaryFieldStyle}
                                        />
                                        <label
                                          className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(visaStartDateFocused, !!visaStartDate)}`}
                                          style={salaryLabelColor(visaStartDateFocused, !!visaStartDate)}
                                        >
                                          Start Date
                                        </label>
                                      </div>
                                      <div className="relative">
                                        <input
                                          type="date"
                                          value={visaEndDate}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setVisaEndDate(value);
                                            if (value && currentLocationForVisa) {
                                              saveVisaDetailsForCurrentLocation(value);
                                              resetVisaQuestions();
                                            }
                                          }}
                                          onInput={(e) => {
                                            const value = (e.target as HTMLInputElement).value;
                                            if (value && currentLocationForVisa) {
                                              setVisaEndDate(value);
                                              saveVisaDetailsForCurrentLocation(value);
                                              resetVisaQuestions();
                                            }
                                          }}
                                          onFocus={() => setVisaEndDateFocused(true)}
                                          onBlur={() => setVisaEndDateFocused(false)}
                                          className={`w-full px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                            visaEndDateFocused || visaEndDate ? "pt-5" : "pt-3"
                                          }`}
                                          style={salaryFieldStyle}
                                        />
                                        <label
                                          className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(visaEndDateFocused, !!visaEndDate)}`}
                                          style={salaryLabelColor(visaEndDateFocused, !!visaEndDate)}
                                        >
                                          End Date
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Step 3: Visa Sponsorship (if No) */}
                                {visaQuestionStep === 3 && (
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <h3 className="text-sm font-semibold text-gray-900">Visa Sponsorship Required?</h3>
                                      <button
                                        type="button"
                                        onClick={handleVisaBack}
                                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                                      >
                                        ← Back
                                      </button>
                                    </div>
                                    <div className="mb-3">
                                      <p className="text-xs italic text-gray-600 mb-3">
                                        Sponsorship means the employer must apply for or support your legal work authorization.
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setVisaSponsorshipRequired("yes");
                                            handleVisaNext(undefined, undefined, "yes");
                                          }}
                                          className={`px-4 py-2 text-sm rounded-lg border-2 font-medium transition ${
                                            visaSponsorshipRequired === "yes"
                                              ? "bg-sky-600 border-sky-600 text-white"
                                              : "bg-white border-gray-300 text-gray-700 hover:border-sky-300"
                                          }`}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setVisaSponsorshipRequired("no");
                                            handleVisaNext(undefined, undefined, "no");
                                          }}
                                          className={`px-4 py-2 text-sm rounded-lg border-2 font-medium transition ${
                                            visaSponsorshipRequired === "no"
                                              ? "bg-sky-600 border-sky-600 text-white"
                                              : "bg-white border-gray-300 text-gray-700 hover:border-sky-300"
                                          }`}
                                        >
                                          No
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setVisaSponsorshipRequired("not sure");
                                            handleVisaNext(undefined, undefined, "not sure");
                                          }}
                                          className={`px-4 py-2 text-sm rounded-lg border-2 font-medium transition ${
                                            visaSponsorshipRequired === "not sure"
                                              ? "bg-sky-600 border-sky-600 text-white"
                                              : "bg-white border-gray-300 text-gray-700 hover:border-sky-300"
                                          }`}
                                        >
                                          Not sure
                                        </button>
                                      </div>
                                    </div>
                                    {selectedPreferredLocations.some(loc => locationsRequiringSponsorship.includes(loc)) && (
                                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
                                        <p className="text-xs text-blue-800">
                                          <strong>Note:</strong> Some selected locations require company-sponsored visas.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {/* Preferred Role */}
                          <PreferredRoleFieldBlock
                            label="Preferred Role"
                            placeholder="Enter your preferred job role"
                            value={preferredRoleInput}
                            onChange={setPreferredRoleInput}
                            onEnterKey={(val) => handleRoleEnterKey(val)}
                            chips={roleChips}
                            selectedChips={selectedPreferredRoles}
                            onToggle={(value) => toggleRole(value)}
                            onRemove={(value) => removeRole(value)}
                            fieldStyle={salaryFieldStyle}
                            labelFloating={salaryLabelFloating}
                            labelColor={salaryLabelColor}
                            focused={preferredRoleFocused}
                            setFocused={setPreferredRoleFocused}
                          />
                          {/* Preferred Work Mode */}
                          <div className="relative">
                            <div className="relative">
                              <select
                                value={preferredWorkMode}
                                onChange={(e) => setPreferredWorkMode(e.target.value)}
                                onFocus={() => setPreferredWorkModeFocused(true)}
                                onBlur={() => setPreferredWorkModeFocused(false)}
                                className={`px-4 pb-2 pr-10 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                  preferredWorkModeFocused || preferredWorkMode ? "pt-5" : "pt-3"
                                }`}
                                style={{
                                  width: "100%",
                                  ...salaryFieldStyle,
                                  appearance: "none",
                                }}
                              >
                                <option value="" disabled hidden></option>
                                {workModes.map((mode) => (
                                  <option key={mode} value={mode}>
                                    {mode}
                                  </option>
                                ))}
                              </select>
                              <label
                                className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(preferredWorkModeFocused, !!preferredWorkMode)}`}
                                style={salaryLabelColor(preferredWorkModeFocused, !!preferredWorkMode)}
                              >
                                Preferred Work Mode
                              </label>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3 4.5L6 7.5L9 4.5" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Benefits - Same as Current Salary */}
                          <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 mb-3" style={{ color: "#239CD2" }}>
                              Benefits
                            </label>
                            <div className="space-y-2.5" style={{ maxHeight: "200px", overflowY: "auto" }}>
                              {benefitOptions.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={`expected-benefit-${benefit}`}
                                    checked={expectedSelectedBenefits.includes(benefit)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setExpectedSelectedBenefits([...expectedSelectedBenefits, benefit]);
                                      } else {
                                        setExpectedSelectedBenefits(expectedSelectedBenefits.filter((b) => b !== benefit));
                                      }
                                    }}
                                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 cursor-pointer"
                                    style={{
                                      accentColor: "#239CD2",
                                    }}
                                  />
                                  <label
                                    htmlFor={`expected-benefit-${benefit}`}
                                    className="text-sm text-slate-700 cursor-pointer select-none"
                                  >
                                    {benefit}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {showAddBenefit ? (
                              <div className="flex items-center gap-2 mt-3">
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
                                    className={`px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
                                      newBenefit ? "pt-5" : "pt-3"
                                    }`}
                                    style={{
                                      width: "100%",
                                      ...salaryFieldStyle,
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter" && newBenefit.trim()) {
                                        setBenefitOptions([...benefitOptions, newBenefit.trim()]);
                                        setExpectedSelectedBenefits([...expectedSelectedBenefits, newBenefit.trim()]);
                                        setNewBenefit("");
                                        setShowAddBenefit(false);
                                      }
                                    }}
                                  />
                                  <label
                                    className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${salaryLabelFloating(!!newBenefit, !!newBenefit)}`}
                                    style={salaryLabelColor(!!newBenefit, !!newBenefit)}
                                  >
                                    Enter new benefit
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newBenefit.trim()) {
                                      setBenefitOptions([...benefitOptions, newBenefit.trim()]);
                                      setExpectedSelectedBenefits([...expectedSelectedBenefits, newBenefit.trim()]);
                                      setNewBenefit("");
                                      setShowAddBenefit(false);
                                    }
                                  }}
                                  className="px-4 py-2 text-sm bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                                  style={{
                                    height: "48.19px",
                                    borderRadius: "5.02px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddBenefit(false);
                                    setNewBenefit("");
                                  }}
                                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition text-slate-700"
                                  style={{
                                    height: "48.19px",
                                    borderRadius: "5.02px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowAddBenefit(true)}
                                className="mt-3 flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium transition"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Add Other
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3" style={{ marginRight: "48px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSlideDirection('left');
                          setTimeout(() => setActiveForm('work-exp'), 50);
                        }}
                        className="transition"
                        style={{
                          width: "181.53px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #0A65CC",
                          borderStyle: "solid",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#0A65CC",
                        }}
                      >
                        Discard Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => router.push("/completion-profile")}
                        className="text-white transition hover:opacity-90"
                        style={{
                          width: "161px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#FF8C00",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "22px",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* End White Card Container */}
        </form>
      </main>

    </div>
  );
}

// LanguageFieldBlock component (from skills page)
interface LanguageFieldBlockProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onEnterKey: (val: string) => void;
  chips: string[];
  selectedChips: string[];
  onToggle: (value: string) => void;
  onRemove: (value: string) => void;
  proficiencies: { [key: string]: string };
  onProficiencyChange: (language: string, proficiency: string) => void;
  fieldStyle: Record<string, string | number>;
  labelFloating: (focused: boolean, hasValue: boolean) => string;
  labelColor: (focused: boolean, hasValue: boolean) => Record<string, string> | undefined;
}

function LanguageFieldBlock({
  label,
  placeholder,
  value,
  onChange,
  onEnterKey,
  chips,
  selectedChips,
  onToggle,
  onRemove,
  proficiencies,
  onProficiencyChange,
  fieldStyle,
  labelFloating,
  labelColor,
}: LanguageFieldBlockProps) {
  const [focused, setFocused] = useState(false);
  const proficiencyLevels = ["Basic", "Conversational", "Professional", "Fluent"];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterKey(value);
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
            focused || value ? "pt-5" : "pt-3"
          }`}
          style={fieldStyle}
          placeholder=""
        />
        <label
          className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${labelFloating(focused, !!value)}`}
          style={labelColor(focused, !!value)}
        >
          {label}
        </label>
      </div>
      <div className="flex flex-col gap-3">
        {/* Show selected languages with proficiency selector */}
        {selectedChips.map((chip) => (
          <div key={chip} className="flex flex-col gap-2.5 rounded-lg border bg-white p-3" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  borderColor: "#239CD2",
                  color: "#374151",
                }}
              >
                <span>{chip}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(chip);
                  }}
                  className="text-slate-600 hover:text-slate-800 transition"
                  aria-label={`Remove ${chip}`}
                  style={{
                    color: "#374151",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Proficiency Level Selector */}
            <div className="flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2.5" style={{ backgroundColor: "#F9FAFB" }}>
              <span
                className="font-semibold whitespace-nowrap"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#374151",
                }}
              >
                Proficiency Level:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {proficiencyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => onProficiencyChange(chip, level)}
                    className="rounded-md px-3 py-1.5 transition-all duration-200 font-medium"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      backgroundColor: proficiencies[chip] === level ? "#239CD2" : "#FFFFFF",
                      color: proficiencies[chip] === level ? "#FFFFFF" : "#6B7280",
                      border: proficiencies[chip] === level ? "1px solid #239CD2" : "1px solid #E5E7EB",
                      fontWeight: proficiencies[chip] === level ? "600" : "500",
                      boxShadow: proficiencies[chip] === level 
                        ? "0 2px 4px rgba(35, 156, 210, 0.25)" 
                        : "0 1px 2px rgba(0, 0, 0, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      if (proficiencies[chip] !== level) {
                        e.currentTarget.style.backgroundColor = "#F3F4F6";
                        e.currentTarget.style.borderColor = "#D1D5DB";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (proficiencies[chip] !== level) {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.borderColor = "#E5E7EB";
                        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
                      }
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Show unselected chips as clickable buttons */}
        <div className="flex flex-wrap gap-2">
          {chips
            .filter((chip) => !selectedChips.includes(chip))
            .map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onToggle(chip)}
                className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium transition hover:bg-slate-50"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  borderColor: "#E5E7EB",
                  color: "#374151",
                }}
              >
                <span>{chip}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

// PreferredLocationFieldBlock component (from salary-expectation page)
interface PreferredLocationFieldBlockProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onEnterKey: (val: string) => void;
  chips: string[];
  selectedChips: string[];
  onToggle: (value: string) => void;
  onRemove: (value: string) => void;
  fieldStyle: Record<string, string | number>;
  labelFloating: (focused: boolean, hasValue: boolean) => string;
  labelColor: (focused: boolean, hasValue: boolean) => Record<string, string> | undefined;
  focused: boolean;
  setFocused: (val: boolean) => void;
  visaDetailsByLocation: Record<string, {
    hasVisa: string;
    visaStatus?: string;
    visaStartDate?: string;
    visaEndDate?: string;
    visaSponsorshipRequired?: string;
  }>;
  getVisaSummaryForLocation: (location: string) => string;
}

function PreferredLocationFieldBlock({
  label,
  placeholder,
  value,
  onChange,
  onEnterKey,
  chips,
  selectedChips,
  onToggle,
  onRemove,
  fieldStyle,
  labelFloating,
  labelColor,
  focused,
  setFocused,
  visaDetailsByLocation,
  getVisaSummaryForLocation,
}: PreferredLocationFieldBlockProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterKey(value);
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
            focused || value ? "pt-5" : "pt-3"
          }`}
          style={fieldStyle}
          placeholder=""
        />
        <label
          className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${labelFloating(focused, !!value)}`}
          style={labelColor(focused, !!value)}
        >
          {label}
        </label>
      </div>
      {/* Show selected locations with visa details - one row per location */}
      <div className="space-y-2">
        {selectedChips.map((chip) => {
          const visaSummary = getVisaSummaryForLocation(chip);
          return (
            <div key={chip} className="flex items-center gap-2 flex-wrap">
              <div
                className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  borderColor: "#239CD2",
                  color: "#374151",
                }}
              >
                <span>{chip}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(chip);
                  }}
                  className="text-slate-600 hover:text-slate-800"
                  aria-label={`Remove ${chip}`}
                  style={{
                    color: "#374151",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {visaSummary && (
                <span
                  className="text-xs text-gray-600 font-medium"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {visaSummary}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Show unselected chips as clickable buttons */}
      <div className="flex flex-wrap gap-2 mt-2">
        {chips
          .filter((chip) => !selectedChips.includes(chip))
          .map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onToggle(chip)}
              className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium transition hover:bg-slate-50"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                borderColor: "#E5E7EB",
                color: "#374151",
              }}
            >
              <span>{chip}</span>
            </button>
          ))}
      </div>
    </div>
  );
}

// PreferredRoleFieldBlock component (from salary-expectation page)
interface PreferredRoleFieldBlockProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onEnterKey: (val: string) => void;
  chips: string[];
  selectedChips: string[];
  onToggle: (value: string) => void;
  onRemove: (value: string) => void;
  fieldStyle: Record<string, string | number>;
  labelFloating: (focused: boolean, hasValue: boolean) => string;
  labelColor: (focused: boolean, hasValue: boolean) => Record<string, string> | undefined;
  focused: boolean;
  setFocused: (val: boolean) => void;
}

function PreferredRoleFieldBlock({
  label,
  placeholder,
  value,
  onChange,
  onEnterKey,
  chips,
  selectedChips,
  onToggle,
  onRemove,
  fieldStyle,
  labelFloating,
  labelColor,
  focused,
  setFocused,
}: PreferredRoleFieldBlockProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterKey(value);
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 pb-2 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
            focused || value ? "pt-5" : "pt-3"
          }`}
          style={fieldStyle}
          placeholder=""
        />
        <label
          className={`pointer-events-none absolute text-slate-500 transition-all duration-200 ${labelFloating(focused, !!value)}`}
          style={labelColor(focused, !!value)}
        >
          {label}
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Show selected chips first with remove button */}
        {selectedChips.map((chip) => (
          <div
            key={chip}
            className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              borderColor: "#239CD2",
              color: "#374151",
            }}
          >
            <span>{chip}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(chip);
              }}
              className="text-slate-600 hover:text-slate-800"
              aria-label={`Remove ${chip}`}
              style={{
                color: "#374151",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {/* Show unselected chips as clickable buttons */}
        {chips
          .filter((chip) => !selectedChips.includes(chip))
          .map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onToggle(chip)}
              className="flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 font-medium transition hover:bg-slate-50"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                borderColor: "#E5E7EB",
                color: "#374151",
              }}
            >
              <span>{chip}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
