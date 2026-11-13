import { Route, Routes } from "react-router-dom";
import Calculadora from "./calculadora/Calculadora";
import Layout from "./componentes/Layout";
import Inicio from "./paginas/Inicio";
import Trilhas from "./paginas/Trilhas";
import EmBreve from "./paginas/EmBreve";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="trilhas" element={<Trilhas />} />
        <Route path="calculadora" element={<Calculadora />} />
        <Route path="laboratorio" element={<EmBreve titulo="Laboratório" fase="3" />} />
        <Route path="*" element={<EmBreve titulo="Página não encontrada" />} />
      </Route>
    </Routes>
  );
}
