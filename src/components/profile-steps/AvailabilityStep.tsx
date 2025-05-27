
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileData } from "@/pages/ProfileBuilder";

interface AvailabilityStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const AvailabilityStep = ({ data, updateData }: AvailabilityStepProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData({
      ...data,
      availability: {
        ...data.availability,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Help recruiters understand your availability and preferences! 📅
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="noticePeriod" className="text-gray-700">
            Notice Period
          </Label>
          <Select 
            value={data.availability.noticePeriod} 
            onValueChange={(value) => handleInputChange("noticePeriod", value)}
          >
            <SelectTrigger className="border-purple-200">
              <SelectValue placeholder="Select notice period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Available immediately</SelectItem>
              <SelectItem value="1-week">1 week</SelectItem>
              <SelectItem value="2-weeks">2 weeks</SelectItem>
              <SelectItem value="1-month">1 month</SelectItem>
              <SelectItem value="2-months">2 months</SelectItem>
              <SelectItem value="3-months">3 months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">When can you start a new role?</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workType" className="text-gray-700">
            Preferred Work Type
          </Label>
          <Select 
            value={data.availability.workType} 
            onValueChange={(value) => handleInputChange("workType", value)}
          >
            <SelectTrigger className="border-purple-200">
              <SelectValue placeholder="Select work type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote only</SelectItem>
              <SelectItem value="onsite">On-site only</SelectItem>
              <SelectItem value="hybrid">Hybrid (mix of remote/on-site)</SelectItem>
              <SelectItem value="flexible">Flexible - open to all</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">What's your ideal work setup?</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="willingToRelocate" className="text-gray-700">
          Willingness to Relocate
        </Label>
        <Select 
          value={data.availability.willingToRelocate} 
          onValueChange={(value) => handleInputChange("willingToRelocate", value)}
        >
          <SelectTrigger className="border-purple-200">
            <SelectValue placeholder="Select relocation preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes, I'm open to relocating</SelectItem>
            <SelectItem value="no">No, I prefer to stay in my current location</SelectItem>
            <SelectItem value="depends">Depends on the opportunity</SelectItem>
            <SelectItem value="specific-locations">Only to specific locations</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">Are you open to moving for the right opportunity?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredRoles" className="text-gray-700">
          Preferred Roles or Industries
        </Label>
        <Textarea
          id="preferredRoles"
          value={data.availability.preferredRoles}
          onChange={(e) => handleInputChange("preferredRoles", e.target.value)}
          placeholder="e.g., Software Engineer, Data Scientist, Product Manager in fintech or healthcare..."
          className="border-purple-200 focus:border-purple-400"
          rows={3}
        />
        <p className="text-xs text-gray-500">What types of roles or industries interest you most?</p>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700 text-sm">
          🎯 <strong>Almost done!</strong> These preferences help us match you with the most relevant opportunities.
        </p>
      </div>
    </div>
  );
};

export default AvailabilityStep;
