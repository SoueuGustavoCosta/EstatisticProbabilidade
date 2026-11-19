"""Amostragem sistemática e estratificada (docs/02 §1.2; arredondamento P-07 do docs/08)."""
import math
from fractions import Fraction

from .formatacao import F, d, fmt, ig
from .passos import Passo, tabela
from .teclas import teclas


def sistematica(N, n, inicio=None):
    """k = N/n, arredondado para o inteiro menor. Devolve (k, elementos, [Passo], avisos)."""
    N, n = int(N), int(n)
    if N <= 0 or n <= 0 or n > N:
        raise ValueError("Precisamos de 0 < n ≤ N (a amostra não pode ser maior que a população).")
    k_exato = Fraction(N, n)
    k = math.floor(k_exato)
    f = "Aula 01 · Amostragem sistemática"
    passos = [Passo("Intervalo da amostragem", f, formula_latex=r"k=\frac{N}{n}", substituicao_latex=rf"k=\frac{{{N}}}{{{n}}}",
                    linhas=["k é o intervalo (passo); N é o tamanho da população; n é o tamanho da amostra.", f"{N} ÷ {n} {ig(k_exato)}"]
                    + ([f"Não deu inteiro: arredondamos para o inteiro menor → k = {k}."] if k_exato.denominator != 1 else []),
                    resultado=f"k = {k}", teclas_calculadora=teclas(f"{N}÷{n}"),
                    interpretacao=f"Depois do ponto de partida, pegamos 1 elemento a cada {k}.")]
    avisos, elementos = [], []
    if inicio is not None:
        inicio = int(inicio)
        elementos = [inicio + i * k for i in range(n)]
        dentro = [e for e in elementos if e <= N]
        if len(dentro) < n:
            avisos.append(f"Com o ponto de partida {inicio}, só {len(dentro)} dos {n} elementos cabem na população de {N}.")
        elementos = dentro
        passos.append(Passo("Elementos sorteados", f, linhas=[f"Ponto de partida: {inicio}. Somamos k = {k} a cada passo:"]
                            + [(f"{e}" if i == 0 else f"{elementos[i - 1]} + {k} = {e}") for i, e in enumerate(elementos)],
                            resultado=", ".join(str(e) for e in elementos),
                            dica=f"O ponto de partida é sorteado entre 1 e {k}." if inicio > k else None))
    else:
        passos.append(Passo("Ponto de partida", f, linhas=[f"Sorteie um número entre 1 e {k}. Ele é o primeiro elemento; depois some {k} a cada passo."]))
    return k, elementos, passos, avisos


def _arredonda_mantendo_total(exatos: dict, n: int) -> dict:
    """Arredonda cada valor e garante que a soma seja exatamente n (decisão P-07, revista em 17/11/2026).
    Primeiro pega a parte inteira; as unidades que faltam vão para os estratos com a maior parte decimal."""
    final = {k: math.floor(v) for k, v in exatos.items()}
    faltam = n - sum(final.values())
    for k in sorted(exatos, key=lambda k: exatos[k] - final[k], reverse=True)[:faltam]:
        final[k] += 1
    return final


def estratificada(estratos: dict, n):
    """Cada estrato recebe (tamanho ÷ N) × n, arredondado sem mudar o total da amostra (decisão P-07).
    Devolve ({estrato: valor}, [Passo], avisos)."""
    n = int(n)
    tam = {k: F(v) for k, v in estratos.items()}
    N = sum(tam.values())
    if N <= 0 or n <= 0:
        raise ValueError("Informe o tamanho dos estratos e da amostra.")
    f = "Aula 01 · Amostragem estratificada"
    exatos = {k: v / N * n for k, v in tam.items()}
    final = _arredonda_mantendo_total(exatos, n)
    quebrados = any(v.denominator != 1 for v in exatos.values())
    linhas, tl = [f"População total: {' + '.join(d(v) for v in tam.values())} = {d(N)}.", "Cada estrato mantém a mesma proporção da população: (estrato ÷ N) × n."], []
    for k in tam:
        linhas.append(f"{k}: ({d(tam[k])} ÷ {d(N)}) × {n} {ig(exatos[k])}" + ("" if exatos[k].denominator == 1 else f" → {final[k]}"))
        tl.append([k, d(tam[k]), fmt(exatos[k]), final[k]])
    if quebrados:
        linhas.append(f"Como não deu inteiro, arredondamos sem mudar o total: cada estrato fica com a parte inteira e as unidades que faltam para chegar a {n} vão para os estratos com a maior parte decimal.")
    soma = sum(final.values())
    linhas.append(f"Conferência: {' + '.join(str(v) for v in final.values())} = {soma} (a amostra pedida é {n}).")
    p = Passo("Elementos de cada estrato", f, formula_latex=r"n_{estrato}=\frac{N_{estrato}}{N}\times n", linhas=linhas,
              tabela=tabela(["Estrato", "Tamanho", "Valor exato", "Na amostra"], tl, ["Total", d(N), "", soma]),
              resultado=", ".join(f"{k}: {v}" for k, v in final.items()),
              dica="Quando não dá número inteiro, arredondamos de forma que a soma continue igual ao tamanho da amostra." if quebrados else None,
              teclas_calculadora=teclas(f"{d(next(iter(tam.values())))}÷{d(N)}×{n}"))
    return final, [p], []
