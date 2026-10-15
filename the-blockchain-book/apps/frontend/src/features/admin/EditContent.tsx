import { useState } from "react";
import { getContent, useContentClient } from "../../services/contentClient";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../shared/components/Button";

export default function EditContent() {
  const { objectiveId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: () => getContent(objectiveId),
    enabled: !!objectiveId,
  });

  const { updateContent, createContent } = useContentClient();

  // Update to session storage state and manage refresh
  const [content, setContent] = useState<string>(data?.text || "");

  const handleUpdate = () => {
    updateContent.mutate({ text: content, objectiveId });
  };
  const handleCreate = () => {
    createContent.mutate(objectiveId);
  };

  if (isLoading) return <p>Loading...</p>;
  // NEED TO FIX REFRESH DATA
  return (
    <div className="edit-content-wrap">
      <h2>Content for Objective</h2>
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
