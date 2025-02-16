import { useState } from "react";
import { CARD_BORDER_COLOURS } from "~/constants";
import { useAbroadQuery, type CourseInfo } from "~/queries/queries";

export default function SavedDropdownCourseCard({
  hostCourseCode,
  hostSchool,
  abroadSchool,
  i,
}: {
  hostCourseCode: string;
  hostSchool: string;
  abroadSchool: string;
  i: number;
}) {
  const bgColor = CARD_BORDER_COLOURS[i % CARD_BORDER_COLOURS.length];
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  const { data, isLoading, error } = useAbroadQuery({
    homeSchool: hostSchool,
    homeCourseCode: hostCourseCode,
    abroadSchool,
  });
  return (
    <select
      className="p-4 flex flex-col gap-1 bg-white rounded-lg w-full h-[5.25rem]"
      style={{
        borderColor: bgColor,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <div className="flex justify-between items-center h-full">
        <strong className="font-semibold">{selectedCourse?.title}</strong>
        <em className="italic text-[#9E9E9E]">
          {selectedCourse?.credits} credit(s)
        </em>
      </div>
      <p className="text-[#9E9E9E]">{selectedCourse?.code}</p>
      {data?.map((course) => (
        <option
          key={course.code}
          value={course.code}
          onClick={() => setSelectedCourse(course)}
        >
          {course.title}
        </option>
      ))}
    </select>
  );
}
