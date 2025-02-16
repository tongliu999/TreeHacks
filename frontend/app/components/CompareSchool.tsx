import { useSavedCourseListQuery } from "~/queries/queries";
import Container from "./Container";
import { useState } from "react";
import BlankCourseCard from "./BlankCourseCard";
import SavedDropdownCourseCard from "./SavedDropdownCourseCard";
import { NUM_COURSES, UNIVERSITY_LIST } from "~/constants";
import EmailPopup from "./EmailPopup";
interface CompareSchoolProps {
  hostSchool: string;
  hostCourseCodes: string[];
  onClose?: () => void;
}
export default function CompareSchool({
  hostSchool,
  hostCourseCodes,
  onClose,
}: CompareSchoolProps) {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const {
    data: courseData,
    isLoading: courseIsLoading,
    error: courseError,
  } = useSavedCourseListQuery({
    school: selectedSchool,
  });

  const remainingCourses = Array.from(
    { length: Math.max(0, NUM_COURSES - (hostCourseCodes?.length ?? 0)) },
    (_, i) => i
  );

  return (
    <Container className="items-start gap-2.5 min-w-[30vw]">
      <h1
        style={{
          fontSize: "24px",
        }}
        className="flex justify-between w-full"
      >
        <span>Choose school</span>
        <button onClick={onClose} className="hover:cursor-pointer text-red-600">
          ×
        </button>
      </h1>
      <select
        className="p-3 border rounded-lg w-full text-gray-500 border-gray-300"
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}
      >
        <option value="">Choose school</option>
        {UNIVERSITY_LIST.map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>
      <button
        className="cta-button w-full"
        onClick={() => setShowEmailPopup(true)}
      >
        Generate Email Template
      </button>
      {showEmailPopup && (
        <EmailPopup
          subject={`Course equivalence request for ${selectedSchool}`}
          body={`Dear Academic Advisor,

I am writing to request course equivalence approval for the following courses at ${selectedSchool}:

${hostCourseCodes.join('\n')}

Thank you for your time.

Best regards,`}
          onClose={() => setShowEmailPopup(false)}
        />
      )}
      <div className="flex flex-col w-full gap-4">
        {hostCourseCodes.map((course, i) => (
          <SavedDropdownCourseCard
            hostCourseCode={course}
            key={course}
            i={i}
            hostSchool={hostSchool}
            abroadSchool={selectedSchool}
          />
        ))}
        {remainingCourses.map((i) => (
          <BlankCourseCard key={i} />
        ))}
      </div>
    </Container>
  );
}
