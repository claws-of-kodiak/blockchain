import Header from "../shared/components/Header";
import { useProgressClient } from "../services/progressClient";
import { useProgress } from "../shared/hooks/useProgress";
import { Button } from "../shared/components/Button";

export default function ProgressPage() {
  const { currentStep = 0, isLoading } = useProgress();
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  if (isLoading) return <p>Loading page...</p>;

  return (
    <>
      <Header />
      <h2>Track Your Progress</h2>
      {currentStep > 0 ? (
        <div>
          <p>Current Step: {currentStep}</p>
          <Button
            onClick={() => unlockStep.mutate()}
            disabled={unlockStep.isPending}
          >
            Next Step
          </Button>
          <Button onClick={() => deleteProgress.mutate()}>
            Restart Progress
          </Button>
        </div>
      ) : (
        <Button onClick={() => beginCourse.mutate()}>Begin Course</Button>
      )}
    </>
  );
}
