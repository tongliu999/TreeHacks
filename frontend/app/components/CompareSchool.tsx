import { useUniversitiesQuery } from "~/queries/queries";
import Container from "./Container";

interface CompareSchoolProps {
  hostSchool: string;
  hostCourseCodes: string[];
}
export default function CompareSchool({
  hostSchool,
  hostCourseCodes,
}: CompareSchoolProps) {
  const { data, isLoading, error } = useUniversitiesQuery();
  return (
    <Container>
      <h2>Choose school</h2>
      <select>
        <option value="">Choose school</option>
        {data?.map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>
    </Container>
  );
}
