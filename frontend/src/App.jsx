import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RedirectPage from "./components/RedirectPage";
import Dashboard from "./components/Dashbord";
import StatsPage from "./components/StatsPage";
import HealthPage from "./components/HealthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/:code" element={<RedirectPage />} />
        <Route path="/code/:code" element={<StatsPage/>} />
        <Route path="/healthz" element={<HealthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
