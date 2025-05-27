
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BasicInfoStep from "@/components/profile-steps/BasicInfoStep";
import ProfessionalSummaryStep from "@/components/profile-steps/ProfessionalSummaryStep";
import SkillsStep from "@/components/profile-steps/SkillsStep";
import WorkExperienceStep from "@/components/profile-steps/WorkExperienceStep";
import EducationStep from "@/components/profile-steps/EducationStep";
import ProjectsStep from "@/components/profile-steps/ProjectsStep";
import AvailabilityStep from "@/components/profile-steps/AvailabilityStep";
import ReviewStep from "@/components/profile-steps/ReviewStep";

export interface ProfileData {
  basicInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    profilePicture?: File;
  };
  professionalSummary: string;
  skills: Array<{
    name: string;
    proficiency: string;
  }>;
  workExperience: Array<{
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;
  availability: {
    noticePeriod: string;
    workType: string;
    willingToRelocate: string;
    preferredRoles: string;
  };
  additionalInfo: {
    languages: string[];
    portfolioLinks: string[];
    otherInfo: string;
  };
}

const ProfileBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    basicInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedinUrl: ""
    },
    professionalSummary: "",
    skills: [],
    workExperience: [],
    education: [],
    projects: [],
    availability: {
      noticePeriod: "",
      workType: "",
      willingToRelocate: "",
      preferredRoles: ""
    },
    additionalInfo: {
      languages: [],
      portfolioLinks: [],
      otherInfo: ""
    }
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with the basics",
      component: BasicInfoStep
    },
    {
      title: "Professional Summary",
      description: "Tell us about your core experience",
      component: ProfessionalSummaryStep
    },
    {
      title: "Skills",
      description: "Showcase your expertise",
      component: SkillsStep
    },
    {
      title: "Work Experience",
      description: "Share your professional journey",
      component: WorkExperienceStep
    },
    {
      title: "Education",
      description: "Your academic background",
      component: EducationStep
    },
    {
      title: "Projects",
      description: "Highlight your notable work",
      component: ProjectsStep
    },
    {
      title: "Availability",
      description: "Let recruiters know your preferences",
      component: AvailabilityStep
    },
    {
      title: "Review",
      description: "Almost there! Let's review everything",
      component: ReviewStep
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleComplete = () => {
    console.log("Profile completed:", profileData);
    navigate("/candidate-dashboard");
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">TalentFlow</div>
            <Button variant="ghost" onClick={() => navigate("/candidate-dashboard")}>
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Build Your Profile</h1>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          
          {/* Step indicators */}
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer transition-colors ${
                  index <= currentStep ? "text-purple-600" : "text-gray-400"
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 mb-2 ${
                    index < currentStep
                      ? "bg-purple-600 border-purple-600 text-white"
                      : index === currentStep
                      ? "border-purple-600 text-purple-600 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs text-center hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <Card className="shadow-lg border-purple-100 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800">
              {steps[currentStep].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={profileData}
              updateData={setProfileData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {currentStep < steps.length - 1
                ? "You're doing great! Keep going 🌟"
                : "You're almost there! 🎉"
              }
            </p>
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              Complete Profile
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBuilder;
