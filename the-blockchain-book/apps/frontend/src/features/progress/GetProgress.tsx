import ErrorMsg from "../../shared/components/ErrorMsg";
import { useProgress } from "../../shared/hooks/useProgress";

export default function GetProgress() {
  const { currentStep, error } = useProgress();

  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <>
      <p> CurrentStep: {currentStep}</p>
    </>
  );
}
