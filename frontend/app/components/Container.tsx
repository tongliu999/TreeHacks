export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center flex-grow bg-white py-4 px-6"
      style={{
        borderRadius: "10px",
        border: "1px solid #EBE9E9",
      }}
    >
      {children}
    </div>
  );
}
