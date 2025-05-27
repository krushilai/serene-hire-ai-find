
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Mail, 
  MapPin, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Phone
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CandidateDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Mock candidate data - in real app, fetch by ID
  const candidate = {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Data Scientist",
    location: "San Francisco, CA",
    experience: "5 years",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch", "AWS", "Data Visualization"],
    avatar: "/placeholder.svg",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    summary: "Passionate data scientist with 5+ years of experience building ML solutions for fintech companies. Led teams of 3-5 data scientists and delivered models that increased revenue by 25%. Looking for senior IC or team lead opportunities.",
    match: 95,
    experience_details: [
      {
        company: "TechCorp Financial",
        role: "Senior Data Scientist",
        duration: "2021 - Present",
        description: "Lead ML initiatives for fraud detection and risk assessment. Built ensemble models that reduced false positives by 40%."
      },
      {
        company: "DataSolutions Inc",
        role: "Data Scientist",
        duration: "2019 - 2021",
        description: "Developed recommendation systems and customer segmentation models. Collaborated with product teams to implement A/B testing frameworks."
      }
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        year: "2019"
      },
      {
        degree: "B.S. Mathematics",
        school: "UC Berkeley",
        year: "2017"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            <div className="text-2xl font-bold text-gray-800">TalentFlow</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 shadow-lg border-purple-100">
          <CardContent className="p-8">
            <div className="flex items-start gap-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={candidate.avatar} />
                <AvatarFallback className="text-2xl">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {candidate.name}
                    </h1>
                    <p className="text-xl text-purple-600 font-medium mb-2">
                      {candidate.title}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {candidate.experience} experience
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-base px-3 py-1">
                      {candidate.match}% match
                    </Badge>
                    <Button
                      variant={isSaved ? "default" : "outline"}
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? "bg-yellow-500 hover:bg-yellow-600" : "border-purple-200"}
                    >
                      <Star className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {candidate.summary}
                </p>
                
                <div className="flex gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Sarah
                  </Button>
                  <Button variant="outline" className="border-purple-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button variant="outline" className="border-purple-200">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {candidate.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline"
                      className="border-purple-200 text-purple-700 text-base px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.experience_details.map((exp, index) => (
                  <div key={index} className="border-l-2 border-purple-200 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-2 top-2"></div>
                    <h3 className="font-semibold text-gray-900 text-lg">{exp.role}</h3>
                    <p className="text-purple-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-green-200 pl-6 relative">
                    <div className="absolute w-3 h-3 bg-green-600 rounded-full -left-2 top-2"></div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-green-600 font-medium">{edu.school}</p>
                    <p className="text-gray-500 text-sm">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{candidate.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Your Notes</CardTitle>
                <CardDescription>
                  Add private notes about this candidate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Great cultural fit for the team, strong technical background..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] border-purple-200"
                />
                <Button className="mt-3 w-full bg-purple-600 hover:bg-purple-700">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                  Add to Shortlist
                </Button>
                <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
                  Share with Team
                </Button>
                <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-50">
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
