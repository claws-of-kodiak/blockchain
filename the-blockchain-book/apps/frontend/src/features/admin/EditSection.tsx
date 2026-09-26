import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getObjectives } from "../../services/courseClient";
import type { Objective } from "@repo/validations";

export default function EditSection() {
  const { sectionId } = useParams(); // New tool learned here
  const { data } = useQuery({
    queryKey: ["objectives", sectionId],
    queryFn: () => getObjectives(sectionId),
    enabled: !!sectionId,
  });
  const objectives: Objective[] = data;

  return (
    <>
      <div>
        {objectives &&
          objectives.map((obj) => (
            <p key={obj.sectionId}>
              {obj.label} - {obj.description}
            </p>
          ))}
      </div>
    </>
  );
}
