"""Amplitude total, desvio médio, variância e desvio padrão (docs/02 §4)."""
import math
from fractions import Fraction

from .formatacao import F, d, fmt, ig, ltx, unid
from .passos import Passo, tabela
from .teclas import teclas


def amplitude(xmin, xmax, unidade=None):
    at = xmax - xmin
    return at, Passo(
        "Amplitude total", "Aula 03 · Amplitude total / Apostila p.32",
        formula_latex=r"AT = x_{max} - x_{min}",
        substituicao_latex=rf"AT={ltx(d(xmax))}-{ltx(d(xmin))}",
        linhas=[f"Maior valor: {d(xmax)}. Menor valor: {d(xmin)}.", f"{d(xmax)} − {d(xmin)} = {d(at)}"],
        resultado=d(at), interpretacao=f"Do menor ao maior valor, a distância é {d(at)}{unid(unidade)}.",
        dica="A AT olha só os extremos: dois conjuntos diferentes podem ter a mesma AT.",
        teclas_calculadora=teclas(f"{d(xmax)}−{d(xmin)}"),
    )


def desvio_medio(xs, ns, m, pond=False, unidade=None):
    """Retorna (dm, soma_dos_módulos, soma_sem_módulo, Passo)."""
    N = sum(ns)
    difs = [x - m for x in xs]
    mods = [abs(v) for v in difs]
    soma_mod = sum(n * v for n, v in zip(ns, mods))
    soma_sem = sum(n * v for n, v in zip(ns, difs))
    dm = soma_mod / N
    linhas = [
        f"1) A média é {fmt(m)}.",
        "2) Diferença de cada valor para a média: xi − x̄.",
        "3) Valor absoluto (módulo) de cada diferença: o sinal some.",
    ]
    if pond:
        linhas.append("4) Somamos os módulos, cada um multiplicado por ni: " + " + ".join(f"{d(n)}×{fmt(v)}" for n, v in zip(ns, mods)) + f" = {fmt(soma_mod)}")
        tab = tabela(["xi", "ni", "xi − x̄", "|xi − x̄|", "ni · |xi − x̄|"],
                     [[d(x), d(n), fmt(df), fmt(md), fmt(n * md)] for x, n, df, md in zip(xs, ns, difs, mods)],
                     ["Total", d(N), "", "", fmt(soma_mod)])
    else:
        linhas.append("4) Somamos os módulos: " + " + ".join(fmt(v) for v in mods) + f" = {fmt(soma_mod)}")
        tab = tabela(["xi", "xi − x̄", "|xi − x̄|"], [[d(x), fmt(df), fmt(md)] for x, df, md in zip(xs, difs, mods)],
                     ["Total", fmt(soma_sem), fmt(soma_mod)])
    linhas += [f"5) Dividimos pela quantidade ({d(N)}): {fmt(soma_mod)} ÷ {d(N)} {ig(dm)}"]
    dica = None
    if soma_sem == 0:
        dica = "Sem o módulo, as diferenças se anulam: a soma de xi − x̄ dá 0. Por isso usamos o valor absoluto."
    p = Passo(
        "Desvio médio", "Aula 03 · Desvio médio / Apostila p.32",
        formula_latex=r"dm=\frac{|x_1-\bar{x}|+\dots+|x_k-\bar{x}|}{k}=\frac{\sum|x_i-\bar{x}|}{k}",
        substituicao_latex=rf"dm=\frac{{{ltx(fmt(soma_mod))}}}{{{ltx(d(N))}}}",
        linhas=linhas, tabela=tab, resultado=("" if ig(dm).startswith("=") else "≅ ") + fmt(dm),
        interpretacao=f"Em média, os valores se afastam {fmt(dm)}{unid(unidade)} da média.",
        dica=dica, teclas_calculadora=teclas(f"{fmt(soma_mod)}÷{d(N)}"),
    )
    return dm, soma_mod, soma_sem, p


