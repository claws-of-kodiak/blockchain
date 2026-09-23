import { useRoutes } from "react-router";
import { routeList } from "./routes";

const AppRoutes = () => {
  let routes = useRoutes(routeList);
  return routes;
};

function App() {
  return (
    <>
      <section id="center">
        <AppRoutes />
      </section>
    </>
  );
}

export default App;
