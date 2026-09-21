import { useProgress } from "../../context/ProgressContext";

export default function GetProgress() {
  const { isLoading, refetch } = useProgress();

  return (
    <>
      <p> Loading? {isLoading}</p>

      <button onClick={() => refetch()}>Refresh</button>
    </>
  );
}
