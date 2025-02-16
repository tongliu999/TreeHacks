import { useEffect, useState } from "react";
import { CARD_BORDER_COLOURS, RATING_COLOUR_BOUNDARIES } from "~/constants";
import { useAbroadQuery, type CourseInfo } from "~/queries/queries";
import IconLoading from "~/assets/icon-loading.svg?react";
import IconStar from "~/assets/icon-star.svg?react";

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

  useEffect(() => {
    setSelectedCourse(data?.[0] ?? null);
  }, [data]);

  return (
    <label
      className={`p-4 pr-2 flex relative items-center justify-center gap-6 rounded-lg w-full h-[5.25rem] ${
        isLoading ? "animate-pulse" : ""
      }`}
      style={{
        borderColor: bgColor,
        borderWidth: "2px",
        borderStyle: "solid",
        background: isLoading || !data ? "#F3F4F6" : "white",
      }}
    >
      <select
        className="absolute inset-0 opacity-0 w-full h-full"
        value={(selectedCourse?.code || data?.[0]?.code) ?? ""}
      >
        {data?.map((course) => (
          <option
            key={course.code}
            value={course.code}
            onClick={() => setSelectedCourse(course)}
          >
            {course.is_bookmarked && "⭐"} {course.title} ({course.code})
          </option>
        ))}
      </select>
      {isLoading && <IconLoading style={{ color: "black" }} />}
      {!isLoading && data?.length && !error ? (
        <>
          <div className="flex gap-1 w-full">
            <div className="flex gap-1 flex-col w-full h-full">
              <div className="flex justify-between items-center h-full">
                <strong className="font-semibold flex gap-2">
                  {selectedCourse?.title}
                  {selectedCourse?.is_bookmarked && (
                    <IconStar className="w-5 h-5 fill-yellow-500" />
                  )}
                  {selectedCourse?.rating && (
                    <span
                      className="font-semibold"
                      style={{
                        color: findRatingColor(selectedCourse.rating),
                      }}
                    >
                      {selectedCourse.rating}
                    </span>
                  )}
                </strong>
                <em className="italic text-[#9E9E9E]">
                  {selectedCourse?.credits} credit(s)
                </em>
              </div>
              <p className="text-[#9E9E9E]">{selectedCourse?.code}</p>
            </div>
            <div>▼</div>
          </div>
        </>
      ) : (
        !isLoading && <p className="italic">No course equivalencies found</p>
      )}
    </label>
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
