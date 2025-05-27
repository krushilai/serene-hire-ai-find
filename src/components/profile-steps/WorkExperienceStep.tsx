import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface WorkExperienceStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const WorkExperienceStep = ({ data, updateData }: WorkExperienceStepProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    achievements: [""]
  });

  const resetForm = () => {
    setCurrentExperience({
      jobTitle: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      achievements: [""]
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSave = () => {
    const experience = {
      ...currentExperience,
      achievements: currentExperience.achievements.filter(a => a.trim() !== "")
    };

    let updatedExperience;
    if (editingIndex !== null) {
      updatedExperience = [...data.workExperience];
      updatedExperience[editingIndex] = experience;
    } else {
      updatedExperience = [...data.workExperience, experience];
    }

    updateData({
      ...data,
      workExperience: updatedExperience
    });
    resetForm();
  };

  const handleEdit = (index: number) => {
    setCurrentExperience({
      ...data.workExperience[index],
      achievements: data.workExperience[index].achievements.length > 0 
        ? data.workExperience[index].achievements 
        : [""]
    });
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index: number) => {
    const updatedExperience = data.workExperience.filter((_, i) => i !== index);
    updateData({
      ...data,
      workExperience: updatedExperience
    });
  };

  const addAchievement = () => {
    setCurrentExperience({
      ...currentExperience,
      achievements: [...currentExperience.achievements, ""]
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const updatedAchievements = [...currentExperience.achievements];
    updatedAchievements[index] = value;
    setCurrentExperience({
      ...currentExperience,
      achievements: updatedAchievements
    });
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = currentExperience.achievements.filter((_, i) => i !== index);
    setCurrentExperience({
      ...currentExperience,
      achievements: updatedAchievements.length > 0 ? updatedAchievements : [""]
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Share your professional journey! Even internships and part-time work count. 💼
        </p>
      </div>

      {/* Existing Experience */}
      {data.workExperience.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Your Work Experience</h3>
          {data.workExperience.map((exp, index) => (
            <Card key={index} className="border-purple-100">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">{exp.jobTitle}</CardTitle>
                    <p className="text-purple-600 font-medium">{exp.companyName}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">Key Achievements:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding ? (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {editingIndex !== null ? "Edit Experience" : "Add Work Experience"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  value={currentExperience.jobTitle}
                  onChange={(e) => setCurrentExperience({...currentExperience, jobTitle: e.target.value})}
                  placeholder="e.g., Software Engineer"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={currentExperience.companyName}
                  onChange={(e) => setCurrentExperience({...currentExperience, companyName: e.target.value})}
                  placeholder="e.g., Tech Innovators Inc."
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location</Label>
              <Input
                id="location"
                value={currentExperience.location}
                onChange={(e) => setCurrentExperience({...currentExperience, location: e.target.value})}
                placeholder="e.g., San Francisco, CA"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="month"
                  value={currentExperience.startDate}
                  onChange={(e) => setCurrentExperience({...currentExperience, startDate: e.target.value})}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-gray-700">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={currentExperience.endDate}
                  onChange={(e) => setCurrentExperience({...currentExperience, endDate: e.target.value})}
                  disabled={currentExperience.currentlyWorking}
                  className="border-purple-200 focus:border-purple-400"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="currentlyWorking"
                    checked={currentExperience.currentlyWorking}
                    onCheckedChange={(checked) => 
                      setCurrentExperience({
                        ...currentExperience, 
                        currentlyWorking: checked as boolean,
                        endDate: checked ? "" : currentExperience.endDate
                      })
                    }
                  />
                  <Label htmlFor="currentlyWorking" className="text-sm text-gray-600">
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">
                Role Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={currentExperience.description}
                onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
                placeholder="Describe your main responsibilities and what you accomplished in this role..."
                className="border-purple-200 focus:border-purple-400"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700">Key Achievements (Optional)</Label>
              {currentExperience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    placeholder="e.g., Increased team productivity by 25%"
                    className="border-purple-200 focus:border-purple-400"
                  />
                  {currentExperience.achievements.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addAchievement}
                className="text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={!currentExperience.jobTitle || !currentExperience.companyName || !currentExperience.startDate || !currentExperience.description}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingIndex !== null ? "Update Experience" : "Save Experience"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="outline"
          className="w-full border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 py-8"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Work Experience
        </Button>
      )}

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700 text-sm">
          🌟 <strong>Great job!</strong> Each experience you add makes your profile more attractive to recruiters.
        </p>
      </div>
    </div>
  );
};

export default WorkExperienceStep;
