import CommunityCard from "./CommunityCard";
import LivePriceNewsBar from "./LivePriceNewsBar";
import ProgressBar from "./ProgressBar";
import ReportsCard from "./ReportsCard";
import StudyCard from "./StudyCard";

import "../../styles/dashboard/dashboard-container.css";
export default function Dashboard() {
  return (
    <div className="dashboard-wrap">
      <ProgressBar />
      <CommunityCard />
      <ReportsCard />
      <StudyCard />
      <LivePriceNewsBar />
    </div>
  );
}
