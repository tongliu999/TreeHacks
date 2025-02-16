import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/navbar";
import SchoolSearch from "~/components/SchoolSearch";
import AbroadSearch from "~/components/AbroadSearch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap flex-grow w-full h-full">
      <div className="flex-grow gap-2 flex-col flex h-full grow-1">
        <h1>Your School</h1>
        <SchoolSearch />
      </div>
      <div className="flex-grow gap-2 flex-col flex h-full grow-4">
        <h1>Schools Abroad</h1>
        <AbroadSearch />
      </div>
    </div>
  );
}
