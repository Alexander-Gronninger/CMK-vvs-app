import { Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import ContextProvider from "./context/ContextProvider";
import Version3Measure from "./pages/Version3Measure";
import Version3Suggested from "./pages/Version3Suggested";
import ExportSettings from "./pages/ExportSettings";
import Ref from "./pages/Ref";
import Version3Nav from "./templates/Version3Nav";
import GF2Version from "./pages/GF2Version";
import GF2Nav from "./templates/GF2Nav";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Welcome />} key="Welcome" />
        <Route path="/GF2/*" element={<GF2Nav />} key="GF2Nav">
          <Route path="export" element={<ExportSettings />} key="Export" />
          <Route path="ref" element={<Ref />} key="Ref" />
          <Route path="" element={<GF2Version />} key="GF2Version" />
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
