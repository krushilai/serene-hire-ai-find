
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/pages/ProfileBuilder";

interface ProfessionalSummaryStepProps {
  data: ProfileData;
  updateData: (data: ProfileData) => void;
}

const ProfessionalSummaryStep = ({ data, updateData }: ProfessionalSummaryStepProps) => {
  const handleSummaryChange = (value: string) => {
    updateData({
      ...data,
      professionalSummary: value
    });
  };

  const exampleSummaries = [
    "Experienced software engineer with 5+ years developing scalable web applications. Passionate about clean code and user experience.",
    "Marketing professional specializing in digital campaigns that drive growth. Proven track record of increasing conversion rates by 40%+.",
    "Data scientist with expertise in machine learning and statistical analysis. Love turning complex data into actionable business insights."
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Tell recruiters what makes you unique! This is your elevator pitch. ✨
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-gray-700">
          Professional Summary <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="summary"
          value={data.professionalSummary}
          onChange={(e) => handleSummaryChange(e.target.value)}
          placeholder="Tell us about your core experience, key skills, and what you're passionate about..."
          className="border-purple-200 focus:border-purple-400 min-h-[120px]"
          maxLength={500}
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Aim for 2-3 sentences that capture your essence
          </p>
          <span className="text-xs text-gray-400">
            {data.professionalSummary.length}/500
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Need inspiration? Here are some examples:</h3>
        <div className="space-y-3">
          {exampleSummaries.map((example, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-300 cursor-pointer hover:bg-purple-50 transition-colors"
              onClick={() => handleSummaryChange(example)}
            >
              <p className="text-sm text-gray-700 italic">"{example}"</p>
              <p className="text-xs text-purple-600 mt-1">Click to use this example</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700 text-sm">
          🎯 <strong>Remember:</strong> Focus on your unique value proposition and what excites you about your work!
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryStep;
