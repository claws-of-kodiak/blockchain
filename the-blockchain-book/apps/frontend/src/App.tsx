import { useRoutes } from "react-router";
import { getRouteList } from "./routes";
import { useUser } from "./shared/hooks/useUser";

const AppRoutes = () => {
  const { isAdmin } = useUser();
  const list = getRouteList(isAdmin);
  let routes = useRoutes(list);
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
