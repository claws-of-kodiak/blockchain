import ErrorMsg from "../../shared/components/ErrorMsg";
import SectionCard from "./SectionCard";
import "../../styles/display-sections.css";
import { useSections } from "../../shared/hooks/useSections";

export default function DisplaySections() {
  const { sections, isLoading, error } = useSections();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="display-sections-wrap">
      {sections ? (
        sections.map((section) => (
          <SectionCard key={section.section_id} payload={section} />
        ))
      ) : (
        <p>No course content found.</p>
      )}
    </div>
  );
}
