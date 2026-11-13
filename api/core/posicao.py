"""Média, mediana, moda e quartis (docs/02 §3 e §5.4). Cada função devolve valor e Passo."""
from collections import Counter
from fractions import Fraction

from .formatacao import d, fmt, ig, ltx, unid
from .passos import Passo, tabela
from .teclas import teclas

CLASSES_MODA = {1: "unimodal", 2: "bimodal"}


def soma(xs):
    s = sum(xs)
    termos = " + ".join(d(x) for x in xs)
    return s, Passo(
        "Soma dos valores", "Aula 02 · Média aritmética simples / Apostila p.24",
        formula_latex=r"\sum_{i=1}^{k} x_i",
        linhas=[f"Somamos termo a termo: {termos} = {d(s)}"],
        resultado=d(s), teclas_calculadora=teclas(termos),
    )


def media(xs, ns, pond=False, unidade=None):
    """Média simples (pond=False, cada x vale 1) ou ponderada (xs com frequências ns)."""
    N = sum(ns)
    S = sum(x * n for x, n in zip(xs, ns))
    m = S / N
    if not pond:
        p = Passo(
            "Média aritmética", "Aula 02 · Média aritmética simples / Apostila p.24",
            formula_latex=r"\bar{x}=\frac{x_1+x_2+\dots+x_k}{k}=\frac{\sum_{i=1}^{k}x_i}{k}",
            substituicao_latex=rf"\bar{{x}}=\frac{{{ltx(d(S))}}}{{{ltx(d(N))}}}",
            linhas=[
                f"Somamos todos os valores: {d(S)}",
                f"Dividimos pela quantidade de valores: {d(N)}",
                f"{d(S)} ÷ {d(N)} {ig(m)}",
            ],
            teclas_calculadora=teclas(f"{d(S)}÷{d(N)}"),
        )
    else:
        prods = [f"{d(x)} × {d(n)} = {d(x * n)}" for x, n in zip(xs, ns)]
        p = Passo(
            "Média aritmética ponderada", "Aula 02 · Média aritmética ponderada / Apostila p.25",
            formula_latex=r"\bar{x}_p=\frac{x_1 n_1+x_2 n_2+\dots+x_k n_k}{n_1+n_2+\dots+n_k}=\frac{\sum x_i n_i}{\sum n_i}",
            substituicao_latex=rf"\bar{{x}}_p=\frac{{{ltx(d(S))}}}{{{ltx(d(N))}}}",
            linhas=prods + [
                "Somamos os produtos: " + " + ".join(d(x * n) for x, n in zip(xs, ns)) + f" = {d(S)}",
                "Somamos as frequências: " + " + ".join(d(n) for n in ns) + f" = {d(N)}",
                f"{d(S)} ÷ {d(N)} {ig(m)}",
            ],
            tabela=tabela(["xi", "ni", "xi · ni"], [[d(x), d(n), d(x * n)] for x, n in zip(xs, ns)], ["Total", d(N), d(S)]),
            teclas_calculadora=teclas("(" + "+".join(f"{d(x)}×{d(n)}" for x, n in zip(xs, ns)) + f")÷{d(N)}"),
        )
    p.resultado = fmt(m) if ig(m).startswith("=") else "≅ " + fmt(m)
    p.interpretacao = f"A média é {fmt(m)}{unid(unidade)}."
    return m, p


