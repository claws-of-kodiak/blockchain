export default function SectionCard({ payload }) {
  const { title, objectives, created_at } = payload;

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
      {/* <span onClick={deleteSection(section_id)}>🗑️</span> */}
    </div>
  );
}
