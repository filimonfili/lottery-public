import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Success from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
