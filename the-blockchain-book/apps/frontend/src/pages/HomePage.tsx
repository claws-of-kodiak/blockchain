import GetProgress from "../features/progress/GetProgress";
import Header from "../shared/components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div id="home-page">
        <h2>You are official a blockchain student.</h2>
        <p>There is a lot of cool stuff coming soon.</p>
        <GetProgress />
      </div>
    </>
  );
}
