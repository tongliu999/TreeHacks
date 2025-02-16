import AbroadSearch from "~/components/AbroadSearch";

interface AbroadQueryArgs {
  homeSchool: string;
  homeCourseCode: string;
  abroadSchool: string;
}
export const abroadQuery = async ({
  homeSchool,
  homeCourseCode,
  abroadSchool,
}: AbroadQueryArgs) => {
  return "AbroadQuery.Success";
};
