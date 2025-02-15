import type { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

interface ControlledInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
}

export default function FormInput({
  name,
  placeholder,
  type = "text",
  label,
  ...props
}: ControlledInputProps) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          style={{
            fontSize: "16px",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        style={{
          fontSize: "14px",
        }}
        {...props}
      />
    </div>
  );
}
