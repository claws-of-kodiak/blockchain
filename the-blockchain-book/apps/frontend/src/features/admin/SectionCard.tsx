import { Link } from "react-router";
import { useCourseClient } from "../../services/courseClient";
import DeleteBin from "../../shared/components/DeleteBin";
import { FaEdit } from "react-icons/fa";

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
      <Link to={`/admin/section/${sectionId}`}>
        <FaEdit />
      </Link>
      <DeleteBin onClick={() => deleteSection.mutate(sectionId)} />
    </div>
  );
}
