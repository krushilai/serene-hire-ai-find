
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ProfileData } from "@/pages/ProfileBuilder";

interface BasicInfoStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const BasicInfoStep = ({ data, updateData }: BasicInfoStepProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData({
      ...data,
      basicInfo: {
        ...data.basicInfo,
        [field]: value
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateData({
        ...data,
        basicInfo: {
          ...data.basicInfo,
          profilePicture: file
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Let's start with some basic information about you. Don't worry, you can always update these later! ✨
        </p>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center bg-purple-50 hover:border-purple-400 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="profile-picture"
            />
            <div className="text-center">
              <Upload className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <span className="text-xs text-purple-600">Add Photo</span>
            </div>
          </div>
          {data.basicInfo.profilePicture && (
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            value={data.basicInfo.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="e.g., Sarah Johnson"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.basicInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="sarah.johnson@email.com"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.basicInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="border-purple-200 focus:border-purple-400"
          />
          <p className="text-xs text-gray-500">Optional - helps recruiters reach you faster</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-700">
            Current Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            value={data.basicInfo.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="San Francisco, CA, USA"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinUrl" className="text-gray-700">
          LinkedIn Profile URL
        </Label>
        <Input
          id="linkedinUrl"
          type="url"
          value={data.basicInfo.linkedinUrl}
          onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
          placeholder="https://linkedin.com/in/your-profile"
          className="border-purple-200 focus:border-purple-400"
        />
        <p className="text-xs text-gray-500">Optional - adds credibility to your profile</p>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <p className="text-purple-700 text-sm">
          💡 <strong>Pro tip:</strong> A complete basic profile gets 3x more recruiter views!
        </p>
      </div>
    </div>
  );
};

export default BasicInfoStep;