def variancia(xs, ns, m, populacao, pond=False, unidade=None):
    """Retorna (variância, soma dos quadrados, Passo). Pop. divide por N; amostra por N − 1 (Bessel)."""
    N = sum(ns)
    quad = [(x - m) ** 2 for x in xs]
    S = sum(n * q for n, q in zip(ns, quad))
    div = N if populacao else N - 1
    var = S / div
    simbolo = "σ²" if populacao else "s²"
    linhas = [
        f"1) A média é {fmt(m)}.",
        "2) Subtraímos a média de cada valor e elevamos ao quadrado: assim desvios positivos e negativos não se anulam.",
    ]
    if pond:
        for x, n, q in zip(xs, ns, quad):
            linhas.append(f"{d(x)} aparece {d(n)} vez(es): {d(n)} × ({d(x)} − {fmt(m)})² = {d(n)} × {fmt(q)} = {fmt(n * q)}")
        tab = tabela(["xi", "ni", "(xi − x̄)²", "ni · (xi − x̄)²"],
                     [[d(x), d(n), fmt(q), fmt(n * q)] for x, n, q in zip(xs, ns, quad)], ["Total", d(N), "", fmt(S)])
    else:
        tab = tabela(["xi", "xi − x̄", "(xi − x̄)²"],
                     [[d(x), fmt(x - m), fmt(q)] for x, q in zip(xs, quad)], ["Total", "", fmt(S)])
    linhas.append("3) Somamos os quadrados: " + (" + ".join(fmt(n * q) for n, q in zip(ns, quad))) + f" = {fmt(S)}")
    if populacao:
        linhas.append(f"4) Os dados são a população inteira: dividimos por N = {d(N)}.")
        formula = r"\sigma^2=\frac{\sum_{i=1}^{k}(x_i-\bar{x})^2}{k}"
        dica = None
    else:
        linhas.append(f"4) Os dados são uma amostra: dividimos por n − 1 = {d(N)} − 1 = {d(div)} (correção de Bessel).")
        formula = r"s^2=\frac{\sum_{i=1}^{k}(x_i-\bar{x})^2}{k-1}"
        dica = "Por que n − 1? Ao usar uma amostra para estimar a variabilidade da população, fazemos esse ajuste (correção de Bessel). Quanto maior a amostra, menor a diferença."
    linhas.append(f"{simbolo} = {fmt(S)} ÷ {d(div)} {ig(var)}")
    p = Passo(
        f"Variância {'populacional' if populacao else 'amostral'}",
        "Aula 04 · Variância " + ("populacional" if populacao else "amostral") + " / Apostila p.33",
        formula_latex=formula, substituicao_latex=rf"{simbolo.replace('σ²', r'\sigma^2').replace('s²', 's^2')}=\frac{{{ltx(fmt(S))}}}{{{ltx(d(div))}}}",
        linhas=linhas, tabela=tab, resultado=("" if ig(var).startswith("=") else "≅ ") + fmt(var),
        interpretacao=f"A variância é {fmt(var)}{unid(unidade, True)} (a unidade fica ao quadrado, por isso o desvio padrão é mais intuitivo).",
        dica=dica, teclas_calculadora=teclas(f"{fmt(S)}÷{d(div)}"),
    )
    return var, S, p


def raiz(x) -> Fraction:
    """√x: exata se for quadrado perfeito racional, senão aproximação em float (só para exibir)."""
    x = F(x)
    a, b = math.isqrt(x.numerator), math.isqrt(x.denominator)
    if a * a == x.numerator and b * b == x.denominator:
        return Fraction(a, b)
    return F(math.sqrt(x))


def desvio_padrao(var, populacao, unidade=None, fonte_div=None):
    """Retorna (desvio padrão, Passo). Notação dos slides: σ (população) e s (amostra) — D-02."""
    sd = raiz(var)
    simbolo = "σ" if populacao else "s"
    simvar = "σ²" if populacao else "s²"
    p = Passo(
        "Desvio padrão", "Aula 05 · Desvio padrão / Apostila p.34",
        formula_latex=(r"\sigma=\sqrt{\sigma^2}" if populacao else r"s=\sqrt{s^2}"),
        substituicao_latex=rf"{'\\sigma' if populacao else 's'}=\sqrt{{{ltx(fmt(var))}}}",
        linhas=[f"Tiramos a raiz quadrada da variância: {simbolo} = √{simvar}", f"√{fmt(var)} {ig(sd)}"],
        resultado=("" if ig(sd).startswith("=") else "≅ ") + fmt(sd),
        interpretacao=f"O desvio padrão é {fmt(sd)}{unid(unidade)}: a mesma unidade dos dados.",
        teclas_calculadora=teclas(f"√{fmt(var, 10)}"),
    )
    return sd, p
