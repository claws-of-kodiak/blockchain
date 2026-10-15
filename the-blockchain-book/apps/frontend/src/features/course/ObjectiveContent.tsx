import { useQuery } from "@tanstack/react-query";
import { getContent } from "../../services/contentClient";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { useProgress } from "../../shared/hooks/useProgress";

export default function ObjectiveContent() {
  const { objectiveId } = useProgress().details;

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", objectiveId],
    queryFn: () => getContent(objectiveId),
    enabled: !!objectiveId,
  });

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="content-sidebar">
      <p>{data ? data.text : "No content from admin"}</p>
    </div>
  );
}
