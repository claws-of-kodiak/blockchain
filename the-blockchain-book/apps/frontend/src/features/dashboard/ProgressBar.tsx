import { useCourse } from "../../shared/hooks/useCourse";
import { useProgress } from "../../shared/hooks/useProgress";

const ProgressBar: React.FC = () => {
  const { sections } = useCourse();
  const { sectionId } = useProgress().details;

  const calculateProgress = (index: number) => {
    const currentSectionIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    return index <= currentSectionIndex ? "completed" : "pending";
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-track-wrapper">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`progress-segment ${calculateProgress(index)}`}
          >
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
