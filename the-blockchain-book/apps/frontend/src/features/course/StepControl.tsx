import { useProgressClient } from "../../services/progressClient";
import { Button } from "../../shared/components/Button";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { useCourse } from "../../shared/hooks/useCourse";
import { useProgress } from "../../shared/hooks/useProgress";

export default function StepControl() {
  const { sections } = useCourse();
  const isCourse = sections.length !== 0;
  const { details, isData, isLoading } = useProgress();
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  if (isLoading) return <p>Loading page...</p>;

  return (
    <div className="step-control">
      {isData ? (
        <div>
          <p>Current Section: {details.sectionTitle}</p>
          <p>Current Objective: {details.objectiveLabel}</p>
          <Button
            onClick={() => unlockStep.mutate()}
            disabled={unlockStep.isPending}
          >
            Next Step
          </Button>
          {unlockStep.error && <ErrorMsg msg={unlockStep.error.message} />}
          <Button onClick={() => deleteProgress.mutateAsync()}>
            Restart Progress
          </Button>
        </div>
      ) : (
        <Button disabled={!isCourse} onClick={() => beginCourse.mutate()}>
          Begin Course
        </Button>
      )}
    </div>
  );
}
