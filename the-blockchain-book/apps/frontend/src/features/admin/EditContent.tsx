import { useState } from "react";
import { getContent, useContentClient } from "../../services/contentClient";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../shared/components/Button";

export default function EditContent() {
  const { objectiveId } = useParams();
  const { data } = useQuery({
    queryKey: ["content", objectiveId],
    queryFn: () => getContent(objectiveId),
    enabled: !!objectiveId,
  });
  const { updateContent, createContent } = useContentClient();

  const [content, setContent] = useState<string>(data?.content.text || "");

  const handleUpdate = () => {
    updateContent.mutate({ text: content, objectiveId });
    console.log("TIRGGER UPDATE");
  };
  const handleCreate = () => {
    createContent.mutate(objectiveId);
  };

  // NEED TO FIX REFRESH DATA
  return (
    <div className="edit-content-wrap">
      <h2>Content for Objective</h2>
      {data?.content.text ? (
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
