import { useEffect, useState } from "react";
import { getContent, useContentClient } from "../../services/contentClient";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../shared/components/Button";
import { getObjective } from "../../services/courseClient";

export default function EditContent() {
  const { objectiveId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["content", objectiveId],
    queryFn: () => getContent(objectiveId),
    enabled: !!objectiveId,
  });

  const { data: objective } = useQuery({
    queryKey: ["objective", objectiveId],
    queryFn: () => getObjective(objectiveId),
    enabled: !!objectiveId,
  });

  const { updateContent, createContent } = useContentClient();

  // Update to session storage state and manage refresh
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (data?.text !== undefined) {
      setContent(data.text);
    }
  }, [data?.text]);

  const handleUpdate = () => {
    if (!objectiveId) return;
    updateContent.mutate({ text: content, objectiveId });
  };
  const handleCreate = () => {
    if (!objectiveId) return;
    createContent.mutate(objectiveId);
  };

  if (isLoading) return <p>Loading...</p>;
  // NEED TO FIX REFRESH DATA
  return (
    <div className="edit-content-wrap">
      {objective && <h2>{objective.description}</h2>}
      {data?.text ? (
        <>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="No content found"
          >
            {content}
          </textarea>
          <Button onClick={handleUpdate}>Save Content</Button>
        </>
      ) : (
        <Button onClick={handleCreate}>Create Content</Button>
      )}
    </div>
  );
}
