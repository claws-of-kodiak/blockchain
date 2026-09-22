import { useProgress } from "../../hooks/useProgress";

export default function GetProgress() {
  const { currentStep, refetch } = useProgress();

  return (
    <>
      <p> Loading? {currentStep}</p>

      <button onClick={() => refetch()}>Refresh</button>
    </>
  );
}
