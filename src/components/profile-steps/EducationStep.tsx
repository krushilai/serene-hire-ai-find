import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, GraduationCap } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface EducationStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const EducationStep = ({ data, updateData }: EducationStepProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
    description: ""
  });

  const resetForm = () => {
    setCurrentEducation({
      degree: "",
      institution: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      description: ""
    });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSave = () => {
    let updatedEducation;
    if (editingIndex !== null) {
      updatedEducation = [...data.education];
      updatedEducation[editingIndex] = currentEducation;
    } else {
      updatedEducation = [...data.education, currentEducation];
    }

    updateData({
      ...data,
      education: updatedEducation
    });
    resetForm();
  };

  const handleEdit = (index: number) => {
    setCurrentEducation(data.education[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    updateData({
      ...data,
      education: updatedEducation
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Share your educational background! Include degrees, certifications, and relevant courses. 🎓
        </p>
      </div>

      {/* Existing Education */}
      {data.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Your Education</h3>
          {data.education.map((edu, index) => (
            <Card key={index} className="border-purple-100">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">{edu.degree}</CardTitle>
                    <p className="text-purple-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.fieldOfStudy && `${edu.fieldOfStudy} • `}
                      {edu.startYear} - {edu.endYear}
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
              {edu.description && (
                <CardContent>
                  <p className="text-gray-700">{edu.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding ? (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {editingIndex !== null ? "Edit Education" : "Add Education"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree" className="text-gray-700">
                  Degree/Certification <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="degree"
                  value={currentEducation.degree}
                  onChange={(e) => setCurrentEducation({...currentEducation, degree: e.target.value})}
                  placeholder="e.g., Bachelor of Science, MBA, Google Analytics Certified"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-gray-700">
                  Institution <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="institution"
                  value={currentEducation.institution}
                  onChange={(e) => setCurrentEducation({...currentEducation, institution: e.target.value})}
                  placeholder="e.g., Stanford University, Coursera, Udemy"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy" className="text-gray-700">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={currentEducation.fieldOfStudy}
                onChange={(e) => setCurrentEducation({...currentEducation, fieldOfStudy: e.target.value})}
                placeholder="e.g., Computer Science, Business Administration"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startYear" className="text-gray-700">
                  Start Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startYear"
                  type="number"
                  min="1950"
                  max="2030"
                  value={currentEducation.startYear}
                  onChange={(e) => setCurrentEducation({...currentEducation, startYear: e.target.value})}
                  placeholder="2020"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endYear" className="text-gray-700">
                  End Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="endYear"
                  type="number"
                  min="1950"
                  max="2030"
                  value={currentEducation.endYear}
                  onChange={(e) => setCurrentEducation({...currentEducation, endYear: e.target.value})}
                  placeholder="2024"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={currentEducation.description}
                onChange={(e) => setCurrentEducation({...currentEducation, description: e.target.value})}
                placeholder="Relevant coursework, achievements, or additional details..."
                className="border-purple-200 focus:border-purple-400"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={!currentEducation.degree || !currentEducation.institution || !currentEducation.startYear || !currentEducation.endYear}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingIndex !== null ? "Update Education" : "Save Education"}
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
          Add Education
        </Button>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 <strong>Include everything relevant:</strong> Traditional degrees, online courses, bootcamps, and certifications all count!
        </p>
      </div>
    </div>
  );
};

export default EducationStep;
