import type { CourseInfo } from "~/queries/queries";
import Container from "./Container";
import SavedCourseCard from "./SavedCourseCard";
import BlankCourseCard from "./BlankCourseCard";

interface SavedCourseListProps {
  courses: CourseInfo[];
  school: string | null | undefined;
  isLoading?: boolean;
}
export default function SavedCourseList({
  courses,
  school,
  isLoading,
}: SavedCourseListProps) {
  const remainingCourses = Array.from(
    { length: Math.max(0, 6 - courses.length) },
    (_, i) => i
  );
  return (
    <Container className="items-start gap-2 min-w-[30vw]">
      <h1>{school ?? "No school selected"}</h1>
      <h2>My saved courses</h2>
      <div className="flex-col flex w-full gap-4 pt-2">
        {courses.map((course, i) => (
          <SavedCourseCard course={course} key={course.code} i={i} />
        ))}
        {remainingCourses.map((i) => (
          <BlankCourseCard key={i} />
        ))}
        {courses.length === 0 && (
          <p className="text-[#9E9E9E]">No saved courses</p>
        )}
      </div>
    </Container>
  );
}
