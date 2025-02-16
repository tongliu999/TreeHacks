export const API_ENDPOINT = "http://127.0.0.1:5000";

export const CARD_COLOURS = [
  "#FFF4EF",
  "#F2FFF3",
  "#EEF9FF",
  "#E9E5FF",
  "#FFE5F5",
];

export const RATING_COLOUR_BOUNDARIES: [number, string][] = [
  [1, "#CB2828"],
  [2, "#CB3328"],
  [3, "#CB3628"],
  [4, "#CB5928"],
  [5, "#CBA228"],
  [6, "#CBC328"],
  [7, "#B5CB28"],
  [8, "#92CB28"],
  [9, "#65EC05"],
  [10, "#05EC0D"],
];

export const CARD_BORDER_COLOURS = [
  "#534EEB",
  "#6ABF5B",
  "#F6A47F",
  "#FFA7DD",
  "#41BDFF",
  "#EAF03E",
];

export type SchoolGroup = {
  group: string;
  schools: string[];
};
export const UNIVERSITY_GROUP_LIST: (SchoolGroup | string)[] = [
  {
    group: "North America",
    schools: [
      "McGill University",
      "Stanford University",
      "University of British Columbia",
      "University of Toronto",
      "University of Calgary",
      "University of Waterloo",
    ],
  },
  {
    group: "Europe",
    schools: ["Cambridge University", "ETH Zurich", "Oxford University"],
  },
  {
    group: "Asia",
    schools: [
      "City University of Hong Kong",
      "Ewha Womans University",
      "Hong Kong Polytechnic University",
      "Hong Kong University of Science and Technology",
      "National University of Singapore",
      "Tokyo University",
      "Tsinghua University",
    ],
  },
  {
    group: "Australia",
    schools: ["Australian National University", "University of Melbourne"],
  },
];

export const UNIVERSITY_LIST = UNIVERSITY_GROUP_LIST.reduce<string[]>(
  (acc, group) => {
    if (typeof group === "string") {
      return [...acc, group];
    }
    return [...acc, ...group.schools];
  },
  []
);

export const NUM_COURSES = 7;
