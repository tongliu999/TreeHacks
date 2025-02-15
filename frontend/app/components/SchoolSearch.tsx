import { Form, FormProvider, useForm } from "react-hook-form";
import Container from "./Container";
import FormInput from "./form/FormInput";

export default function SchoolSearch() {
  const form = useForm();
  return (
    <Container>
      <FormProvider {...form}>
        <div className="flex gap-2 items-end">
          <FormInput
            name="schoolName"
            placeholder="School name"
            label="Which school do you attend?"
          />
          <FormInput
            name="courseCodeSearch"
            placeholder="Course code"
            label="Please provide the course code"
          />
          <button
            type="submit"
            className="px-6 font-semibold py-2 text-white bg-nav flex items-center justify-center rounded-sm h-min"
          >
            Search
          </button>
        </div>
      </FormProvider>
    </Container>
  );
}
