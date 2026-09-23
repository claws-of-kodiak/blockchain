import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { progress } from "../services/progressClient";
// import GetProgress from "../features/progress/GetProgress";

const postUnlockStep = async (nextStep: number) => {
  const data = await progress.nextStep(nextStep);
  return data;
};

const postBeginCourse = async () => {
  const data = await progress.begin();
  console.log("Course begun at", data);
  return data;
};

export default function ProgressPage() {
  const [step, setStep] = useState<number>(0);
  const { mutate, isPending } = useMutation({
    mutationKey: ["nextStep"],
    mutationFn: postUnlockStep,
    onSuccess: (res, newStep) => {
      setStep(newStep);
      console.log("Successful step update: ", res);
    },
    onError: (error) => console.error("Mutation fn failed", error),
  });

  const handleStepUnlock = async (step: number) => {
    const nextStep = step + 0.1;
    mutate(nextStep);
  };

  const handleBeginCourse = async () => {
    const res = await postBeginCourse();
    if (res === null) return;
    setStep(0.1);
  };
  const handleDeleteProgress = async () => {
    await progress.delete();
    setStep(0);
  };

  return (
    <>
      {step > 0 ? (
        <div>
          <p>Current Step: {step.toFixed(1)}</p>
          <button onClick={() => handleStepUnlock(step)}>
            {isPending ? "..." : "Next Step"}
          </button>
          {/* <GetProgress /> */}
          <button onClick={() => handleDeleteProgress()}>
            Restart Progress
          </button>
        </div>
      ) : (
        <button onClick={() => handleBeginCourse()}>Begin Course</button>
      )}
    </>
  );
}
