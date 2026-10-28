import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen overflow-x-hidden bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Todas las rutas conducen a la Landing Oficial de KontaPro */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
