import "../../styles/display-sections.css";
import { useSections } from "../../shared/hooks/useSections";
import type { Section } from "@repo/validations";
import ErrorMsg from "../../shared/components/ErrorMsg";
import SectionCard from "./SectionCard";

export default function DisplaySections() {
  const { sections, isLoading, error } = useSections();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="display-sections-wrap">
      {sections ? (
        sections.map((section: Section) => (
          <SectionCard key={section.sectionId} payload={section} />
        ))
      ) : (
        <p>No course content found.</p>
      )}
    </div>
  );
}
