import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  //return <Home />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/chat" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
