import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Homepage";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}