import { useProgressClient } from "../../services/progressClient";
import { Button } from "../../shared/components/Button";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { useCourse } from "../../shared/hooks/useCourse";
import { useProgress } from "../../shared/hooks/useProgress";

export default function StepControl() {
  const { sections } = useCourse();
  const isCourse = sections.length !== 0;
  const { currentObjective, currentSection, isLoading, error } = useProgress();
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  if (isLoading) return <p>Loading page...</p>;

  return (
    <div className="step-control">
      <h2>Track Your Progress</h2>
      {currentSection !== "Not found" ? (
        <div>
          <p>Current Section: {currentSection}</p>
          <p>Current Objective: {currentObjective}</p>
          <Button
            onClick={() => unlockStep.mutate()}
            disabled={unlockStep.isPending}
          >
            Next Step
          </Button>
          <Button onClick={() => deleteProgress.mutateAsync()}>
            Restart Progress
          </Button>
        </div>
      ) : (
        <Button disabled={!isCourse} onClick={() => beginCourse.mutate()}>
          Begin Course
        </Button>
      )}
      {error && <ErrorMsg msg={error.message} />}
    </div>
  );
}
