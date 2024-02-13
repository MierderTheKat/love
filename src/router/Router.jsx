import { Route, Routes, useLocation } from "react-router-dom";

// Vistas
import HomeView from "@/App";
import GenerateView from "@/Generate";

const Router = () => {
  // Detecta el cambio de pantalla y hacer transicion
  const location = useLocation();
  return (
    // Indicamos con el key pathname es el url en la linea de Routes
    <Routes location={location} key={location.pathname}>
      {/* Vistas */}
      <Route path="*" element={<HomeView />} />
      <Route path="/" element={<HomeView />} />
      <Route path="/generate" element={<GenerateView />} />
    </Routes>
  );
};

export default Router;
