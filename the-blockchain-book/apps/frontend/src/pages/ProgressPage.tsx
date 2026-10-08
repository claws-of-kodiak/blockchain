import Header from "../shared/components/Header";
import { useProgressClient } from "../services/progressClient";
import { useProgress } from "../shared/hooks/useProgress";
import { Button } from "../shared/components/Button";
import DisplayCourseContent from "../features/course/DisplayCourseContent";

export default function ProgressPage() {
  const { currentObjective, currentSection, isLoading } = useProgress();
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  if (isLoading) return <p>Loading page...</p>;

  console.log(currentObjective, currentSection);
  return (
    <>
      <Header />
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
          <Button onClick={() => deleteProgress.mutate()}>
            Restart Progress
          </Button>
        </div>
      ) : (
        <Button onClick={() => beginCourse.mutate()}>Begin Course</Button>
      )}
      <DisplayCourseContent />
    </>
  );
}
