import { useProgressClient } from "../../services/progressClient";
import { Button } from "../../shared/components/Button";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { useCourse } from "../../shared/hooks/useCourse";
import { useProgress } from "../../shared/hooks/useProgress";

export default function StepControl() {
  const { sections } = useCourse();
  const isCourse = sections.length !== 0;
  const { details, isData, isLoading } = useProgress();
  const objectiveId = details?.objectiveId ?? "";
  const { unlockStep, deleteProgress } = useProgressClient(objectiveId);

  if (isLoading) return <p>Loading page...</p>;

  if (!isCourse) return <ErrorMsg msg="No course found - contact admin." />;

  return (
    <div className="step-control">
      {isData ? (
        <div>
          <p>Current Section: {details.sectionTitle}</p>
          <p>Current Objective: {details.objectiveLabel}</p>
          <Button
            onClick={() => unlockStep.mutate()}
            disabled={unlockStep.isPending || !objectiveId}
          >
            Next Step
          </Button>
          {unlockStep.error && <ErrorMsg msg={unlockStep.error.message} />}
          <Button onClick={() => deleteProgress.mutate()}>
            Restart Progress
          </Button>
        </div>
      ) : (
        <div>
          <h3>Course Complete</h3>
          <Button onClick={() => deleteProgress.mutate()}>
            Restart Progress
          </Button>
        </div>
      )}
    </div>
  );
}
