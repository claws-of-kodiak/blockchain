import { useState } from "react";
import { useCourse } from "../../shared/hooks/useCourse";
import SideBarListItem from "./SideBarListItem";

function SideBarDetails() {
  const { sections, objectives, isLoading } = useCourse();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  return (
    <div className="sidebar">
      {sections.map((section) => (
        <div key={section.sectionId} className="sidebar-section">
          <div
            className="section-header"
            onClick={() => toggleSection(section.sectionId)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {section.title}
          </div>
          {openSections[section.sectionId] && (
            <div className="section-content">
              {objectives
                .filter(
                  (objective) => objective.sectionId === section.sectionId
                )
                .map((objective) => (
                  <SideBarListItem
                    key={objective.objectiveId}
                    objective={objective}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBarDetails;
