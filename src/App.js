import { Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import ContextProvider from "./context/ContextProvider";
import Version3Measure from "./pages/Version3Measure";
import Version3Suggested from "./pages/Version3Suggested";
import ExportSettings from "./pages/ExportSettings";
import Ref from "./pages/Ref";
import Version2Create from "./pages/Version2Create";
import Version2Assignment from "./pages/Version2Assignment";
import Version2Nav from "./templates/Version2Nav";
import Version3Nav from "./templates/Version3Nav";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Welcome />} key="Welcome" />
        <Route path="/v2/*" element={<Version2Nav />} key="Nav">
          <Route path="export" element={<ExportSettings />} key="Export" />
          <Route path="ref" element={<Ref />} key="Ref" />
          <Route
            path="create"
            element={<Version2Create />}
            key="Version2Create"
          />
          <Route
            path="assignment"
            element={<Version2Assignment />}
            key="Assignment"
          />
        </Route>
        <Route path="v3/*" element={<Version3Nav />} key="Version3">
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
          <Route path="share" element={<ExportSettings />} key="Version3" />
        </Route>
        <Route path="/ref" element={<Ref />} key="Ref" />
      </Routes>
    </ContextProvider>
  );
}

export default App;
