import { useEffect, useState } from "react";
import { getContent, useContentClient } from "../../services/contentClient";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../shared/components/Button";
import { getObjective } from "../../services/courseClient";
import SectionHeader from "./SectionHeader";
import PageLoading from "../../shared/components/PageLoading";

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
  // Consider creating client hook content components (video, text, quiz, etc.)
  // The content table should no longer just hold text but have keys that point to the contents component tables.
  // Need some sort of edit shortcuts. Drag and drop components to reorder. Add new components. Delete components. Each component should have its own edit UI.

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

  if (isLoading) return <PageLoading />;
  return (
    <div className="edit-content-wrap">
      <SectionHeader
        label={objective?.label}
        description={objective.description}
      />
      {data?.text ? (
        <>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="No content found"
          >
            {content}
          </textarea>
          {/* <textarea
            onChange={(e) => setQuestions(e.target.value)}
            value={questions}
            placeholder="No questions found"
          >
            {questions}
          </textarea> */}
          <Button onClick={handleUpdate}>Save Content</Button>
        </>
      ) : (
        <Button onClick={handleCreate}>Create Content</Button>
      )}
    </div>
  );
}
