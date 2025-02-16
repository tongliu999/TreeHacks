import type { CourseInfo } from "~/queries/queries";

export default function SavedCourseCard({ course }: { course: CourseInfo }) {
  return (
    <div className="p-4 flex flex-col gap-2 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <strong className="font-semibold">{course.title}</strong>
        <em className="italic text-[#9E9E9E]">{course.credits} credit(s)</em>
      </div>
      <p className="text-[#9E9E9E]">{course.code}</p>
    </div>
  );
}
