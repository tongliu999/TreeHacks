import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { API_ENDPOINT } from "~/constants";
import { Context } from "~/context";

axios.defaults.baseURL = API_ENDPOINT;

export interface CourseInfo {
  title: string;
  code: string;
  credits: number;
  is_bookmarked: boolean;
  description?: string;
  rating?: number;
  eq_id?: string;
}

interface AbroadQueryArgs {
  homeSchool: string;
  homeCourseCode: string;
  abroadSchool: string;
  userId: string;
}
const abroadQuery = async ({
  homeSchool,
  homeCourseCode,
  abroadSchool,
  userId,
}: AbroadQueryArgs): Promise<CourseInfo[]> => {
  const { data } = await axios.post("/course_search", {
    from_university: homeSchool,
    from_code: homeCourseCode,
    to_university: abroadSchool,
    user_id: userId,
  });
  return data.equivalences.map((course: any) => ({
    title: course.course_name,
    code: course.course_code,
    credits: 1,
    description: course.course_desc,
    is_bookmarked: course.is_favourite,
    rating: course.similarity_score,
    eq_id: course.eq_id,
  }));
};

interface HomeCourseQueryArgs {
  school: string;
  courseCode: string;
}
const homeCourseQuery = async ({
  school,
  courseCode,
}: HomeCourseQueryArgs): Promise<CourseInfo[]> => {
  const res = await axios.post("/get_course_desc", {
    from_university: school,
    from_code: courseCode,
  });

  return [
    {
      code: res.data.course_code,
      title: res.data.course_name,
      description: res.data.course_desc,
      is_bookmarked: false,
      credits: 1,
    },
  ];
};

interface SavedCourseListQueryArgs {
  school: string;
  userId: string;
}
const savedCourseListQuery = async ({
  school,
  userId,
}: SavedCourseListQueryArgs): Promise<CourseInfo[]> => {
  const { data } = await axios.post("/get_user_courses", {
    user_id: userId, // TODO
  });
  return [
    {
      title: "Digital Hardware Systems",
      code: "ECE 327",
      credits: 1,
      description:
        "This course introduces the basic concepts of digital hardware systems, including combinational and sequential circuits, and the design of digital systems using hardware description languages.",
      is_bookmarked: false,
    },
  ];
};

interface LinkedCourseQueryArgs {
  homeSchool: string;
  abroadSchool: string;
  homeCourseCodes: string[];
}
const linkedCourseQuery = async ({
  homeSchool,
  abroadSchool,
  homeCourseCodes,
}: LinkedCourseQueryArgs): Promise<CourseInfo[]> => {
  return [
    {
      title: "Digital Hardware Systems",
      code: "ECE 327",
      credits: 1,
      description:
        "This course introduces the basic concepts of digital hardware systems, including combinational and sequential circuits, and the design of digital systems using hardware description languages.",
      is_bookmarked: false,
    },
  ];
};

// hooks go here

export const useAbroadQuery = ({
  homeSchool,
  homeCourseCode,
  abroadSchool,
}: Partial<AbroadQueryArgs>) => {
  const { state } = useContext(Context);
  return useQuery({
    queryKey: ["abroadQuery", homeSchool, homeCourseCode, abroadSchool],
    queryFn: async () =>
      abroadQuery({
        homeSchool: homeSchool!,
        homeCourseCode: homeCourseCode!,
        abroadSchool: abroadSchool!,
        userId: state.userId!,
      }),
    enabled: !!homeSchool && !!homeCourseCode && !!abroadSchool,
  });
};

export const useHomeCourseQuery = ({
  school,
  courseCode,
}: Partial<HomeCourseQueryArgs>) => {
  return useQuery({
    queryKey: ["homeCourseQuery", school, courseCode],
    queryFn: async () =>
      homeCourseQuery({
        school: school!,
        courseCode: courseCode!,
      }),
    enabled: !!school && !!courseCode,
  });
};

export const useSavedCourseListQuery = ({
  school,
}: Partial<SavedCourseListQueryArgs>) => {
  return useQuery({
    queryKey: ["savedCourseListQuery", school],
    queryFn: async () => savedCourseListQuery({ school: school! }),
    enabled: !!school,
  });
};

export const useLinkedCourseQuery = ({
  homeSchool,
  abroadSchool,
  homeCourseCodes,
}: Partial<LinkedCourseQueryArgs>) => {
  return useQuery({
    queryKey: ["linkedCourseQuery", homeSchool, abroadSchool, homeCourseCodes],
    queryFn: async () =>
      linkedCourseQuery({
        homeSchool: homeSchool!,
        abroadSchool: abroadSchool!,
        homeCourseCodes: homeCourseCodes!,
      }),
    enabled: !!homeSchool && !!abroadSchool && !!homeCourseCodes?.length,
  });
};

export const addFavouriteEquivalence = async (equivalenceId: string, userId: string) => {
  console.log("adding favourite", equivalenceId, userId);
  const { data } = await axios.post("/add_favourite", {
    eq_id: equivalenceId,
    user_id: userId,
  });
  console.log("added favourite", data);
};

export const removeFavouriteEquivalence = async (equivalenceId: string, userId: string) => {
  console.log("removing favourite", equivalenceId, userId);
  const { data } = await axios.post("/remove_favourite", {
    eq_id: equivalenceId,
    user_id: userId,
  });
  console.log("removed favourite", data);
};
