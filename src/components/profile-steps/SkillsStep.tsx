
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface SkillsStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const SkillsStep = ({ data, updateData }: SkillsStepProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [newProficiency, setNewProficiency] = useState("");

  const popularSkills = [
    "JavaScript", "Python", "React", "Node.js", "Java", "SQL", "AWS", "Docker",
    "Project Management", "Data Analysis", "Marketing", "UI/UX Design", "Sales",
    "Communication", "Leadership", "Problem Solving", "Team Management"
  ];

  const addSkill = () => {
    if (newSkill.trim() && newProficiency) {
      const updatedSkills = [...data.skills, {
        name: newSkill.trim(),
        proficiency: newProficiency
      }];
      updateData({
        ...data,
        skills: updatedSkills
      });
      setNewSkill("");
      setNewProficiency("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    updateData({
      ...data,
      skills: updatedSkills
    });
  };

  const addPopularSkill = (skillName: string) => {
    if (!data.skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const updatedSkills = [...data.skills, {
        name: skillName,
        proficiency: "Intermediate"
      }];
      updateData({
        ...data,
        skills: updatedSkills
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showcase your expertise! Add skills that make you stand out. 🚀
        </p>
      </div>

      {/* Add New Skill */}
      <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-medium text-gray-800">Add a Skill</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="skillName" className="text-gray-700">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g., React, Project Management"
              className="border-purple-200 focus:border-purple-400"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>
          <div>
            <Label className="text-gray-700">Proficiency Level</Label>
            <Select value={newProficiency} onValueChange={setNewProficiency}>
              <SelectTrigger className="border-purple-200">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={addSkill}
          disabled={!newSkill.trim() || !newProficiency}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Current Skills */}
      {data.skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800"
              >
                <span>{skill.name}</span>
                <span className="text-xs opacity-75">({skill.proficiency})</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Popular Skills */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-800">Popular Skills (Click to add)</h3>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <Button
              key={skill}
              variant="outline"
              size="sm"
              onClick={() => addPopularSkill(skill)}
              disabled={data.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
              className="text-xs hover:bg-purple-50 hover:border-purple-300"
            >
              <Plus className="w-3 h-3 mr-1" />
              {skill}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 <strong>Pro tip:</strong> Include both technical and soft skills. Aim for 5-10 skills that best represent your expertise!
        </p>
      </div>
    </div>
  );
};

export default SkillsStep;
