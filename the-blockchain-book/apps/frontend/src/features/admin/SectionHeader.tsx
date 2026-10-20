import { Button } from "../../shared/components/Button";

type SectionHeaderProps = {
  title?: string;
  label?: string;
  description?: string;
};

export default function SectionHeader({
  title,
  label,
  description,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h2>
        {title} {label} {description}
      </h2>
      <nav>
        <Button onClick={() => window.history.back()}>
          Return to {title ? "Sections" : "Objectives"}
        </Button>
      </nav>
    </header>
  );
}
