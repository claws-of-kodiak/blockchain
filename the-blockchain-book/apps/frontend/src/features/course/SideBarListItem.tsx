import type { Objective } from "@repo/validations";
import { useState } from "react";
import { authFetch } from "../../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import ErrorMsg from "../../shared/components/ErrorMsg";

interface SideBarListItemProps {
  objective: Objective;
}

const fetchEssentialQuestions = async (objectiveId: string) => {
  //   const res = await authFetch.get(
  //     `/objectives/${objectiveId}/essential-questions`
  //   );
  const res = [
    "Who is satoshi Nakomoto?",
    "What is blockchain?",
    "How does consensus work?",
  ];
  return res;
};

const SideBarListItem: React.FC<SideBarListItemProps> = ({ objective }) => {
  const [isActive, setIsActive] = useState(false);

  const {
    data: essentialQuestions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["essentialQuestions", objective.id],
    queryFn: () => fetchEssentialQuestions(objective.id),
  });

  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="sidebar-list-item">
      <div
        className="item-header"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        <p>
          {objective.label} - {objective.description}
        </p>
      </div>
      {isActive && (
        <div className="item-details">
          <ul>
            {essentialQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBarListItem;
