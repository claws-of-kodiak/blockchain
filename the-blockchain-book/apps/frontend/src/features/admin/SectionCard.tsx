export default function SectionCard({ payload }) {
  const { title, objectives, createdAt, updatedAt } = payload;

  console.log(payload);

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
      <p>Last update: {updatedAt}</p>
    </div>
  );
}
