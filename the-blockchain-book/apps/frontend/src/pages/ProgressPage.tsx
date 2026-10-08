import Header from "../shared/components/Header";
import { useProgressClient } from "../services/progressClient";
import { useProgress } from "../shared/hooks/useProgress";
import { Button } from "../shared/components/Button";
import DisplayCourseContent from "../features/course/DisplayCourseContent";
import { useCourse } from "../shared/hooks/useCourse";
import ErrorMsg from "../shared/components/ErrorMsg";

export default function ProgressPage() {
  const { sections } = useCourse();
  const isCourse = sections.length !== 0;
  const { currentObjective, currentSection, isLoading, error } = useProgress();
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  if (isLoading) return <p>Loading page...</p>;

  console.log(error);

  return (
    <>
      <Header />
      <h2>Track Your Progress</h2>
      {currentObjective !== "Not found" ? (
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
      {isCourse ? (
        <DisplayCourseContent />
      ) : (
        <ErrorMsg msg="Contact admin - no course content." />
      )}
    </>
  );
}
