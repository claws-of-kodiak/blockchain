import { useQuery } from "@tanstack/react-query";
import ErrorMsg from "../../shared/components/ErrorMsg";
import SectionCard from "./SectionCard";
import "../../styles/display-sections.css";

async function getAdminSections() {
  // const res = await authFetch.get("/course/all/admin");
  const res = [
    {
      title: "The First Objective",
      objectives: [
        {
          id: 1000,
          label: "1.1",
          description: "How to find Satoshi",
        },
      ],
      createdAt: "September 11, 2001",
      updatedAt: "October 23, 2012",
    },
  ];
  return res;
}

export default function DisplaySections() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getAdminSections,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <ErrorMsg msg={error.message} />;

  return (
    <div className="display-sections-wrap">
      {data &&
        data.map((section) => (
          <SectionCard key={section.title} payload={section} />
        ))}
    </div>
  );
}
