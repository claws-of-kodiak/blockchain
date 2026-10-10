import "../../styles/display-sections.css";
import { useCourse } from "../../shared/hooks/useCourse";
import type { Section } from "@repo/validations";
import ErrorMsg from "../../shared/components/ErrorMsg";
import SectionCard from "./SectionCard";
import { sortByPosition } from "../../util/sortByPosition";
import { HoverAddItemButton } from "./AddItemButton";
import NewSectionForm from "./NewSectionForm";

export default function DisplaySections() {
  const { sections, isLoading, error } = useCourse();

  const sortedSections = sortByPosition(sections);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorMsg msg={error.message} />;
  const isSections: boolean = !(sortedSections.length === 0);

  return (
    <div className="display-sections-wrap">
      {isSections ? (
        sortedSections.map((section: Section) => (
          <div key={section.sectionId}>
            <HoverAddItemButton
              component={NewSectionForm}
              position={section.position}
            />
            <SectionCard payload={section} />
          </div>
        ))
      ) : (
        <p>No sections found.</p>
      )}
    </div>
  );
}
