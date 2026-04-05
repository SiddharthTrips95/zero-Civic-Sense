import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing/LandingPage";
import MapPage from "./features/map/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;