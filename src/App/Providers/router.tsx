import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../../Pages/HomePages";
import { Header } from "../../Shared/Ui/Header";
import { Footer } from "../../Shared/Ui/Footer";
import { CarPage } from "../../Pages/carPages";

export const AppRouterr = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <BrowserRouter>
      <Header onSearch={setQuery} />
    <main>
      <Routes>
        <Route path="/" element={<HomePage query={query} />} />
        <Route path="/car/:id" element={<CarPage />} />
      </Routes>
    </main>
    <Footer />
    </BrowserRouter>
  );
};