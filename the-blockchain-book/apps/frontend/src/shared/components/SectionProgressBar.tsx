import { useCourse } from "../hooks/useCourse";
import { useProgress } from "../hooks/useProgress";
import "../../styles/progress-bar.css";

type ProgressBarVariant = "dashboard" | "course" | "profile";

interface SectionProgressBarProps {
  variant: ProgressBarVariant;
}

export default function SectionProgressBar({
  variant,
}: SectionProgressBarProps) {
  const { sections } = useCourse();
  const { sectionId } = useProgress().details;

  // Base block class with a dynamic variant modifier
  const containerClass = `progress-bar progress-bar--${variant}`;

  return (
    <div className={containerClass}>
      <div className="progress-bar__track">
        {sections.map((section, index) => {
          const isActive = sectionId === section.sectionId;

          // Determine status state class
          const statusClass = isActive ? "is-active" : "is-inactive";

          return (
            <div
              key={section.sectionId || index}
              className={`progress-bar__item progress-bar__item--${statusClass}`}
            >
              {section.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
