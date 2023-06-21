import { Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Assignment from "./pages/Assignment";
import Nav from "./templates/Nav";
import ContextProvider from "./context/ContextProvider";
import Version3 from "./pages/Version3";
import Version3Measure from "./pages/Version3Measure";
import Version3Suggested from "./pages/Version3Suggested";
import ExportSettings from "./pages/ExportSettings";
import Ref from "./pages/Ref";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Welcome />} key="Welcome" />
        <Route path="/*" element={<Nav />} key="Nav">
          <Route path="export" element={<ExportSettings />} key="Export" />
          <Route path="ref" element={<Ref />} key="Ref" />
          <Route path="create" element={<Create />} key="Create" />
          <Route path="assignment" element={<Assignment />} key="Assignment" />
          <Route path="v3/*" element={<Version3 />} key="Version3">
            <Route
              path="measurement"
              element={<Version3Measure />}
              key="Version3Measure"
            />
            <Route
              path="suggested"
              element={<Version3Suggested />}
              key="Version3Suggested"
            />
          </Route>
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
