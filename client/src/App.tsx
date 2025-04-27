import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    //<Switch>
      <Home />
    //</Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
