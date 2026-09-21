import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { publicFetch } from "../services/apiClient";

// Need Util function to generate UUID for user_id
export const userId: string = "123e4567-e89b-12d3-a456-426655440000";

const postUnlockStep = async (nextStep: number) => {
  const data = await publicFetch.post("/course/unlockStep", {
    userId,
    nextStep,
  });
  return data;
};

const postBeginCourse = async () => {
  const data = await publicFetch.post("/course/begin", { userId });
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

  return (
    <>
      {step > 0 ? (
        <div>
          <p>Current Step: {step.toFixed(1)}</p>
          <button onClick={() => handleStepUnlock(step)}>
            {isPending ? "..." : "Next Step"}
          </button>
        </div>
      ) : (
        <button onClick={() => handleBeginCourse()}>Begin Course</button>
      )}
    </>
  );
}
