
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, User, Bookmark, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Data Scientist",
      location: "San Francisco, CA",
      experience: "5 years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      avatar: "/placeholder.svg",
      summary: "Passionate data scientist with expertise in ML and AI solutions for fintech",
      match: 95
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Full Stack Developer",
      location: "Austin, TX",
      experience: "3 years",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      avatar: "/placeholder.svg",
      summary: "Creative developer building scalable web applications with modern tech",
      match: 88
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "UX Designer",
      location: "Remote",
      experience: "4 years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      avatar: "/placeholder.svg",
      summary: "User-centered designer creating intuitive digital experiences",
      match: 82
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">TalentFlow</div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/shortlist")}>
                <Bookmark className="w-4 h-4 mr-2" />
                Shortlist
              </Button>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to discover your next great hire? Let's find them together.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Find Your Perfect Candidate
            </CardTitle>
            <CardDescription className="text-gray-600">
              Describe what you're looking for in natural language, or use our smart filters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Try: 'Show me senior developers with React experience in California'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-base border-purple-200 focus:border-purple-400"
                />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="border-purple-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid md:grid-cols-4 gap-4 p-4 bg-purple-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Experience</label>
                  <select className="w-full p-2 border border-purple-200 rounded-md">
                    <option>Any</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                  <select className="w-full p-2 border border-purple-200 rounded-md">
                    <option>Any</option>
                    <option>Remote</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                  <select className="w-full p-2 border border-purple-200 rounded-md">
                    <option>Any</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Data Scientist</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
                  <Input placeholder="e.g. React, Python" className="border-purple-200" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Here are some amazing candidates for you ✨
            </h2>
            <div className="text-gray-600">
              {candidates.length} matches found
            </div>
          </div>

          <div className="grid gap-6">
            {candidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className="shadow-lg hover:shadow-xl transition-shadow border-purple-100 cursor-pointer"
                onClick={() => navigate(`/candidate/${candidate.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback className="text-lg">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {candidate.name}
                          </h3>
                          <p className="text-purple-600 font-medium">{candidate.title}</p>
                          <p className="text-gray-500 text-sm">
                            {candidate.location} • {candidate.experience} experience
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {candidate.match}% match
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{candidate.summary}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="outline"
                            className="border-purple-200 text-purple-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/candidate/${candidate.id}`);
                          }}
                        >
                          View Profile
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-purple-200 hover:bg-purple-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
