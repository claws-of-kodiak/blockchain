import Header from "../shared/components/Header";
// import StepControl from "../features/course/StepControl";
import "../styles/course-page.css";
import "../styles/course/course-container.css";
import DisplayContent from "../features/course/DisplayContent";
import SectionProgressBar from "../shared/components/SectionProgressBar";
import SideBarDetails from "../features/course/SideBarDetails";
import { useCourse } from "../shared/hooks/useCourse";

export default function CoursePage() {
  const { sections, objectives, isLoading } = useCourse();

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Loading course...</p>
      ) : (
        <div className="progress-layout">
          <SectionProgressBar variant="course" sections={sections} />
          <main className="progress-main">
            <DisplayContent />
          </main>

          <aside>
            <SideBarDetails sections={sections} objectives={objectives} />
          </aside>
        </div>
      )}
    </>
  );
}
