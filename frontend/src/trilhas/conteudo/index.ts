import { Trilha } from "../tipos";
import { T1, T2, T3, T4 } from "./t01a04";
import { T5, T6, T7, T8 } from "./t05a08";
import { T10, T11, T12, T13, T9 } from "./t09a13";

export const CONTEUDO: Trilha[] = [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13];
export const trilhaPorNum = (n: number) => CONTEUDO.find((t) => t.num === n);
