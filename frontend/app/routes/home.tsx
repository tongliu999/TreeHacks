import type { Route } from "./+types/home";
import SchoolSearch from "~/components/SchoolSearch";
import AbroadSearch from "~/components/AbroadSearch";
import SavedCourseList from "~/components/SavedCourseList";
import { useContext } from "react";
import { Context } from "~/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Browse | Poof!" },
    { name: "", content: "Find equivalent courses" },
  ];
}

export default function Home() {
  const { state, setState } = useContext(Context);

  const setHomeCode = (code: string) => {
    setState({
      ...state,
      home: state.home
        ? {
            ...state.home,
            courseCode: code,
          }
        : undefined,
    });
  };

  return (
    <div className="flex gap-4 sm:flex-wrap md:flex-nowrap flex-grow w-full h-full">
      <div className="flex-grow gap-2 flex-col flex h-full grow-1 md:w-[40%]">
        <h1>Your School</h1>
        <SchoolSearch />
        <SavedCourseList
          school={state.home?.school ?? "Unknown"}
          courses={state.homeCourses ?? []}
          onCourseSelect={(course) => setHomeCode(course.code)}
          noText
        />
      </div>
      <div className="flex-grow gap-2 flex-col flex h-full grow-3 md:w-[60%]">
        <h1>Schools Abroad</h1>
        <AbroadSearch />
      </div>
    </div>
  );
}
