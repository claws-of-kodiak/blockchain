import { useState } from "react";

export default function ProgressPage() {
  const [step, setStep] = useState<number>(0);

  const handleStepUnlock = (step: number) => {
    setStep(step + 0.1);
  };

  return (
    <>
      <p>Current Step: {step.toFixed(1)}</p>
      <button onClick={() => handleStepUnlock(step)}>Next Step</button>
    </>
  );
}
