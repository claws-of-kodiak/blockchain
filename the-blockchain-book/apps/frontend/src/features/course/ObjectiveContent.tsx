import { useParams } from "react-router";

export default function ObjectiveContent() {
  const { currentObjective } = useParams();
  // Insert useContent hook to pull content from specific objective

  return (
    <div className="content-sidebar">
      <p>Display the content from {currentObjective}</p>
    </div>
  );
}
