
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">TalentFlow</div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")} className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Discover amazing talent with
          <span className="text-purple-600 block mt-2">confidence and care</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          A recruiting platform that puts humanity first. Connect with candidates naturally, 
          make informed decisions with AI assistance, and build teams that thrive.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            onClick={() => navigate("/signup")}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
          >
            Start Hiring Better
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/candidate-signup")}
            className="text-lg px-8 py-6 border-purple-200 hover:bg-purple-50"
          >
            I'm a Candidate
          </Button>
        </div>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Search className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Smart Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Find the perfect candidates using natural language search and intelligent filters. 
                No more endless scrolling through irrelevant profiles.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Human-Centered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                See the whole person, not just a resume. Rich profiles showcase skills, 
                personality, and potential in an engaging, visual format.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Collaborative</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Share insights, build shortlists, and make decisions together. 
                Keep your team aligned throughout the entire hiring process.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Trusted by 1000+ companies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Privacy-first approach</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>GDPR compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <div className="text-2xl font-bold text-gray-800 mb-4">TalentFlow</div>
          <p>Making hiring more human, one connection at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
