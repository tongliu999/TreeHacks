import { FormProvider, useForm } from "react-hook-form";
import Container from "./Container";
import { FormSelect } from "./form/FormInput";
import { useContext, useEffect, useState } from "react";
import { Context } from "~/context";
import LogoLeftArrow from "~/assets/logo-leftarrow.svg?react";
import { useAbroadQuery, addFavouriteEquivalence, removeFavouriteEquivalence } from "~/queries/queries";
import CourseCard from "./CourseCard";
import { UNIVERSITY_LIST } from "~/constants";
import IconLoading from "~/assets/icon-loading.svg?react";

interface TFormValues {
  abroadSchoolSearch: string;
}
export default function AbroadSearch() {
  const form = useForm<TFormValues>();
  const { state, setState } = useContext(Context);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>([]);

  const onSubmit = form.handleSubmit((data) => {
    setState({
      ...state,
      abroad: {
        school: data.abroadSchoolSearch,
      },
    });
  });

  const handleBookmark = async (courseCode: string, eqId: string) => {
    try {
      if (!bookmarkedCourses.includes(courseCode)) {
        await addFavouriteEquivalence(eqId, state.userId!);
      } else {
        await removeFavouriteEquivalence(eqId, state.userId!);
      }
      setBookmarkedCourses(prev => 
        prev.includes(courseCode)
          ? prev.filter(code => code !== courseCode)
          : [...prev, courseCode]
      );
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const { data, isLoading, error } = useAbroadQuery({
    homeSchool: state.home?.school,
    homeCourseCode: state.home?.courseCode,
    abroadSchool: state.abroad?.school,
  });

  useEffect(() => {
    if (data) {
      const initialBookmarkedCourses = data
        .filter(course => course.is_bookmarked)
        .map(course => course.code);
      setBookmarkedCourses(initialBookmarkedCourses);
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <Container
        className="flex-grow flex-col items-start h-full w-full"
        as="form"
        onSubmit={onSubmit}
      >
        <div className="flex gap-2 items-end w-full">
          <FormSelect
            name="abroadSchoolSearch"
            placeholder="School name"
            label="Which school are you going to attend?"
            options={UNIVERSITY_LIST}
            disabled={!state.home}
            containerProps={{
              className: "flex-grow",
            }}
          />
          <button
            type="submit"
            className="cta-button h-min"
            disabled={!state.home}
          >
            {isLoading ? <IconLoading /> : "Find Courses"}
          </button>
        </div>
        {!state.home && (
          <div className="flex items-center gap-2 flex-col w-full h-full text-[#9E9E9E] justify-center">
            <LogoLeftArrow />
            <p className="text-3xl font-semibold">Please select a course</p>
          </div>
        )}
        {state.home && data && (
          <div className="flex flex-col gap-2 pt-4 pb-2">
            <h2>Courses offered at school {state.abroad?.school}</h2>
            <div className="w-full gap-4 flex flex-col">
              {data.map((course, i) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  colorIdx={i}
                  showBookmark={true}
                  onBookmark={() => handleBookmark(course.code, course.eq_id!)}
                  isBookmarked={bookmarkedCourses.includes(course.code)}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </FormProvider>
  );
}
