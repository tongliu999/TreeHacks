import type { CourseInfo } from "~/queries/queries";
import { CARD_COLOURS, RATING_COLOUR_BOUNDARIES } from "~/constants";
import LogoBookmark from "~/assets/logo-bookmark.svg?react";

interface CourseCardProps {
  course: CourseInfo;
  colorIdx: number;
  isBookmarked?: boolean;
  onBookmark?: (code: CourseInfo) => void;
}
export default function CourseCard({
  course,
  colorIdx,
  isBookmarked,
  onBookmark,
}: CourseCardProps) {
  const { code, title, credits, description, rating } = course;
  const bgColor = CARD_COLOURS[colorIdx % CARD_COLOURS.length];
  return (
    <div
      className="flex flex-col w-full p-4 gap-0.25 rounded rounded-lg"
      style={{
        background: bgColor,
      }}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          {rating && (
            <span
              className="font-semibold"
              style={{
                color: findRatingColor(rating),
              }}
            >
              {rating}
            </span>
          )}
          <strong className="font-semibold">{title}</strong>
          <span className="text-[#9E9E9E] italic">
            <em>{credits || 0} credit(s)</em>
          </span>
        </div>
        <div>
          <button className="flex gap-2" onClick={() => onBookmark?.(course)}>
            <LogoBookmark
              className={`text-black hover:cursor-pointer ${
                isBookmarked ? "fill-current" : "hover:fill-[#9E9E9E]"
              }`}
            />
            </button>
        </div>
      </div>
      <p className="text-[#9E9E9E]">{code}</p>
      <p className="flex-wrap">{description}</p>
    </div>
  );
}

const findRatingColor = (rating: number) => {
  for (const [maxRating, color] of RATING_COLOUR_BOUNDARIES) {
    if (rating <= maxRating) {
      return color;
    }
  }
  return "#000000";
};
