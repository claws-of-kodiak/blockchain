import { Link, useParams } from "react-router";
import "../../styles/edit-sections.css";
import { useQuery } from "@tanstack/react-query";
import {
  getObjectives,
  getSection,
  useCourseClient,
} from "../../services/courseClient";
import PopUp from "../../shared/components/PopUp";
import NewObjectiveForm from "./NewObjectiveForm";
import DeleteBin from "../../shared/components/DeleteBin";
import { HoverAddItemButton } from "./AddItemButton";
import { sortByPosition } from "../../util/sortByPosition";
import { FaEdit } from "react-icons/fa";
import { Spinner } from "../../shared/components/Spinner";

export default function EditSection() {
  const { sectionId } = useParams(); // New tool learned here
  const { deleteObjective } = useCourseClient();
  const { data: objectives } = useQuery({
    queryKey: ["sections", sectionId],
    queryFn: () => getObjectives(sectionId),
    enabled: !!sectionId,
  });

  // Additional query to getSectionTitle for render
  const { data: section, isLoading } = useQuery({
    queryKey: ["section", sectionId],
    queryFn: () => getSection(sectionId),
    enabled: !!sectionId,
  });

  const sortedObjectives = sortByPosition(objectives);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="edit-section-container">
        {section && <h2>{section.title}</h2>}
        <div className="editor-top-actions">
          <PopUp component={NewObjectiveForm} label="+ Add New Objective" />
        </div>
        {sortedObjectives &&
          sortedObjectives.map((obj) => (
            <div key={obj.label} className="objective-node">
              <div className="inline-divider-wrapper">
                <HoverAddItemButton
                  component={NewObjectiveForm}
                  position={obj.position}
                />
              </div>
              <div className="objective-row">
                <p className="objective-data-text">
                  {obj.label} - {obj.description}
                </p>
                <div className="objective-actions-toolbar">
                  <Link to={`/admin/section/${sectionId}/${obj.objectiveId}`}>
                    <FaEdit />
                  </Link>
                  <DeleteBin
                    onClick={() => deleteObjective.mutate(obj.objectiveId)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
