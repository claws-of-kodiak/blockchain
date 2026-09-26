import { useCourseClient } from "../../services/courseClient";
import DeleteBin from "../../shared/components/DeleteBin";

export default function SectionCard({ payload }) {
  const { sectionId, title, objectives, createdAt } = payload;
  const { deleteSection } = useCourseClient();

  return (
    <div className="section-card">
      <h3>{title}</h3>
      <ul>
        {objectives &&
          objectives.map((obj) => (
            <li key={obj.id}>
              {obj.label} - {obj.description}
            </li>
          ))}
      </ul>
      <p>Created at: {createdAt}</p>
      <DeleteBin onClick={() => deleteSection.mutate(sectionId)} />
    </div>
  );
}
