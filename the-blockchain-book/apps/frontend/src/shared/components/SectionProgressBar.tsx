import { useProgress } from "../hooks/useProgress";
import "../../styles/progress-bar.css";
import type { Section } from "@repo/validations";

type ProgressBarVariant = "dashboard" | "course" | "profile";

interface SectionProgressBarProps {
  variant: ProgressBarVariant;
  sections: Section[];
}

export default function SectionProgressBar({
  variant,
  sections,
}: SectionProgressBarProps) {
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
