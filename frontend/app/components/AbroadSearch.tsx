import { FormProvider, useForm } from "react-hook-form";
import Container from "./Container";
import FormInput from "./form/FormInput";
import { useContext } from "react";
import { Context } from "~/context";
import LogoLeftArrow from "~/assets/logo-leftarrow.svg?react";
import { useAbroadQuery } from "~/queries/queries";
import CourseCard from "./CourseCard";

interface TFormValues {
  abroadSchoolSearch: string;
}
export default function AbroadSearch() {
  const form = useForm<TFormValues>();
  const { state, setState } = useContext(Context);

  const onSubmit = form.handleSubmit((data) => {
    setState({
      ...state,
      abroad: {
        school: data.abroadSchoolSearch,
      },
    });
  });

  const { data, isLoading, error } = useAbroadQuery({
    homeSchool: state.home?.school,
    homeCourseCode: state.home?.courseCode,
    abroadSchool: state.abroad?.school,
  });

  return (
    <FormProvider {...form}>
      <Container
        className="flex-grow flex-col items-start h-full w-full"
        as="form"
        onSubmit={onSubmit}
      >
        <div className="flex gap-2 items-end w-full">
          <FormInput
            name="abroadSchoolSearch"
            placeholder="School name"
            label="Which school are you going to attend?"
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
            Find Courses
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
                <CourseCard key={course.code} course={course} colorIdx={i} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </FormProvider>
  );
}
