import { Form, FormProvider, useForm } from "react-hook-form";
import Container from "./Container";
import FormInput from "./form/FormInput";
import { useContext } from "react";
import { Context } from "~/context";

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
  });

  return (
    <FormProvider {...form}>
      <Container className="flex-grow" as="form" onSubmit={onSubmit}>
        <div className="flex gap-2 items-end w-full">
          <FormInput
            name="schoolSearch"
            placeholder="School name"
            label="Which school do you attend?"
            containerProps={{ className: "flex-grow" }}
          />
          <FormInput
            name="courseCodeSearch"
            placeholder="Course code"
            label="Please provide the course code"
            containerProps={{ className: "flex-grow" }}
          />
          <button type="submit" className="cta-button h-min">
            Search
          </button>
        </div>
      </Container>
    </FormProvider>
  );
}
