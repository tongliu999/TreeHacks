import type { HTMLProps } from "react";

export default function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "form";
} & HTMLProps<HTMLFormElement>) {
  return (
    // @ts-ignore // sus
    <Component
      className={`flex flex-col items-center flex-grow bg-white py-4 px-6 ${className}`}
      style={{
        borderRadius: "10px",
        border: "1px solid #EBE9E9",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
