import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getObjectives, useCourseClient } from "../../services/courseClient";
import type { Objective } from "@repo/validations";
import PopUp from "../../shared/components/PopUp";
import NewObjectiveForm from "./NewObjectiveForm";
import DeleteBin from "../../shared/components/DeleteBin";
import { HoverAddItemButton } from "./AddItemButton";
import { sortByPosition } from "../../util/sortByPosition";

export default function EditSection() {
  const { sectionId } = useParams(); // New tool learned here
  const { deleteObjective } = useCourseClient();
  const { data } = useQuery({
    queryKey: ["course-content", sectionId],
    queryFn: () => getObjectives(sectionId),
    enabled: !!sectionId,
  });
  const objectives: Objective[] = data;
  const sortedObjectives = sortByPosition(objectives);

  return (
    <>
      <div>
        <PopUp component={NewObjectiveForm} label="+ Add New Objective" />
        {sortedObjectives &&
          sortedObjectives.map((obj) => (
            <div key={obj.label}>
              <HoverAddItemButton
                component={NewObjectiveForm}
                position={obj.position} // AUDIT POSITION ROUTE TO courseRepos
              />
              <p>
                {obj.label} - {obj.description}
                <DeleteBin
                  onClick={() => deleteObjective.mutate(obj.objectiveId)}
                />
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
