import { Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Assignment from "./pages/Assignment";
import Nav from "./templates/Nav";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Welcome />} key="Welcome" />
        <Route path="/*" element={<Nav />} key="Nav">
          <Route path="create" element={<Create />} key="Create" />
          <Route path="assignment" element={<Assignment />} key="Assignment" />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
