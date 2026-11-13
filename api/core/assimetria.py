"""Coeficientes de assimetria (docs/02 §5). σ aqui é SEMPRE o desvio padrão populacional (D-03)."""
from fractions import Fraction

from .dispersao import raiz
from .formatacao import F, d, fmt, ig, ltx
from .passos import Passo
from .teclas import teclas

NOMES = {"simetrica": "simétrica", "assimetrica positiva": "assimétrica positiva", "assimetrica negativa": "assimétrica negativa"}
DICA_SIGMA = "Nos coeficientes de assimetria usamos o desvio padrão populacional (σ), como no exemplo 4.2 da apostila."


def classe(numerador) -> str:
    """Sinal exato do numerador: As = 0 simétrica; > 0 positiva; < 0 negativa."""
    n = F(numerador)
    return "simetrica" if n == 0 else ("assimetrica positiva" if n > 0 else "assimetrica negativa")


def _txt_classe(c):
    return NOMES[c]


def sigma_pop(xs, m):
    N = len(xs)
    var = sum((x - m) ** 2 for x in xs) / N
    return raiz(var), var


def _sem_sigma(titulo, fonte):
    return Passo(titulo, fonte, linhas=["O desvio padrão é 0: todos os valores são iguais, então não há assimetria para medir."],
                 resultado="não se aplica")


def pearson1(m, moda_unica, sigma, modas=None):
    """1º coeficiente de Pearson. Só existe com exatamente uma moda."""
    fonte = "Apostila p.39–40 · 1º coeficiente de Pearson"
    if moda_unica is None:
        return None, None, Passo("1º coeficiente de Pearson", fonte,
                                 formula_latex=r"A_s=\frac{\bar{x}-Mo}{\sigma}",
                                 linhas=["Este coeficiente precisa de uma moda única."],
                                 resultado="não se aplica (distribuição amodal/bimodal)")
    if sigma == 0:
        return None, None, _sem_sigma("1º coeficiente de Pearson", fonte)
    num = m - moda_unica
    a = num / sigma
    c = classe(num)
    return a, c, Passo(
        "1º coeficiente de Pearson", fonte, formula_latex=r"A_s=\frac{\bar{x}-Mo}{\sigma}",
        substituicao_latex=rf"A_s=\frac{{{ltx(fmt(m))}-{ltx(d(moda_unica))}}}{{{ltx(fmt(sigma))}}}",
        linhas=[f"x̄ − Mo = {fmt(m)} − {d(moda_unica)} = {fmt(num)}", f"σ (populacional) = {fmt(sigma)}", f"{fmt(num)} ÷ {fmt(sigma)} {ig(a)}",
                f"As {'= 0' if a == 0 else ('> 0' if a > 0 else '< 0')}: distribuição {_txt_classe(c)}."],
        resultado=fmt(a), interpretacao=f"Distribuição {_txt_classe(c)}.", dica=DICA_SIGMA,
        teclas_calculadora=teclas(f"({fmt(m, 10)}−{d(moda_unica)})÷{fmt(sigma, 10)}"),
    )


def pearson2(m, me, sigma):
    fonte = "Apostila p.40 · 2º coeficiente de Pearson"
    if sigma == 0:
        return None, None, _sem_sigma("2º coeficiente de Pearson", fonte)
    num = 3 * (m - me)
    a = num / sigma
    c = classe(num)
    return a, c, Passo(
        "2º coeficiente de Pearson", fonte, formula_latex=r"A_s=\frac{3(\bar{x}-Me)}{\sigma}",
        substituicao_latex=rf"A_s=\frac{{3({ltx(fmt(m))}-{ltx(fmt(me))})}}{{{ltx(fmt(sigma))}}}",
        linhas=[f"3 × (x̄ − Me) = 3 × ({fmt(m)} − {fmt(me)}) = {fmt(num)}", f"σ (populacional) = {fmt(sigma)}", f"{fmt(num)} ÷ {fmt(sigma)} {ig(a)}",
                f"Distribuição {_txt_classe(c)}."],
        resultado=fmt(a), interpretacao=f"Distribuição {_txt_classe(c)}.", dica=DICA_SIGMA,
        teclas_calculadora=teclas(f"3×({fmt(m, 10)}−{fmt(me, 10)})÷{fmt(sigma, 10)}"),
    )


def momento(xs, m, sigma):
    fonte = "Apostila p.40 · Coeficiente do momento de assimetria"
    k = len(xs)
    cubos = [(x - m) ** 3 for x in xs]
    S = sum(cubos)
    if sigma == 0:
        return None, None, S, _sem_sigma("Coeficiente do momento de assimetria", fonte)
    a = S / (k * sigma ** 3)
    c = classe(S)
    p = Passo(
        "Coeficiente do momento de assimetria", fonte,
        formula_latex=r"A_s=\frac{\sum_{i=1}^{k}(x_i-\bar{x})^3}{k\,\sigma^3}",
        substituicao_latex=rf"A_s=\frac{{{ltx(fmt(S))}}}{{{k}\cdot({ltx(fmt(sigma))})^3}}",
        linhas=["Cubos dos desvios: " + ", ".join(f"({fmt(x - m)})³ = {fmt(cb)}" for x, cb in zip(xs, cubos)) if k <= 12 else f"Cubos dos desvios: (xi − x̄)³ para os {k} valores.",
                f"Soma dos cubos = {fmt(S)}", f"σ³ = {fmt(sigma)}³ = {fmt(sigma ** 3)}", f"k × σ³ = {k} × {fmt(sigma ** 3)} = {fmt(k * sigma ** 3)}",
                f"{fmt(S)} ÷ {fmt(k * sigma ** 3)} {ig(a)}"],
        resultado=fmt(a), interpretacao=f"Distribuição {_txt_classe(c)}.", dica=DICA_SIGMA,
        teclas_calculadora=teclas(f"{fmt(S, 10)}÷({k}×{fmt(sigma, 10)}x³)"),
    )
    return a, c, S, p


def coef_quartil(q1, q2, q3):
    fonte = "Apostila p.41 · Coeficiente quartil"
    den = q3 - q1
    if den == 0:
        return None, None, Passo("Coeficiente quartil", fonte, linhas=["Q3 − Q1 = 0: o coeficiente não pode ser calculado."], resultado="não se aplica")
    num = q1 + q3 - 2 * q2
    a = num / den
    c = classe(num)
    return a, c, Passo(
        "Coeficiente quartil", fonte, formula_latex=r"A_s=\frac{Q_1+Q_3-2Me}{Q_3-Q_1}",
        substituicao_latex=rf"A_s=\frac{{{ltx(fmt(q1))}+{ltx(fmt(q3))}-2\cdot {ltx(fmt(q2))}}}{{{ltx(fmt(q3))}-{ltx(fmt(q1))}}}",
        linhas=[f"Numerador: Q1 + Q3 − 2·Me = {fmt(q1)} + {fmt(q3)} − 2 × {fmt(q2)} = {fmt(num)}", f"Denominador: Q3 − Q1 = {fmt(q3)} − {fmt(q1)} = {fmt(den)}",
                f"{fmt(num)} ÷ {fmt(den)} {ig(a)}"],
        resultado=fmt(a), interpretacao=f"Distribuição {_txt_classe(c)}.",
        teclas_calculadora=teclas(f"({fmt(q1, 10)}+{fmt(q3, 10)}−2×{fmt(q2, 10)})÷({fmt(q3, 10)}−{fmt(q1, 10)})"),
    )
