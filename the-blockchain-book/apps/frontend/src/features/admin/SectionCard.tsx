import { useCourseClient } from "../../services/courseClient";

export default function SectionCard({ payload }) {
  const { section_id, title, objectives, created_at } = payload;
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
      <p>Created at: {created_at}</p>
      <span
        className="delete-span"
        onClick={() => deleteSection.mutate(section_id)}
      >
        🗑️
      </span>
    </div>
  );
}
