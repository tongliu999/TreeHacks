import { useQuery } from "react-query";

export interface CourseInfo {
  title: string;
  code: string;
  credits: number;
  is_bookmarked: boolean;
  description?: string;
  rating?: number;
}

interface AbroadQueryArgs {
  homeSchool: string;
  homeCourseCode: string;
  abroadSchool: string;
}
const abroadQuery = async ({
  homeSchool,
  homeCourseCode,
  abroadSchool,
}: AbroadQueryArgs): Promise<CourseInfo[]> => {
  return [
    {
      title: "PolyU Digital Hardware Systems",
      code: "COMP 327",
      credits: 1,
      description:
        "This course introduces the basic concepts of digital hardware systems, including combinational and sequential circuits, and the design of digital systems using hardware description languages.",
      is_bookmarked: false,
      rating: 4.5,
    },
    {
      title: "PolyU Digital Hardware Systems",
      code: "COMP 327",
      credits: 1,
      description:
        "This course introduces the basic concepts of digital hardware systems, including combinational and sequential circuits, and the design of digital systems using hardware description languages.",
      is_bookmarked: false,
      rating: 9.5,
    },
  ];
};

interface HomeCourseQueryArgs {
  school: string;
  courseCode: string;
}
const homeCourseQuery = async ({
  school,
  courseCode,
}: HomeCourseQueryArgs): Promise<CourseInfo[]> => {
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

interface SavedCourseListQueryArgs {
  school: string;
}
const savedCourseListQuery = async ({
  school,
}: SavedCourseListQueryArgs): Promise<CourseInfo[]> => {
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

const universitiesQuery = async (): Promise<string[]> => {
  return ["Hong Kong Polytechnic University", "City University of Hong Kong"];
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
  return useQuery({
    queryKey: [
      "abroadQuery",
      {
        homeSchool,
        homeCourseCode,
        abroadSchool,
      },
    ],
    queryFn: async () =>
      abroadQuery({
        homeSchool: homeSchool!,
        homeCourseCode: homeCourseCode!,
        abroadSchool: abroadSchool!,
      }),
    enabled: !!homeSchool && !!homeCourseCode && !!abroadSchool,
  });
};

export const useHomeCourseQuery = ({
  school,
  courseCode,
}: Partial<HomeCourseQueryArgs>) => {
  return useQuery({
    queryKey: [
      "homeCourseQuery",
      {
        school,
        courseCode,
      },
    ],
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
    queryKey: ["savedCourseListQuery", { school }],
    queryFn: async () => savedCourseListQuery({ school: school! }),
    enabled: !!school,
  });
};

export const useUniversitiesQuery = () => {
  return useQuery({
    queryKey: ["universitiesQuery"],
    queryFn: universitiesQuery,
  });
};

export const useLinkedCourseQuery = ({
  homeSchool,
  abroadSchool,
  homeCourseCodes,
}: Partial<LinkedCourseQueryArgs>) => {
  return useQuery({
    queryKey: [
      "linkedCourseQuery",
      {
        homeSchool,
        abroadSchool,
        homeCourseCodes,
      },
    ],
    queryFn: async () =>
      linkedCourseQuery({
        homeSchool: homeSchool!,
        abroadSchool: abroadSchool!,
        homeCourseCodes: homeCourseCodes!,
      }),
    enabled: !!homeSchool && !!abroadSchool && !!homeCourseCodes?.length,
  });
};
