import CommunityCard from "./CommunityCard";
import LivePriceNewsBar from "./LivePriceNewsBar";
import ProgressBar from "./ProgressBar";
import ReportsCard from "./ReportsCard";
import StudyCard from "./StudyCard";

// Need to create and import css style page

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
