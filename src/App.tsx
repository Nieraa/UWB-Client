import {
  Routes,
  Route,
} from "react-router-dom";
import Projects from './pages/Projects';
import Planner from './pages/Planner';
import Realtime from './pages/Realtime';
import History from './pages/History';

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Projects />}
      />
      <Route
        path="/:projectId/planner"
        element={<Planner />}
      />
      <Route
        path="/:projectId/realtime"
        element={<Realtime />}
      />
      <Route
        path="/:projectId/history"
        element={<History />}
      />
    </Routes>
  );
}

export default App;
