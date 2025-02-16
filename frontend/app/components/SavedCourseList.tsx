import type { CourseInfo } from "~/queries/queries";
import Container from "./Container";
import SavedCourseCard from "./SavedCourseCard";
import BlankCourseCard from "./BlankCourseCard";
import { NUM_COURSES } from "~/constants";
import { useContext } from "react";
import { Context } from "~/context";

interface SavedCourseListProps {
  courses: CourseInfo[];
  school: string | null | undefined;
  isLoading?: boolean;
  noText?: boolean;
  onCourseSelect?: (course: CourseInfo) => void;
}
export default function SavedCourseList({
  courses,
  school,
  isLoading,
  noText = false,
  onCourseSelect,
}: SavedCourseListProps) {
  const { state, setState } = useContext(Context);
  const remainingCourses = Array.from(
    { length: Math.max(0, NUM_COURSES - courses.length) },
    (_, i) => i
  );

  const deleteCourse = (course: CourseInfo) => {
    setState({
      ...state,
      homeCourses: state.homeCourses?.filter(
        ({ code }) => code !== course.code
      ),
    });
  };

  return (
    <Container className="items-start gap-2 min-w-[30vw]">
      {!noText && (
        <>
          <h1>{school ?? "No school selected"}</h1>
          <h2>My saved courses</h2>
        </>
      )}
      <div className="flex-col flex w-full gap-4 pt-2">
        {courses.map((course, i) => (
          <SavedCourseCard
            course={course}
            key={course.code}
            i={i}
            onDelete={() => deleteCourse(course)}
            onClick={() => onCourseSelect?.(course)}
          />
        ))}
        {remainingCourses.map((i) => (
          <BlankCourseCard key={i} />
        ))}
      </div>
    </Container>
  );
}
