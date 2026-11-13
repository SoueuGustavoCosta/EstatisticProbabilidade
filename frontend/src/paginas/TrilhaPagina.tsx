import { useParams } from "react-router-dom";
import TrilhaPlayer from "../trilhas/TrilhaPlayer";
import { trilhaPorNum } from "../trilhas/conteudo";
import EmBreve from "./EmBreve";

export default function TrilhaPagina() {
  const { num } = useParams();
  const trilha = trilhaPorNum(Number(num));
  if (!trilha) return <EmBreve titulo="Trilha não encontrada" />;
  return <TrilhaPlayer key={trilha.num} trilha={trilha} />;
}
