import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Animal from "./pages/Animal.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals/:id" element={<Animal />} />
    </Routes>
  );
}
