import type { CourseInfo } from "~/queries/queries";
import Container from "./Container";
import SavedCourseCard from "./SavedCourseCard";

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
  return (
    <Container>
      <h1>{school ?? "No school selected"}</h1>
      <h2>My saved courses</h2>
      <div>
        {courses.map((course) => (
          <SavedCourseCard course={course} key={course.code} />
        ))}
        {courses.length === 0 && (
          <p className="text-[#9E9E9E]">No saved courses</p>
        )}
      </div>
    </Container>
  );
}
