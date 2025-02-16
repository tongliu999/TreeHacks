import type { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import type { SchoolGroup } from "~/constants";

interface ControlledInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  containerProps?: HTMLProps<HTMLDivElement>;
  disabled?: boolean;
}

interface ControlledSelectProps extends HTMLProps<HTMLSelectElement> {
  name: string;
  label?: string;
  options: (SchoolGroup | string)[];
  containerProps?: HTMLProps<HTMLDivElement>;
  disabled?: boolean;
}

export function FormInput({
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

export function FormSelect({
  name,
  label,
  options,
  containerProps: { className, ...containerProps } = {},
  disabled,
  ...props
}: ControlledSelectProps) {
  const { register } = useFormContext();

  const universityGroups = options.map((op) => {
    if (typeof op === "string") {
      return (
        <option key={op} value={op}>
          {op}
        </option>
      );
    } else {
      return (
        <optgroup key={op.group} label={op.group}>
          {op.schools.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </optgroup>
      );
    }
  });

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
      <select
        {...register(name, {
          disabled,
        })}
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
      >
        {universityGroups}
      </select>
    </div>
  );
}
