import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getContent } from "../../services/contentClient";
import ErrorMsg from "../../shared/components/ErrorMsg";

export default function ObjectiveContent() {
  const { currentObjective } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", currentObjective],
    queryFn: () => getContent(`/course/content/${currentObjective}`),
    enabled: !!currentObjective,
  });

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="content-sidebar">
      <p>Display the query data: {data}</p>
    </div>
  );
}
