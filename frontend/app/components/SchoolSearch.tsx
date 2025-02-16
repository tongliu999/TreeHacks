import { Form, FormProvider, useForm } from "react-hook-form";
import Container from "./Container";
import { FormInput, FormSelect } from "./form/FormInput";
import { useContext } from "react";
import { Context } from "~/context";
import { useHomeCourseQuery, type CourseInfo } from "~/queries/queries";
import IconLoading from "~/assets/icon-loading.svg?react";
import CourseCard from "./CourseCard";
import { UNIVERSITY_GROUP_LIST } from "~/constants";

interface TFormValues {
  schoolSearch: string;
  courseCodeSearch: string;
}

export default function SchoolSearch() {
  const form = useForm<TFormValues>();
  const { state, setState } = useContext(Context);

  const onSubmit = form.handleSubmit((data: TFormValues) => {
    if (!data.schoolSearch || !data.courseCodeSearch) {
      return;
    }
    setState({
      ...state,
      home: {
        school: data.schoolSearch,
        courseCode: data.courseCodeSearch,
      },
    });
    localStorage.setItem(
      "home",
      JSON.stringify({
        school: data.schoolSearch,
        courseCode: data.courseCodeSearch,
      })
    );
  });

  const { data, isLoading, error } = useHomeCourseQuery({
    school: state.home?.school,
    courseCode: state.home?.courseCode,
  });

  const onBookmark = (course: CourseInfo) => {
    if (state.homeCourses?.find((c) => c.code === course.code)) {
      setState({
        ...state,
        homeCourses: state.homeCourses?.filter(
          ({ code }) => code !== course.code
        ),
      });
    } else {
      setState({
        ...state,
        homeCourses: [...(state.homeCourses ?? []), course],
      });
      localStorage.setItem(
        "homeCourses",
        JSON.stringify([...(state.homeCourses ?? []), course])
      );
    }
  };

  return (
    <FormProvider {...form}>
      <Container className="flex-grow" as="form" onSubmit={onSubmit}>
        <div className="flex gap-2 items-end w-full flex-wrap">
          <FormSelect
            name="schoolSearch"
            placeholder="School name"
            label="Which school do you attend?"
            options={UNIVERSITY_GROUP_LIST}
            containerProps={{ className: "flex-grow" }}
          />
          <FormInput
            name="courseCodeSearch"
            placeholder="Course code"
            label="Please provide the course code"
            containerProps={{ className: "flex-grow" }}
          />
          <button type="submit" className="cta-button h-min">
            {isLoading ? <IconLoading /> : "Search"}
          </button>
        </div>
        {state.home && data && (
          <div className="flex flex-col gap-2 pt-4 pb-2">
            <div className="w-full gap-4 flex flex-col">
              {data.map((course, i) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  colorIdx={i}
                  onBookmark={onBookmark}
                  isBookmarked={state.homeCourses?.some(
                    (c) => c.code === course.code
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </FormProvider>
  );
}
