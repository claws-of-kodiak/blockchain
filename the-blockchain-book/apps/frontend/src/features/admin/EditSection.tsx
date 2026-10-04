import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getObjectives, useCourseClient } from "../../services/courseClient";
import type { Objective } from "@repo/validations";
import PopUp from "../../shared/components/PopUp";
import NewObjectiveForm from "./NewObjectiveForm";
import DeleteBin from "../../shared/components/DeleteBin";

export default function EditSection() {
  const { sectionId } = useParams(); // New tool learned here
  const { deleteObjective } = useCourseClient();
  const { data } = useQuery({
    queryKey: ["course-content", sectionId],
    queryFn: () => getObjectives(sectionId),
    enabled: !!sectionId,
  });
  const objectives: Objective[] = data;

  return (
    <>
      <div>
        <PopUp component={NewObjectiveForm} label="+ Add New Objective" />
        {objectives &&
          objectives.map((obj) => (
            <p key={obj.label}>
              {obj.label} - {obj.description}
              <DeleteBin
                onClick={() => deleteObjective.mutate(obj.objectiveId)}
              />
            </p>
          ))}
      </div>
    </>
  );
}
