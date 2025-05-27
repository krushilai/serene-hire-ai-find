
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, FolderOpen, Clock } from "lucide-react";

// Mock profile data - in a real app, this would come from the user's saved profile
const mockProfileData = {
  basicInfo: {
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/johnsmith"
  },
  professionalSummary: "Experienced software engineer with 5+ years developing scalable web applications. Passionate about clean code and user experience, with a proven track record of delivering high-quality solutions.",
  skills: [
    { name: "JavaScript", proficiency: "Expert" },
    { name: "React", proficiency: "Expert" },
    { name: "Node.js", proficiency: "Intermediate" },
    { name: "Python", proficiency: "Intermediate" },
    { name: "AWS", proficiency: "Beginner" }
  ],
  workExperience: [
    {
      jobTitle: "Senior Software Engineer",
      companyName: "TechCorp",
      startDate: "Jan 2022",
      endDate: "Present",
      currentlyWorking: true,
      description: "Lead development of web applications using React and Node.js. Mentor junior developers and collaborate with product teams."
    },
    {
      jobTitle: "Software Engineer",
      companyName: "StartupXYZ",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      currentlyWorking: false,
      description: "Built full-stack applications and implemented CI/CD pipelines. Improved application performance by 40%."
    }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of California",
      fieldOfStudy: "Computer Science",
      startYear: "2016",
      endYear: "2020"
    }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    }
  ],
  availability: {
    noticePeriod: "2 weeks",
    workType: "Remote",
    willingToRelocate: "No",
    preferredRoles: "Senior Software Engineer, Tech Lead"
  }
};

const ProfilePreview = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📋 Profile Preview
        </h2>
        <p className="text-gray-600">
          This is how your profile appears to recruiters
        </p>
      </div>

      {/* Profile Header */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
              {mockProfileData.basicInfo.fullName ? mockProfileData.basicInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800">
            {mockProfileData.basicInfo.fullName || "Your Name"}
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
            {mockProfileData.basicInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {mockProfileData.basicInfo.email}
              </div>
            )}
            {mockProfileData.basicInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {mockProfileData.basicInfo.phone}
              </div>
            )}
            {mockProfileData.basicInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {mockProfileData.basicInfo.location}
              </div>
            )}
            {mockProfileData.basicInfo.linkedinUrl && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </div>
            )}
          </div>
        </CardHeader>
        
        {mockProfileData.professionalSummary && (
          <CardContent className="pt-0">
            <p className="text-gray-700 text-center italic">
              "{mockProfileData.professionalSummary}"
            </p>
          </CardContent>
        )}
      </Card>

      {/* Skills */}
      {mockProfileData.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="w-5 h-5 bg-purple-600" />
              Skills ({mockProfileData.skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockProfileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  {skill.name} ({skill.proficiency})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {mockProfileData.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Work Experience ({mockProfileData.workExperience.length} {mockProfileData.workExperience.length === 1 ? 'role' : 'roles'})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProfileData.workExperience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
                <p className="text-blue-600 font-medium">{exp.companyName}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {mockProfileData.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Education ({mockProfileData.education.length} {mockProfileData.education.length === 1 ? 'entry' : 'entries'})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockProfileData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-4">
                <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                <p className="text-green-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.fieldOfStudy && `${edu.fieldOfStudy} • `}
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {mockProfileData.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-orange-600" />
              Projects ({mockProfileData.projects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockProfileData.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-orange-200 pl-4">
                <h4 className="font-semibold text-gray-800">{project.title}</h4>
                <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Availability & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockProfileData.availability.noticePeriod && (
            <p><strong>Notice Period:</strong> {mockProfileData.availability.noticePeriod}</p>
          )}
          {mockProfileData.availability.workType && (
            <p><strong>Work Type:</strong> {mockProfileData.availability.workType}</p>
          )}
          {mockProfileData.availability.willingToRelocate && (
            <p><strong>Relocation:</strong> {mockProfileData.availability.willingToRelocate}</p>
          )}
          {mockProfileData.availability.preferredRoles && (
            <p><strong>Preferred Roles:</strong> {mockProfileData.availability.preferredRoles}</p>
          )}
        </CardContent>
      </Card>

      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          🚀 Your profile looks great!
        </h3>
        <p className="text-gray-600">
          This is how recruiters will see your profile. You can always edit and improve it anytime.
        </p>
      </div>
    </div>
  );
};

export default ProfilePreview;
