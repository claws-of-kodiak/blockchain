import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Need Util function to generate UUID for user_id
const userId: string = "123e4567-e89b-12d3-a456-426655440000";

const postUnlockStep = async (nextStep: number) => {
  const res = await fetch("http://localhost:3000/course/unlockStep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, nextStep }),
  });
  if (!res.ok) throw new Error("Failed to unlock next step.");
  return res;
};

const postBeginCourse = async () => {
  const res = await fetch("http://localhost:3000/course/begin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Failed to unlock next step.");
  console.log("Course begun at", res);
  return res.json();
};

export default function ProgressPage() {
  const [step, setStep] = useState<number>(0);
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["nextStep"],
    mutationFn: postUnlockStep,
  });

  const handleStepUnlock = (step: number) => {
    const nextStep = step + 0.1;
    const res = mutate(nextStep);
    if (error) return;
    console.log("res (from mutationFn)", res);
  };

  const handleBeginCourse = async () => {
    const res = await postBeginCourse();
    if (res === null) return;
    setStep(0.1);
  };

  return (
    <>
      <p>Current Step: {step.toFixed(1)}</p>
      <button onClick={() => handleBeginCourse()}>Begin Course</button>
      {step > 0 && (
        <div>
          <p>Current Step: {step}</p>
          <button onClick={() => handleStepUnlock(step)}>
            {isPending ? "..." : "Next Step"}
          </button>
        </div>
      )}
    </>
  );
}
