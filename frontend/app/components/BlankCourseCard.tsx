export default function BlankCourseCard({ pulse }: { pulse?: boolean }) {
  return (
    <div
      className={`rounded-lg w-full ${pulse ? "animate-pulse" : ""}`}
      style={{
        border: `1px dashed #CAC4D0`,
        height: "5.25rem",
        background: pulse ? "#eee" : "",
      }}
    ></div>
  );
}
