import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/navbar";
import SchoolSearch from "~/components/SchoolSearch";
import AbroadSearch from "~/components/AbroadSearch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Browse | Poof!" },
    { name: "", content: "Find equivalent courses" },
  ];
}

export default function Home() {
  return (
    <div className="flex gap-4 sm:flex-wrap md:flex-nowrap flex-grow w-full h-full">
      <div className="flex-grow gap-2 flex-col flex h-full grow-1 md:w-[40%]">
        <h1>Your School</h1>
        <SchoolSearch />
      </div>
      <div className="flex-grow gap-2 flex-col flex h-full grow-3 md:w-[60%]">
        <h1>Schools Abroad</h1>
        <AbroadSearch />
      </div>
    </div>
  );
}
