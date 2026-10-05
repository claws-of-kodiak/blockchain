import type { Objective } from "@repo/validations";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { Spinner } from "../../shared/components/Spinner";
import { useSections } from "../../shared/hooks/useSections";
import { sortByPosition } from "../../util/sortByPosition";

export default function DisplayCourseContent() {
  const { sections, objectives, isLoading, error } = useSections();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="display-course">
      {sections &&
        sections.map((section) => {
          const sectionObjectives = objectives.filter(
            (obj) => obj.sectionId === section.sectionId
          );
          const sortedObjectives = sortByPosition(sectionObjectives);
          return (
            <div className="display-section-content" key={section.sectionId}>
              <h3>
                {section.title} - position: {section.position}
              </h3>
              {sortedObjectives.map((obj: Objective) => (
                <p key={obj.objectiveId}>
                  {obj.description} - position: {obj.position}
                </p>
              ))}
            </div>
          );
        })}
    </div>
  );
}
