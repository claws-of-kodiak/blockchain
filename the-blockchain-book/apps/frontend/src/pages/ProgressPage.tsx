import { useState } from "react";
import Header from "../shared/components/Header";
import { useProgressClient } from "../services/progressClient";

export default function ProgressPage() {
  const [step, setStep] = useState<number>(0);
  const { beginCourse, unlockStep, deleteProgress } = useProgressClient();

  const handleBegin = () => {
    beginCourse.mutate(undefined, {
      onSuccess: (res) => {
        if (res !== null) setStep(0.1);
      },
    });
  };

  const handleDelete = () => {
    deleteProgress.mutate(undefined, {
      onSuccess: () => setStep(0),
    });
  };

  const handleNextStep = () => {
    unlockStep.mutate(step + 0.1, {
      onSuccess: (_, nextStep) => setStep(nextStep),
    });
  };

  return (
    <>
      <Header />
      <h2>Track Your Progress</h2>
      {step > 0 ? (
        <div>
          <p>Current Step: {step.toFixed(1)}</p>
          <button onClick={handleNextStep} disabled={unlockStep.isPending}>
            {unlockStep.isPending ? "..." : "Next Step"}
          </button>
          {/* <GetProgress /> */}
          <button onClick={handleDelete}>Restart Progress</button>
        </div>
      ) : (
        <button onClick={handleBegin}>Begin Course</button>
      )}
    </>
  );
}
