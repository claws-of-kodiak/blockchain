import { useProgress } from "../../context/useProgress";
import ErrorMsg from "../../shared/components/ErrorMsg";

export default function GetProgress() {
  const { currentStep, error } = useProgress();

  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <>
      <p> CurrentStep: {currentStep}</p>
    </>
  );
}
