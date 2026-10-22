import { useCourse } from "../hooks/useCourse";
import { useProgress } from "../hooks/useProgress";
import "../../styles/./dashboard/progress-bar.css";

type ProgressBarVariant = "dashboard" | "course" | "profile";

export default function SectionProgressBar({
  variant,
}: {
  variant: ProgressBarVariant;
}) {
  const { sections } = useCourse();
  const { sectionId } = useProgress().details;

  const containerClass = `${variant}-progress-bar-container`;
  const wrapperClass = `${variant}-progress-bar-wrap`;

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`progress-${
              sectionId === section.sectionId ? "is-active" : "inactive"
            }`}
          >
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );
}
