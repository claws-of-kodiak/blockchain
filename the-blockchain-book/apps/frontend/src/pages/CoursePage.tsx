import Header from "../shared/components/Header";
import StepControl from "../features/course/StepControl";
import ObjectiveContent from "../features/course/ObjectiveContent";
import { useState } from "react";
import "../styles/course-page.css";
import { Button } from "../shared/components/Button";
import { useProgress } from "../shared/hooks/useProgress";

export default function CoursePage() {
  const [isLearning, setIsLearning] = useState(false);
  const { isData } = useProgress();

  return (
    <>
      <Header />
      <div className={`progress-layout ${isLearning ? "is-learning" : ""}`}>
        <main className="progress-main">
          <StepControl />
          <Button disabled={!isData} onClick={() => setIsLearning(!isLearning)}>
            {isLearning ? "Exit" : "Study"}
          </Button>
        </main>

        <aside
          className="progress-panel"
          aria-hidden={!isLearning}
          inert={!isLearning}
        >
          <ObjectiveContent />
        </aside>
      </div>
    </>
  );
}
