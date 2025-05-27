
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"recruiter" | "candidate" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "recruiter") {
      navigate("/dashboard");
    } else {
      navigate("/candidate-profile");
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl shadow-xl border-purple-100">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl text-gray-800">Join TalentFlow</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              How would you like to get started?
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-purple-300"
              onClick={() => setUserType("recruiter")}
            >
              <CardHeader className="text-center">
                <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-800">I'm a Recruiter</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Find and connect with amazing candidates for your open positions
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-green-300"
              onClick={() => setUserType("candidate")}
            >
              <CardHeader className="text-center">
                <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-800">I'm a Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Showcase your skills and get discovered by top recruiters
                </CardDescription>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-purple-100">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl text-gray-700">
            {userType === "recruiter" ? "Create Recruiter Account" : "Create Candidate Profile"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {userType === "recruiter" 
              ? "Start discovering amazing talent today" 
              : "Show the world what you can do"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your name"
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>
            {userType === "recruiter" && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-700">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Your company name"
                  className="border-purple-200 focus:border-purple-400"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
