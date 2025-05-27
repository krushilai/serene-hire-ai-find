
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, FolderOpen, Clock } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface ReviewStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const ReviewStep = ({ data }: ReviewStepProps) => {
  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 8;

    if (data.basicInfo.fullName && data.basicInfo.email && data.basicInfo.location) completed++;
    if (data.professionalSummary) completed++;
    if (data.skills.length > 0) completed++;
    if (data.workExperience.length > 0) completed++;
    if (data.education.length > 0) completed++;
    if (data.projects.length > 0) completed++;
    if (data.availability.noticePeriod || data.availability.workType) completed++;
    completed++; // Review step is always complete when reached

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎉 Your Profile is {completionPercentage}% Complete!
        </h2>
        <p className="text-gray-600">
          Review your information below. You can always edit any section later.
        </p>
      </div>

      {/* Profile Preview */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="text-center pb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
              {data.basicInfo.fullName ? data.basicInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800">
            {data.basicInfo.fullName || "Your Name"}
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
            {data.basicInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.basicInfo.email}
              </div>
            )}
            {data.basicInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.basicInfo.phone}
              </div>
            )}
            {data.basicInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.basicInfo.location}
              </div>
            )}
            {data.basicInfo.linkedinUrl && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </div>
            )}
          </div>
        </CardHeader>
        
        {data.professionalSummary && (
          <CardContent className="pt-0">
            <p className="text-gray-700 text-center italic">
              "{data.professionalSummary}"
            </p>
          </CardContent>
        )}
      </Card>

      {/* Skills */}
      {data.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="w-5 h-5 bg-purple-600" />
              Skills ({data.skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  {skill.name} ({skill.proficiency})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Work Experience ({data.workExperience.length} {data.workExperience.length === 1 ? 'role' : 'roles'})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.workExperience.map((exp, index) => (
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
      {data.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Education ({data.education.length} {data.education.length === 1 ? 'entry' : 'entries'})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.education.map((edu, index) => (
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
      {data.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-orange-600" />
              Projects ({data.projects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.projects.map((project, index) => (
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
      {(data.availability.noticePeriod || data.availability.workType) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Availability & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.availability.noticePeriod && (
              <p><strong>Notice Period:</strong> {data.availability.noticePeriod}</p>
            )}
            {data.availability.workType && (
              <p><strong>Work Type:</strong> {data.availability.workType}</p>
            )}
            {data.availability.willingToRelocate && (
              <p><strong>Relocation:</strong> {data.availability.willingToRelocate}</p>
            )}
            {data.availability.preferredRoles && (
              <p><strong>Preferred Roles:</strong> {data.availability.preferredRoles}</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          🚀 Your profile is ready to be discovered!
        </h3>
        <p className="text-gray-600">
          Amazing job! You've created a comprehensive profile that will help recruiters understand your unique value.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
