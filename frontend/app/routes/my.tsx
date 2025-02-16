import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/navbar";
import SchoolSearch from "~/components/SchoolSearch";
import AbroadSearch from "~/components/AbroadSearch";
import { useSavedCourseListQuery } from "~/queries/queries";
import { useContext, useEffect, useState } from "react";
import { Context } from "~/context";
import SavedCourseList from "~/components/SavedCourseList";
import CompareSchool from "~/components/CompareSchool";
import { redirect, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Courses | Poof!" },
    { name: "", content: "Plan your exchange" },
  ];
}

export default function Home() {
  const { state, setState } = useContext(Context);

  console.log(state);
  const school = state?.home?.school ?? "Unknown";

  useEffect(() => {
    if (!school) {
      redirect("/");
    }
  }, [school]);

  if (!school) {
    return (
      <div className="flex flex-col gap-2 flex-grow w-full h-full">
        <h1>Your School</h1>
        <p>
          Please select a school and a course code to see which courses are
          equivalent.
        </p>
      </div>
    );
  }

  const { data, isLoading, error } = useSavedCourseListQuery({
    school,
  });

  const [numCompares, setNumCompares] = useState(1);

  const numComparesArray = Array.from({ length: numCompares }, (_, i) => i);

  return (
    <div className="flex flex-col gap-2 flex-grow w-full h-full">
      <h1>Compare School Courses</h1>
      <p>
        Select specific schools to check if they offer courses that meet your
        school's requirements. You must bookmark courses first in order for them
        to show up in the course list.
      </p>
      <div className="flex gap-4 w-full h-full">
        <SavedCourseList
          school={school}
          courses={data ?? []}
          isLoading={isLoading}
        />
        <div className="overflow-x-auto flex gap-4 w-full h-full">
          {numComparesArray.map((_, i) => (
            <CompareSchool
              hostSchool={school}
              hostCourseCodes={[]}
              key={i}
              onClose={() => setNumCompares(numCompares - 1)} // this doesn't work and deletes your data
            />
          ))}
          <button
            type="button"
            onClick={() => setNumCompares(numCompares + 1)}
            className="min-w-[3rem] flex items-center justify-center hover:cursor-pointer text-gray-400 border-gray-400"
            style={{
              border: "1px dashed",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
