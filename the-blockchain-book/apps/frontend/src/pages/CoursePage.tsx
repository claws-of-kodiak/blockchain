import Header from "../shared/components/Header";
// import StepControl from "../features/course/StepControl";
import "../styles/course-page.css";
import "../styles/course/course-container.css";
import DisplayContent from "../features/course/DisplayContent";
import SectionProgressBar from "../shared/components/SectionProgressBar";
import SideBarDetails from "../features/course/SideBarDetails";

export default function CoursePage() {
  return (
    <>
      <Header />
      <div className="progress-layout">
        <SectionProgressBar variant="course" />
        <main className="progress-main">
          <DisplayContent />
          {/* <StepControl /> */}
        </main>

        <aside>
          <SideBarDetails />
        </aside>
      </div>
    </>
  );
}
