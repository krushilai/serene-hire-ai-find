import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, FolderOpen, X } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface ProjectsStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const ProjectsStep = ({ data, updateData }: ProjectsStepProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: [] as string[]
  });
  const [newTechnology, setNewTechnology] = useState("");

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      technologies: []
    });
    setNewTechnology("");
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSave = () => {
    let updatedProjects;
    if (editingIndex !== null) {
      updatedProjects = [...data.projects];
      updatedProjects[editingIndex] = currentProject;
    } else {
      updatedProjects = [...data.projects, currentProject];
    }

    updateData({
      ...data,
      projects: updatedProjects
    });
    resetForm();
  };

  const handleEdit = (index: number) => {
    setCurrentProject(data.projects[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== index);
    updateData({
      ...data,
      projects: updatedProjects
    });
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !currentProject.technologies.includes(newTechnology.trim())) {
      setCurrentProject({
        ...currentProject,
        technologies: [...currentProject.technologies, newTechnology.trim()]
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies.filter(tech => tech !== techToRemove)
    });
  };

  const popularTechnologies = [
    "React", "JavaScript", "Python", "Node.js", "HTML/CSS", "Java", "SQL",
    "MongoDB", "Express.js", "Vue.js", "Angular", "TypeScript", "Docker",
    "AWS", "Git", "REST API", "GraphQL", "Machine Learning", "Data Analysis"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showcase your best work! Projects demonstrate your skills in action. 🚀
        </p>
      </div>

      {/* Existing Projects */}
      {data.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Your Projects</h3>
          {data.projects.map((project, index) => (
            <Card key={index} className="border-purple-100">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800 mb-2">{project.title}</CardTitle>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
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
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding ? (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              {editingIndex !== null ? "Edit Project" : "Add Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle" className="text-gray-700">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectTitle"
                value={currentProject.title}
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                placeholder="e.g., E-commerce Web App, Data Analysis Dashboard"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription" className="text-gray-700">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="projectDescription"
                value={currentProject.description}
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                placeholder="Describe what the project does, the problem it solves, and your role in building it..."
                className="border-purple-200 focus:border-purple-400"
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700">Technologies Used</Label>
              
              {/* Add Technology Input */}
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology..."
                  className="border-purple-200 focus:border-purple-400"
                  onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                />
                <Button
                  onClick={addTechnology}
                  disabled={!newTechnology.trim()}
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Selected Technologies */}
              {currentProject.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Popular Technologies */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Popular technologies (click to add):</p>
                <div className="flex flex-wrap gap-2">
                  {popularTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!currentProject.technologies.includes(tech)) {
                          setCurrentProject({
                            ...currentProject,
                            technologies: [...currentProject.technologies, tech]
                          });
                        }
                      }}
                      disabled={currentProject.technologies.includes(tech)}
                      className="text-xs hover:bg-purple-50 hover:border-purple-300"
                    >
                      {tech}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={!currentProject.title || !currentProject.description}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {editingIndex !== null ? "Update Project" : "Save Project"}
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
          Add Project
        </Button>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700 text-sm">
          ✨ <strong>Optional but powerful:</strong> Projects are often the first thing recruiters look at to understand your practical skills!
        </p>
      </div>
    </div>
  );
};

export default ProjectsStep;
