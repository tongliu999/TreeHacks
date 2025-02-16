import { useContext, useState } from "react";
import { Context } from "~/context";
import { FormInput } from "./form/FormInput";
import { FormProvider, useForm } from "react-hook-form";

export default function Signin({ onClose }: { onClose: () => void }) {
  const { state, setState } = useContext(Context);

  const onSubmit = () => {
    setState({ ...state, userId });
    onClose();
  };
  const form = useForm({
    defaultValues: {
      userId: state.userId || "",
    },
  });

  const userId = form.watch("userId");
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-1">
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="flex gap-2 items-end">
          <FormInput
            name="userId"
            label="Username"
            placeholder="Username"
            containerProps={{ className: "text-black" }}
          />
          <button type="submit" className="cta-button">
            Sign in
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