def _mediana_de(lista):
    n = len(lista)
    if n % 2:
        return lista[n // 2]
    return (lista[n // 2 - 1] + lista[n // 2]) / 2


def mediana(rol, unidade=None):
    n = len(rol)
    if n % 2:
        pos = (n + 1) // 2
        me = rol[pos - 1]
        linhas = [
            f"São {n} valores (quantidade ímpar): a mediana é o valor da posição (n+1)/2.",
            f"({n} + 1) ÷ 2 = {pos}, então é o {pos}º valor do rol.",
            f"O {pos}º valor é {d(me)}.",
        ]
        destaque, tecl = [pos - 1], []
        sub = rf"Me=x_{{{pos}}}={ltx(d(me))}"
    else:
        a, b = n // 2, n // 2 + 1
        me = (rol[a - 1] + rol[b - 1]) / 2
        linhas = [
            f"São {n} valores (quantidade par): a mediana é a média dos dois valores do meio, as posições n/2 e n/2 + 1.",
            f"{n} ÷ 2 = {a} e {a} + 1 = {b}: são o {a}º e o {b}º valores.",
            f"O {a}º valor é {d(rol[a - 1])} e o {b}º é {d(rol[b - 1])}.",
            f"({d(rol[a - 1])} + {d(rol[b - 1])}) ÷ 2 = {d(rol[a - 1] + rol[b - 1])} ÷ 2 {ig(me)}",
        ]
        destaque = [a - 1, b - 1]
        tecl = teclas(f"({d(rol[a - 1])}+{d(rol[b - 1])})÷2")
        sub = rf"Me=\frac{{{ltx(d(rol[a - 1]))}+{ltx(d(rol[b - 1]))}}}{{2}}"
    p = Passo(
        "Mediana", "Aula 02 · Mediana / Apostila p.25",
        formula_latex=r"Me = x_{\frac{n+1}{2}}\ (n\ \text{ímpar}) \qquad Me=\frac{x_{n/2}+x_{n/2+1}}{2}\ (n\ \text{par})",
        substituicao_latex=sub, linhas=linhas,
        tabela=tabela(["Posição", "Valor"], [[i + 1, d(v)] for i, v in enumerate(rol)], destaque=destaque),
        resultado=fmt(me) if ig(me).startswith("=") else "≅ " + fmt(me),
        interpretacao=f"Metade dos valores fica abaixo de {fmt(me)}{unid(unidade)} e metade acima.",
        dica="Ordenar antes é obrigatório: sem o rol a mediana pode sair errada.",
        teclas_calculadora=tecl,
    )
    return me, p


def moda(pares):
    """pares = [(valor, frequência)]. Slides A2: unimodal, bimodal, multimodal, amodal (D-01)."""
    freq = sorted(pares)
    maxf = max(n for _, n in freq)
    modas = [v for v, n in freq if n == maxf]
    if len(freq) > 1 and len(modas) == len(freq):
        modas, classe = [], "amodal"
    else:
        classe = CLASSES_MODA.get(len(modas), "multimodal")
    if classe == "amodal":
        fim = "Todos os valores aparecem o mesmo número de vezes, então não há moda (amodal)."
    else:
        fim = f"Maior frequência: {d(maxf)}. Moda = {'; '.join(d(m) for m in modas)} ({classe})."
    p = Passo(
        "Moda", "Aula 02 · Moda / Apostila p.26",
        linhas=["Contamos quantas vezes cada valor aparece e olhamos o maior número.", fim],
        tabela=tabela(["Valor", "Repetições"], [[d(v), d(n)] for v, n in freq],
                      destaque=[i for i, (_, n) in enumerate(freq) if n == maxf and classe != "amodal"]),
        resultado="amodal (não há moda)" if classe == "amodal" else "; ".join(d(m) for m in modas),
        dica="Os slides chamam de bimodal quando há duas modas; a apostila usa outra convenção (D-01). O app segue os slides.",
    )
    return modas, classe, p


def quartis(rol):
    """Q1 = mediana dos valores abaixo da mediana; Q3 = dos valores acima (docs/02 §5.4)."""
    n = len(rol)
    metade = n // 2
    inf, sup = rol[:metade], rol[metade + n % 2:]
    q1, q2, q3 = _mediana_de(inf), _mediana_de(rol), _mediana_de(sup)
    linhas = [
        f"Q2 é a mediana do conjunto: {d(q2)}.",
        ("Como n é ímpar, a mediana fica de fora das duas metades." if n % 2 else "Como n é par, o rol se divide em duas metades iguais."),
        f"Metade inferior: {', '.join(d(v) for v in inf)} → Q1 = {d(q1)}.",
        f"Metade superior: {', '.join(d(v) for v in sup)} → Q3 = {d(q3)}.",
    ]
    p = Passo(
        "Quartis", "Aula 06 · Quartis / Apostila p.41", linhas=linhas,
        resultado=f"Q1 = {fmt(q1)} · Q2 = {fmt(q2)} · Q3 = {fmt(q3)}",
        tabela=tabela(["Quartil", "Valor"], [["Q1", fmt(q1)], ["Q2", fmt(q2)], ["Q3", fmt(q3)]]),
    )
    return q1, q2, q3, p


def contar(xs):
    return sorted(Counter(xs).items())
