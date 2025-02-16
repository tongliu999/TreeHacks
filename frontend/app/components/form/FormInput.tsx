import type { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";

interface ControlledInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  containerProps?: HTMLProps<HTMLDivElement>;
  disabled?: boolean;
}

export default function FormInput({
  name,
  placeholder,
  type = "text",
  label,
  containerProps: { className, ...containerProps } = {},
  disabled,
  ...props
}: ControlledInputProps) {
  const { register } = useFormContext();

  return (
    <div
      className={`flex flex-col gap-2 ${className} ${
        disabled && "input-disabled"
      }`}
      {...containerProps}
    >
      {label && (
        <label
          htmlFor={name}
          className={`${disabled && "text-[#cbcbcb]"}`}
          style={{
            fontSize: "16px",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...register(name, {
          disabled,
        })}
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${
          disabled
            ? "bg-[#F6F6F6] text-[#cbcbcb] border-[#bcbaba]"
            : "text-gray-700"
        }`}
        style={{
          fontSize: "14px",
        }}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
