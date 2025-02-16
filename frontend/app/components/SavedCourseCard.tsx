import { CARD_BORDER_COLOURS } from "~/constants";
import type { CourseInfo } from "~/queries/queries";

export default function SavedCourseCard({
  course,
  i,
  onDelete,
}: {
  course: CourseInfo;
  i: number;
  onDelete?: () => void;
}) {
  const bgColor = CARD_BORDER_COLOURS[i % CARD_BORDER_COLOURS.length];
  return (
    <div
      className="p-4 flex flex-col gap-1 bg-white rounded-lg w-full h-[5.25rem]"
      style={{
        borderColor: bgColor,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <div className="flex justify-between items-center h-full">
        <strong className="font-semibold">{course.title}</strong>
        <em className="italic text-[#9E9E9E]">{course.credits} credit(s)</em>
      </div>
      <p className="text-[#9E9E9E] flex justify-between items-center">
        <p>{course.code}</p>
        {onDelete && (
          <button
            type="button"
            className="text-red-500 text-lg hover:cursor-pointer"
            onClick={onDelete}
          >
            ×
          </button>
        )}
      </p>
    </div>
  );
}
