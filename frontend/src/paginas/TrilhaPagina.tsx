import { useParams } from "react-router-dom";
import { useProgresso } from "../progresso/store";
import TrilhaPlayer from "../trilhas/TrilhaPlayer";
import { trilhaPorNum } from "../trilhas/conteudo";
import EmBreve from "./EmBreve";

export default function TrilhaPagina() {
  const { num } = useParams();
  const trilha = trilhaPorNum(Number(num));
  const { card, concluir, trilhas } = useProgresso();
  if (!trilha) return <EmBreve titulo="Trilha não encontrada" />;
  return <TrilhaPlayer key={trilha.num} trilha={trilha} concluidos={trilhas[trilha.num]?.cards ?? []} aoCard={(i, a, d) => card(trilha.num, i, a, d)} aoTerminar={() => concluir(trilha.num)} />;
}
