
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Upload, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfilePreview from "@/components/ProfilePreview";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file.name, file.size);
    }
  };

  const handleChooseFileClick = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically upload the file to your backend
      console.log("Uploading file:", selectedFile.name);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">TalentFlow</div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Avatar>
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your profile! 🌟
          </h1>
          <p className="text-gray-600 text-lg">
            Let's showcase your amazing skills and help you get discovered by top recruiters.
          </p>
        </div>

        {/* Profile Setup Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Upload className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Upload Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4 text-center">
                Upload your resume and let AI extract your skills and experience
              </CardDescription>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upload Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-gray-800">Upload Your Resume</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Choose a PDF or Word document from your device. We'll help extract your skills and experience automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                      <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">Drop your resume here or click to browse</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resume-upload"
                      />
                      <Button 
                        variant="outline" 
                        className="cursor-pointer"
                        onClick={handleChooseFileClick}
                        type="button"
                      >
                        Choose File
                      </Button>
                    </div>
                    
                    {selectedFile && (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-700">
                          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleUpload} 
                        disabled={!selectedFile}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Upload Resume
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-100 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Edit className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Build Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4 text-center">
                Create a rich profile that showcases your personality and potential
              </CardDescription>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/profile-builder")}
              >
                Build Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-blue-100 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Preview Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4 text-center">
                See how recruiters will view your profile and make adjustments
              </CardDescription>
              <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Preview Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-gray-800">Profile Preview</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      This is how your profile appears to recruiters
                    </DialogDescription>
                  </DialogHeader>
                  <ProfilePreview />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Profile Status */}
        <Card className="shadow-lg border-purple-100 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Your Profile Status</CardTitle>
            <CardDescription className="text-gray-600">
              Complete these steps to increase your visibility to recruiters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Basic Information</span>
                </div>
                <Badge variant="outline" className="border-red-200 text-red-600">
                  Incomplete
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Skills & Experience</span>
                </div>
                <Badge variant="outline" className="border-red-200 text-red-600">
                  Incomplete
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-700">Portfolio/Projects</span>
                </div>
                <Badge variant="outline" className="border-red-200 text-red-600">
                  Incomplete
                </Badge>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-700 text-sm">
                💡 Complete your profile to appear in recruiter searches and get discovered by amazing companies!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Encouragement Section */}
        <Card className="shadow-lg border-green-100">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              You're on your way to great opportunities! 🚀
            </h3>
            <p className="text-gray-600 mb-4">
              Take your time to build a profile that truly represents you. Quality over speed always wins.
            </p>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/profile-builder")}
            >
              Continue Building Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboard;
