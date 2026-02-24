import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import CarDetail from "../Data/CarDetail";

export function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/search" element={<Content />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/cars" element={<div>Каталог</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
