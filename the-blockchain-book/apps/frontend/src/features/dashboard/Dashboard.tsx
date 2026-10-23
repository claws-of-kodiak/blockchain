import CommunityCard from "./CommunityCard";
import LivePriceNewsBar from "./LivePriceNewsBar";
import ReportsCard from "./ReportsCard";
import StudyCard from "./StudyCard";
import SectionProgressBar from "../../shared/components/SectionProgressBar";

import "../../styles/dashboard/dashboard-container.css";

export default function Dashboard() {
  return (
    <div className="dashboard-wrap">
      <SectionProgressBar variant="dashboard" />
      <CommunityCard />
      <ReportsCard />
      <StudyCard />
      <LivePriceNewsBar />
    </div>
  );
}
