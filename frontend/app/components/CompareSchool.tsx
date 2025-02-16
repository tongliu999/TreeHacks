import {
  useSavedCourseListQuery,
  useUniversitiesQuery,
} from "~/queries/queries";
import Container from "./Container";
import { useState } from "react";
import SavedCourseCard from "./SavedCourseCard";
import BlankCourseCard from "./BlankCourseCard";

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

  const { data, isLoading, error } = useUniversitiesQuery();
  const {
    data: courseData,
    isLoading: courseIsLoading,
    error: courseError,
  } = useSavedCourseListQuery({
    school: selectedSchool,
  });

  const remainingCourses = Array.from(
    { length: Math.max(0, 6 - (courseData?.length ?? 0)) },
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
        className="p-3 border rounded-lg w-full text-gray-400 border-gray-300"
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}
      >
        <option value="">Choose school</option>
        {data?.map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>
      <div className="flex flex-col w-full gap-4">
        {courseData?.map((course, i) => (
          <SavedCourseCard course={course} key={course.code} i={i} />
        ))}
        {remainingCourses.map((i) => (
          <BlankCourseCard key={i} />
        ))}
      </div>
    </Container>
  );
}
