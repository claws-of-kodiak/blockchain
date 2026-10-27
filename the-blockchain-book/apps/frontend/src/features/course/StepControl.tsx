import { useProgressClient } from "../../services/progressClient";
import { Button } from "../../shared/components/Button";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { FaArrowRight } from "react-icons/fa";
import { useProgress } from "../../shared/hooks/useProgress";

const RestartProgressButton = () => {
  const { objectiveId } = useProgress().details;
  const { deleteProgress } = useProgressClient(objectiveId);
  return (
    <Button onClick={() => deleteProgress.mutate()}>Restart Progress</Button>
  );
};

export default function StepControl() {
  const { objectiveId } = useProgress().details;
  const { unlockStep } = useProgressClient(objectiveId);

  if (!objectiveId) return <RestartProgressButton />;

  return (
    <div className="step-control">
      {!objectiveId ? (
        <RestartProgressButton />
      ) : (
        <Button
          onClick={() => unlockStep.mutate()}
          disabled={unlockStep.isPending}
        >
          <FaArrowRight />
        </Button>
      )}
      {unlockStep.error && <ErrorMsg msg={unlockStep.error.message} />}
    </div>
  );
}
