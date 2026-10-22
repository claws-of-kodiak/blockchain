import { useCourse } from "../../shared/hooks/useCourse";
import { useProgress } from "../../shared/hooks/useProgress";
import "../../styles/./dashboard/progress-bar.css";

const ProgressBar: React.FC = () => {
  const { sections } = useCourse();
  const { sectionId } = useProgress().details;

  return (
    <div className="progress-bar-container">
      <div className="progress-track-wrapper">
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
};

export default ProgressBar;
