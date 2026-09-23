import { useProgress } from "../../context/useProgress";

export default function GetProgress() {
  const { currentStep, refetch } = useProgress();

  return (
    <>
      <p> Loading? {currentStep}</p>

      <button onClick={() => refetch()}>Refresh</button>
    </>
  );
}
