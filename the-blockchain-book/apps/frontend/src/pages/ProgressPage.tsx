import Header from "../shared/components/Header";
import StepControl from "../features/course/StepControl";
import ObjectiveContent from "../features/course/ObjectiveContent";
import { useState } from "react";
import "../styles/progress-page.css";
import { Button } from "../shared/components/Button";

export default function ProgressPage() {
  const [isLearning, setIsLearning] = useState(false);

  return (
    <>
      <Header />
      <div className={`progress-layout ${isLearning ? "is-learning" : ""}`}>
        <main className="progress-main">
          <StepControl />
          <Button onClick={() => setIsLearning(!isLearning)}>
            {isLearning ? "Exit" : "Study Content"}
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
